import React, { useEffect, useRef } from 'react';

/**
 * Fluid Dynamics Configuration
 * Optimized for a balance between visual fidelity and high-framerate performance.
 */
const config = {
  SIM_RESOLUTION: 64,      // Simulation grid resolution (lower = faster)
  DYE_RESOLUTION: 512,     // Visual "dye" resolution (higher = crisper trails)
  CAPTURE_RESOLUTION: 256,
  DENSITY_DISSIPATION: 0.9, // How fast the color trails fade (0.9 = snappier)
  VELOCITY_DISSIPATION: 0.8, // How fast the motion momentum fades
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 10,  // Accuracy of the fluid pressure solver
  CURL: 30,                 // "Vorticity" - how much the fluid swirls
  SPLAT_RADIUS: 0.25,       // Size of the mouse interaction
  SPLAT_FORCE: 6000,        // Strength of the mouse interaction
  SHADING: false,
  COLORFUL: true,
  PAUSED: false,
  BACK_COLOR: { r: 0, g: 0, b: 0 },
  BLOOM: false,
  SUNRAYS: false,
};

/**
 * FluidCursor Component
 * A high-performance WebGL-based fluid simulation that tracks the mouse cursor.
 * Implements a GPU-accelerated Navier-Stokes solver for real-time interactivity.
 */
