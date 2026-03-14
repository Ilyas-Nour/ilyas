import React, { useEffect, useRef } from 'react';

// WebGL Fluid Simulation by Pavel Dobryakov (Modified for React/System Sync)
// This is a high-performance solver for Navier-Stokes equations

const config = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1024,
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 1,
  VELOCITY_DISSIPATION: 0.2,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 20,
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

    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const gl = canvas.getContext('webgl2', { alpha: true, depth: false, antialias: false });
    if (!gl) return;

    // Helper functions for WebGL
    const createShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (gl: WebGL2RenderingContext, vsSource: string, fsSource: string) => {
      const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
      const program = gl.createProgram();
      if (!program || !vs || !fs) return null;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    };

    // Shaders (Simplified for performance & style)
    const baseVertexShader = `#version 300 es
      precision highp float;
      in vec2 aPosition;
      out vec2 vUv;
      out vec2 vL;
      out vec2 vR;
      out vec2 vT;
      out vec2 vB;
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

    const displayFragmentShader = `#version 300 es
      precision highp float;
      precision highp sampler2D;
      in vec2 vUv;
      uniform sampler2D uTexture;
      out vec4 outColor;
      void main () {
          vec3 c = texture(uTexture, vUv).rgb;
          float a = max(c.r, max(c.g, c.b));
          outColor = vec4(c, a);
      }
    `;

    const splatFragmentShader = `#version 300 es
      precision highp float;
      precision highp sampler2D;
      in vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      out vec4 outColor;
      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture(uTarget, vUv).xyz;
          outColor = vec4(base + splat, 1.0);
      }
    `;

    const advectionFragmentShader = `#version 300 es
      precision highp float;
      precision highp sampler2D;
      in vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;
      out vec4 outColor;
      void main () {
          vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
          outColor = dissipation * texture(uSource, coord);
      }
    `;

    const divergenceFragmentShader = `#version 300 es
      precision highp float;
      precision highp sampler2D;
      in vec2 vUv;
      in vec2 vL;
      in vec2 vR;
      in vec2 vT;
      in vec2 vB;
      uniform sampler2D uVelocity;
      out vec4 outColor;
      void main () {
          float L = texture(uVelocity, vL).x;
          float R = texture(uVelocity, vR).x;
          float T = texture(uVelocity, vT).y;
          float B = texture(uVelocity, vB).y;
          float div = 0.5 * (R - L + T - B);
          outColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    const pressureFragmentShader = `#version 300 es
      precision highp float;
      precision highp sampler2D;
      in vec2 vUv;
      in vec2 vL;
      in vec2 vR;
      in vec2 vT;
      in vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      out vec4 outColor;
      void main () {
          float L = texture(uPressure, vL).x;
          float R = texture(uPressure, vR).x;
          float T = texture(uPressure, vT).x;
          float B = texture(uPressure, vB).x;
          float div = texture(uDivergence, vUv).x;
          float p = (L + R + B + T - div) * 0.25;
          outColor = vec4(p, 0.0, 0.0, 1.0);
      }
    `;

    const gradientSubtractFragmentShader = `#version 300 es
      precision highp float;
      precision highp sampler2D;
      in vec2 vUv;
      in vec2 vL;
      in vec2 vR;
      in vec2 vT;
      in vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      out vec4 outColor;
      void main () {
          float L = texture(uPressure, vL).x;
          float R = texture(uPressure, vR).x;
          float T = texture(uPressure, vT).x;
          float B = texture(uPressure, vB).x;
          vec2 vel = texture(uVelocity, vUv).xy;
          vel.xy -= vec2(R - L, T - B) * 0.5;
          outColor = vec4(vel, 0.0, 1.0);
      }
    `;

    // Initialization and Buffer Setup (Internal logic omitted for brevity in thought, fully implemented below)
    const splashProgram = createProgram(gl, baseVertexShader, splatFragmentShader)!;
    const advectionProgram = createProgram(gl, baseVertexShader, advectionFragmentShader)!;
    const divergenceProgram = createProgram(gl, baseVertexShader, divergenceFragmentShader)!;
    const pressureProgram = createProgram(gl, baseVertexShader, pressureFragmentShader)!;
    const gradSubProgram = createProgram(gl, baseVertexShader, gradientSubtractFragmentShader)!;
    const displayProgram = createProgram(gl, baseVertexShader, displayFragmentShader)!;

    // Buffer creation helpers...
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

    const ext = gl.getExtension('EXT_color_buffer_float');
    const type = gl.HALF_FLOAT;
    const internalFormat = gl.RGBA16F;
    const format = gl.RGBA;
    
    let density = createDoubleFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION, internalFormat, format, type, gl.LINEAR);
    let velocity = createDoubleFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION, internalFormat, format, type, gl.LINEAR);
    let divergence = createFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION, internalFormat, format, type, gl.NEAREST);
    let pressure = createDoubleFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION, internalFormat, format, type, gl.NEAREST);

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);

    const renderQuad = () => {
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    };

    const splat = (x: number, y: number, dx: number, dy: number, color: {r: number, g: number, b: number}) => {
      gl.viewport(0, 0, config.SIM_RESOLUTION, config.SIM_RESOLUTION);
      
      // Add velocity
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

      // Add density
      gl.uniform3f(gl.getUniformLocation(splashProgram, 'color'), color.r, color.g, color.b);
      gl.bindFramebuffer(gl.FRAMEBUFFER, density.write.fbo);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
      renderQuad();
      density.swap();
    };

    let lastMouseX = 0, lastMouseY = 0;
    const moveListener = (e: MouseEvent | TouchEvent) => {
      const x = (e instanceof MouseEvent ? e.pageX : e.touches[0].pageX) / canvas.width;
      const y = 1.0 - (e instanceof MouseEvent ? e.pageY : e.touches[0].pageY) / canvas.height;
      const dx = (x - lastMouseX) * config.SPLAT_FORCE;
      const dy = (y - lastMouseY) * config.SPLAT_FORCE;

      // System Palette Colors: Cyber Blue (#3b82f6) / Volcanic Orange (#f97316)
      const colors = [
        { r: 0.23, g: 0.51, b: 0.96 }, // Cyber Blue
        { r: 0.98, g: 0.45, b: 0.09 }, // Volcanic Orange
        { r: 0.8, g: 0.4, b: 1.0 },   // Indigo accent
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
        splat(x, y, dx, dy, color);
      }
      lastMouseX = x;
      lastMouseY = y;
    };

    window.addEventListener('mousemove', moveListener);
    window.addEventListener('touchstart', moveListener);

    const update = () => {
      gl.disable(gl.BLEND);
      gl.viewport(0, 0, config.SIM_RESOLUTION, config.SIM_RESOLUTION);

      // Advection
      gl.useProgram(advectionProgram);
      gl.uniform2f(gl.getUniformLocation(advectionProgram, 'texelSize'), 1.0 / config.SIM_RESOLUTION, 1.0 / config.SIM_RESOLUTION);
      gl.uniform1f(gl.getUniformLocation(advectionProgram, 'dt'), 0.016);
      gl.uniform1f(gl.getUniformLocation(advectionProgram, 'dissipation'), 1.0 - 0.01);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.uniform1i(gl.getUniformLocation(advectionProgram, 'uVelocity'), 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.uniform1i(gl.getUniformLocation(advectionProgram, 'uSource'), 1);
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
      renderQuad();
      velocity.swap();

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
      gl.bindFramebuffer(gl.FRAMEBUFFER, density.write.fbo);
      renderQuad();
      density.swap();

      // Divergence
      gl.useProgram(divergenceProgram);
      gl.uniform2f(gl.getUniformLocation(divergenceProgram, 'texelSize'), 1.0 / config.SIM_RESOLUTION, 1.0 / config.SIM_RESOLUTION);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.bindFramebuffer(gl.FRAMEBUFFER, divergence.fbo);
      renderQuad();

      // Pressure
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

      // Gradient Subtract
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

      // Display
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(displayProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
      gl.uniform1i(gl.getUniformLocation(displayProgram, 'uTexture'), 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      renderQuad();

      requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('mousemove', moveListener);
      window.removeEventListener('touchstart', moveListener);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-[5] opacity-60 mix-blend-screen overflow-hidden" 
    />
  );
};

export default FluidCursor;
