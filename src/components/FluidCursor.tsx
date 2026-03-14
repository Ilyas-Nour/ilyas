import React, { useEffect, useRef } from 'react';

const config = {
  SIM_RESOLUTION: 64, // Optimal performance
  DYE_RESOLUTION: 512,
  CAPTURE_RESOLUTION: 256,
  DENSITY_DISSIPATION: 0.95, // Very fast dissipation
  VELOCITY_DISSIPATION: 0.8,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 10, // Faster updates
  CURL: 30,
  SPLAT_RADIUS: 0.25,
  SPLAT_FORCE: 6000,
  SHADING: true,
  COLORFUL: true,
  PAUSED: false,
  BACK_COLOR: { r: 0, g: 0, b: 0 },
  BLOOM: true,
  SUNRAYS: true,
};

export const FluidCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    console.log('FluidCursor: Initializing WebGL simulation...');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log(`FluidCursor: Canvas resized to ${canvas.width}x${canvas.height}`);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const gl = canvas.getContext('webgl2', { alpha: true, depth: false, antialias: false }) ||
               canvas.getContext('webgl', { alpha: true, depth: false, antialias: false }) as any;

    if (!gl) {
      console.error('FluidCursor: WebGL not supported.');
      return;
    }

    console.log('FluidCursor: WebGL Context achieved.');

    const createShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('FluidCursor Shader Error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (gl: WebGL2RenderingContext, vsSource: string, fsSource: string) => {
      const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
      const program = gl.createProgram();
      if (!program || !vs || !fs) {
        console.error('FluidCursor Program Creation Failed');
        return null;
      }
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('FluidCursor Program Link Error:', gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    };

    // Shaders Configuration
    const isWebGL2 = gl instanceof WebGL2RenderingContext;
    const version = isWebGL2 ? '#version 300 es' : '';
    const vIn = isWebGL2 ? 'in' : 'attribute';
    const vOut = isWebGL2 ? 'out' : 'varying';
    const fIn = isWebGL2 ? 'in' : 'varying';
    const fOut = isWebGL2 ? 'layout(location = 0) out vec4 outColor;' : '';
    const fragColor = isWebGL2 ? 'outColor' : 'gl_FragColor';
    const textureFunc = isWebGL2 ? 'texture' : 'texture2D';

    const baseVertexShader = `${version}
      precision highp float;
      ${isWebGL2 ? 'layout(location = 0)' : ''} ${vIn} vec2 aPosition;
      ${vOut} vec2 vUv;
      ${vOut} vec2 vL;
      ${vOut} vec2 vR;
      ${vOut} vec2 vT;
      ${vOut} vec2 vB;
      uniform vec2 texelSize;
      void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const displayFragmentShader = `${version}
      precision highp float;
      ${fIn} vec2 vUv;
      uniform sampler2D uTexture;
      ${fOut}
      void main () {
          vec3 c = ${textureFunc}(uTexture, vUv).rgb;
          float a = max(c.r, max(c.g, c.b));
          ${fragColor} = vec4(c, a * 0.8);
      }
    `;

    const splatFragmentShader = `${version}
      precision highp float;
      ${fIn} vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      ${fOut}
      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = ${textureFunc}(uTarget, vUv).xyz;
          ${fragColor} = vec4(base + splat, 1.0);
      }
    `;

    const advectionFragmentShader = `${version}
      precision highp float;
      ${fIn} vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;
      ${fOut}
      void main () {
          vec2 coord = vUv - dt * ${textureFunc}(uVelocity, vUv).xy * texelSize;
          ${fragColor} = dissipation * ${textureFunc}(uSource, coord);
      }
    `;

    const divergenceFragmentShader = `${version}
      precision highp float;
      ${fIn} vec2 vUv;
      ${fIn} vec2 vL;
      ${fIn} vec2 vR;
      ${fIn} vec2 vT;
      ${fIn} vec2 vB;
      uniform sampler2D uVelocity;
      ${fOut}
      void main () {
          float L = ${textureFunc}(uVelocity, vL).x;
          float R = ${textureFunc}(uVelocity, vR).x;
          float T = ${textureFunc}(uVelocity, vT).y;
          float B = ${textureFunc}(uVelocity, vB).y;
          float div = 0.5 * (R - L + T - B);
          ${fragColor} = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    const pressureFragmentShader = `${version}
      precision highp float;
      ${fIn} vec2 vUv;
      ${fIn} vec2 vL;
      ${fIn} vec2 vR;
      ${fIn} vec2 vT;
      ${fIn} vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      ${fOut}
      void main () {
          float L = ${textureFunc}(uPressure, vL).x;
          float R = ${textureFunc}(uPressure, vR).x;
          float T = ${textureFunc}(uPressure, vT).x;
          float B = ${textureFunc}(uPressure, vB).x;
          float div = ${textureFunc}(uDivergence, vUv).x;
          float p = (L + R + B + T - div) * 0.25;
          ${fragColor} = vec4(p, 0.0, 0.0, 1.0);
      }
    `;

    const gradientSubtractFragmentShader = `${version}
      precision highp float;
      ${fIn} vec2 vUv;
      ${fIn} vec2 vL;
      ${fIn} vec2 vR;
      ${fIn} vec2 vT;
      ${fIn} vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      ${fOut}
      void main () {
          float L = ${textureFunc}(uPressure, vL).x;
          float R = ${textureFunc}(uPressure, vR).x;
          float T = ${textureFunc}(uPressure, vT).x;
          float B = ${textureFunc}(uPressure, vB).x;
          vec2 vel = ${textureFunc}(uVelocity, vUv).xy;
          vel.xy -= vec2(R - L, T - B) * 0.5;
          ${fragColor} = vec4(vel, 0.0, 1.0);
      }
    `;

    const splashProgram = createProgram(gl, baseVertexShader, splatFragmentShader);
    const advectionProgram = createProgram(gl, baseVertexShader, advectionFragmentShader);
    const divergenceProgram = createProgram(gl, baseVertexShader, divergenceFragmentShader);
    const pressureProgram = createProgram(gl, baseVertexShader, pressureFragmentShader);
    const gradSubProgram = createProgram(gl, baseVertexShader, gradientSubtractFragmentShader);
    const displayProgram = createProgram(gl, baseVertexShader, displayFragmentShader);

    if (!splashProgram || !advectionProgram || !divergenceProgram || !pressureProgram || !gradSubProgram || !displayProgram) {
      console.error('FluidCursor: Critical failure during program creation. Simulation aborted.');
      return;
    }

    const createFBO = (w: number, h: number, internalFormat: number, format: number, type: number, param: number) => {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return { texture, fbo, width: w, height: h };
    };

    const createDoubleFBO = (w: number, h: number, internalFormat: number, format: number, type: number, param: number) => {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);
      return {
        get read() { return fbo1; },
        get write() { return fbo2; },
        swap() { [fbo1, fbo2] = [fbo2, fbo1]; }
      };
    };

    gl.getExtension('EXT_color_buffer_float');
    const type = isWebGL2 ? gl.HALF_FLOAT : (gl.getExtension('OES_texture_half_float')?.HALF_FLOAT_OES || gl.FLOAT);
    const internalFormat = isWebGL2 ? gl.RGBA16F : gl.RGBA;
    const format = gl.RGBA;
    
    let density = createDoubleFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION, internalFormat, format, type, gl.LINEAR);
    let velocity = createDoubleFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION, internalFormat, format, type, gl.LINEAR);
    let divergence = createFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION, internalFormat, format, type, gl.NEAREST);
    let pressure = createDoubleFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION, internalFormat, format, type, gl.NEAREST);

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);

    const renderQuad = () => {
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    };

    const splat = (x: number, y: number, dx: number, dy: number, color: {r: number, g: number, b: number}) => {
      gl.viewport(0, 0, config.SIM_RESOLUTION, config.SIM_RESOLUTION);
      
      gl.useProgram(splashProgram);
      gl.uniform1f(gl.getUniformLocation(splashProgram, 'aspectRatio'), canvas.width / canvas.height);
      gl.uniform2f(gl.getUniformLocation(splashProgram, 'point'), x, y);
      gl.uniform3f(gl.getUniformLocation(splashProgram, 'color'), dx, dy, 0.0);
      gl.uniform1f(gl.getUniformLocation(splashProgram, 'radius'), config.SPLAT_RADIUS / 100);
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.uniform1i(gl.getUniformLocation(splashProgram, 'uTarget'), 0);
      renderQuad();
      velocity.swap();

      gl.uniform3f(gl.getUniformLocation(splashProgram, 'color'), color.r, color.g, color.b);
      gl.bindFramebuffer(gl.FRAMEBUFFER, density.write.fbo);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
      renderQuad();
      density.swap();
    };

    // Subdued initial splat for immediate visual confirmation
    setTimeout(() => {
      splat(0.5, 0.5, 200, 200, { r: 0.23, g: 0.51, b: 0.96 });
    }, 1000);

    let lastMouseX = 0, lastMouseY = 0;
    const moveListener = (e: MouseEvent | TouchEvent) => {
      const clientX = (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX);
      const clientY = (e instanceof MouseEvent ? e.clientY : e.touches[0].clientY);
      const x = clientX / window.innerWidth;
      const y = 1.0 - clientY / window.innerHeight;
      const dx = (x - lastMouseX) * config.SPLAT_FORCE;
      const dy = (y - lastMouseY) * config.SPLAT_FORCE;

      // Chromatic Color Cycling based on time or motion
      const time = Date.now() * 0.002;
      const r = Math.sin(time) * 0.5 + 0.5;
      const g = Math.sin(time + 2) * 0.5 + 0.5;
      const b = Math.sin(time + 4) * 0.5 + 0.5;
      
      const color = { r: r * 0.8 + 0.2, g: g * 0.8 + 0.2, b: b * 0.8 + 0.2 };
      
      if (Math.abs(dx) > 0.0001 || Math.abs(dy) > 0.0001) {
        splat(x, y, dx, dy, color);
      }
      lastMouseX = x;
      lastMouseY = y;
    };

    window.addEventListener('mousemove', moveListener);
    window.addEventListener('touchstart', moveListener);

    let animationId: number;
    const update = () => {
      gl.disable(gl.BLEND);
      gl.viewport(0, 0, config.SIM_RESOLUTION, config.SIM_RESOLUTION);

      // Velocity Advection
      // Velocity Advection
      gl.useProgram(advectionProgram);
      gl.uniform2f(gl.getUniformLocation(advectionProgram, 'texelSize'), 1.0 / config.SIM_RESOLUTION, 1.0 / config.SIM_RESOLUTION);
      gl.uniform1f(gl.getUniformLocation(advectionProgram, 'dt'), 0.016);
      gl.uniform1f(gl.getUniformLocation(advectionProgram, 'dissipation'), 0.8); // Fades fast
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.uniform1i(gl.getUniformLocation(advectionProgram, 'uVelocity'), 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.uniform1i(gl.getUniformLocation(advectionProgram, 'uSource'), 1);
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
      renderQuad();
      velocity.swap();

      // Density Advection (Smoke)
      gl.uniform1f(gl.getUniformLocation(advectionProgram, 'dissipation'), 0.92); // Disappears quickly
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
      gl.bindFramebuffer(gl.FRAMEBUFFER, density.write.fbo);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      renderQuad();
      density.swap();

      gl.useProgram(divergenceProgram);
      gl.uniform2f(gl.getUniformLocation(divergenceProgram, 'texelSize'), 1.0 / config.SIM_RESOLUTION, 1.0 / config.SIM_RESOLUTION);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.bindFramebuffer(gl.FRAMEBUFFER, divergence.fbo);
      renderQuad();

      gl.useProgram(pressureProgram);
      gl.uniform2f(gl.getUniformLocation(pressureProgram, 'texelSize'), 1.0 / config.SIM_RESOLUTION, 1.0 / config.SIM_RESOLUTION);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, divergence.texture);
      gl.uniform1i(gl.getUniformLocation(pressureProgram, 'uDivergence'), 0);
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, pressure.read.texture);
        gl.uniform1i(gl.getUniformLocation(pressureProgram, 'uPressure'), 1);
        gl.bindFramebuffer(gl.FRAMEBUFFER, pressure.write.fbo);
        renderQuad();
        pressure.swap();
      }

      gl.useProgram(gradSubProgram);
      gl.uniform2f(gl.getUniformLocation(gradSubProgram, 'texelSize'), 1.0 / config.SIM_RESOLUTION, 1.0 / config.SIM_RESOLUTION);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, pressure.read.texture);
      gl.uniform1i(gl.getUniformLocation(gradSubProgram, 'uPressure'), 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.uniform1i(gl.getUniformLocation(gradSubProgram, 'uVelocity'), 1);
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
      renderQuad();
      velocity.swap();

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(displayProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
      gl.uniform1i(gl.getUniformLocation(displayProgram, 'uTexture'), 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      renderQuad();

      animationId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('mousemove', moveListener);
      window.removeEventListener('touchstart', moveListener);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[9999] opacity-30 mix-blend-screen overflow-hidden" 
    />
  );
};

export default FluidCursor;