export const FluidCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Initialization & Context Management ---

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Prefer WebGL 2.0 for better floating point texture support
    const gl = canvas.getContext('webgl2', { alpha: true, depth: false, antialias: false }) ||
               canvas.getContext('webgl', { alpha: true, depth: false, antialias: false }) as any;

    if (!gl) {
      console.warn('FluidCursor: WebGL context not available. Interaction disabled.');
      return;
    }

    // --- Shader Compiler Helpers ---

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
      if (!program || !vs || !fs) return null;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      return program;
    };

    // Handle cross-version GLSL compatibility
    const isWebGL2 = gl instanceof WebGL2RenderingContext;
    const version = isWebGL2 ? '#version 300 es' : '';
    const vIn = isWebGL2 ? 'in' : 'attribute';
    const vOut = isWebGL2 ? 'out' : 'varying';
    const fIn = isWebGL2 ? 'in' : 'varying';
    const fOut = isWebGL2 ? 'layout(location = 0) out vec4 outColor;' : '';
    const fragColor = isWebGL2 ? 'outColor' : 'gl_FragColor';
    const textureFunc = isWebGL2 ? 'texture' : 'texture2D';

    // --- Shader Pipeline Definitions ---

    // 1. Base Vertex Shader - Maps a quad to the screen
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

    // 2. Display Fragment Shader - Renders the final dye buffer to the screen
    const displayFragmentShader = `${version}
      precision highp float;
      ${fIn} vec2 vUv;
      uniform sampler2D uTexture;
      ${fOut}
      void main () {
          vec3 c = ${textureFunc}(uTexture, vUv).rgb;
          float a = max(c.r, max(c.g, c.b));
          ${fragColor} = vec4(c, a * 0.95);
      }
    `;

    // 3. Splat Fragment Shader - Injects force/color at mouse coordinates
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

    // 4. Advection Fragment Shader - Moves the fluid quantities through the velocity field
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

    // 5. Divergence Fragment Shader - Calculates the non-zero divergence for the pressure solver
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

    // 6. Pressure Fragment Shader - Iteratively solves for incompressible fluid pressure
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

    // 7. Gradient Subtract - Subtracts pressure from velocity to achieve zero-divergence (stablity)
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

    // Create GL programs
    const splashProgram = createProgram(gl, baseVertexShader, splatFragmentShader);
    const advectionProgram = createProgram(gl, baseVertexShader, advectionFragmentShader);
    const divergenceProgram = createProgram(gl, baseVertexShader, divergenceFragmentShader);
    const pressureProgram = createProgram(gl, baseVertexShader, pressureFragmentShader);
    const gradSubProgram = createProgram(gl, baseVertexShader, gradientSubtractFragmentShader);
    const displayProgram = createProgram(gl, baseVertexShader, displayFragmentShader);

    if (!splashProgram || !advectionProgram || !divergenceProgram || !pressureProgram || !gradSubProgram || !displayProgram) return;

    // --- Framebuffer & Texture Orchestration ---

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
    
    // Core simulation buffers
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

    // --- Interaction Loop ---

    let lastMouseX = 0, lastMouseY = 0;
    let isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Watch for theme changes to swap blending modes (multiply vs screen)
    const observer = new MutationObserver(() => {
      isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
      canvas.className = `fixed inset-0 w-screen h-screen pointer-events-none z-[9999] opacity-70 overflow-hidden ${isDarkMode ? 'mix-blend-screen' : 'mix-blend-multiply'}`;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const moveListener = (e: MouseEvent | TouchEvent) => {
      const clientX = (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX);
      const clientY = (e instanceof MouseEvent ? e.clientY : e.touches[0].clientY);
      const x = clientX / window.innerWidth;
      const y = 1.0 - clientY / window.innerHeight;
      const dx = (x - lastMouseX) * config.SPLAT_FORCE;
      const dy = (y - lastMouseY) * config.SPLAT_FORCE;

      // Chromatic Evolution Logic
      const time = Date.now() * 0.005;
      const r = Math.sin(time) * 0.5 + 0.5;
      const g = Math.sin(time + 2.1) * 0.5 + 0.5;
      const b = Math.sin(time + 4.2) * 0.5 + 0.5;
      
      const saturation = isDarkMode ? 0.9 : 1.2;
      const color = { 
        r: Math.min(1, r * saturation + (isDarkMode ? 0.1 : 0)), 
        g: Math.min(1, g * saturation + (isDarkMode ? 0.1 : 0)), 
        b: Math.min(1, b * saturation + (isDarkMode ? 0.1 : 0)) 
      };
      
      if (Math.abs(dx) > 0.0001 || Math.abs(dy) > 0.0001) {
        splat(x, y, dx, dy, color);
      }
      lastMouseX = x;
      lastMouseY = y;
    };

    window.addEventListener('mousemove', moveListener);
    window.addEventListener('touchstart', moveListener);

    // --- Main Simulation Loop ---

    let animationId: number;
    const update = () => {
      gl.disable(gl.BLEND);
      gl.viewport(0, 0, config.SIM_RESOLUTION, config.SIM_RESOLUTION);

      // Advect Velocity
      gl.useProgram(advectionProgram);
      gl.uniform2f(gl.getUniformLocation(advectionProgram, 'texelSize'), 1.0 / config.SIM_RESOLUTION, 1.0 / config.SIM_RESOLUTION);
      gl.uniform1f(gl.getUniformLocation(advectionProgram, 'dt'), 0.016);
      gl.uniform1f(gl.getUniformLocation(advectionProgram, 'dissipation'), 0.8);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.uniform1i(gl.getUniformLocation(advectionProgram, 'uVelocity'), 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.uniform1i(gl.getUniformLocation(advectionProgram, 'uSource'), 1);
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
      renderQuad();
      velocity.swap();

      // Advect Density
      gl.uniform1f(gl.getUniformLocation(advectionProgram, 'dissipation'), isDarkMode ? 0.92 : 0.95);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
      gl.bindFramebuffer(gl.FRAMEBUFFER, density.write.fbo);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      renderQuad();
      density.swap();

      // Solve for Pressure/Incompressibility
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

      // Subtract Pressure Gradient from Velocity
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

      // Render Dye Buffer to Screen
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

    // Clean up all resources effectively
    return () => {
      window.removeEventListener('mousemove', moveListener);
      window.removeEventListener('touchstart', moveListener);
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  const isDarkMode = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark';

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 w-screen h-screen pointer-events-none z-[9999] opacity-70 overflow-hidden ${isDarkMode ? 'mix-blend-screen' : 'mix-blend-multiply'}`} 
    />
  );
};

export default FluidCursor;
