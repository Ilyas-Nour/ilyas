const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/IdentityArchive-CvSpfrfC.js","assets/react-vendor-BS8-NE-3.js","assets/vendor-5j7VWcuS.js","assets/motion-vendor-BVxW7wue.js","assets/TechStack-OSETBlNI.js","assets/ProjectCatalog-D2m6oTo5.js","assets/InquiryContact-GZbr2oBx.js","assets/MassiveFooter-DKoeENp6.js"])))=>i.map(i=>d[i]);
import{r as E,j as t,R as Z,a as ce}from"./react-vendor-BS8-NE-3.js";import{_ as le}from"./vendor-5j7VWcuS.js";import{m as S,A as ue}from"./motion-vendor-BVxW7wue.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))e(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function f(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function e(i){if(i.ep)return;i.ep=!0;const c=f(i);fetch(i.href,c)}})();const de="modulepreload",me=function(n){return"/"+n},J={},N=function(o,f,e){let i=Promise.resolve();if(f&&f.length>0){let l=function(v){return Promise.all(v.map(a=>Promise.resolve(a).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),P=(u==null?void 0:u.nonce)||(u==null?void 0:u.getAttribute("nonce"));i=l(f.map(v=>{if(v=me(v),v in J)return;J[v]=!0;const a=v.endsWith(".css"),g=a?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${v}"]${g}`))return;const h=document.createElement("link");if(h.rel=a?"stylesheet":de,a||(h.as="script"),h.crossOrigin="",h.href=v,P&&h.setAttribute("nonce",P),document.head.appendChild(h),a)return new Promise((m,w)=>{h.addEventListener("load",m),h.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${v}`)))})}))}function c(l){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=l,window.dispatchEvent(u),!u.defaultPrevented)throw l}return i.then(l=>{for(const u of l||[])u.status==="rejected"&&c(u.reason);return o().catch(c)})},s={SIM_RESOLUTION:64,PRESSURE_ITERATIONS:10,SPLAT_RADIUS:.25,SPLAT_FORCE:6e3},fe=()=>{const n=E.useRef(null);return E.useEffect(()=>{var Q;const o=n.current;if(!o)return;console.log("FluidCursor: Initializing WebGL simulation...");const f=()=>{o.width=window.innerWidth,o.height=window.innerHeight,console.log(`FluidCursor: Canvas resized to ${o.width}x${o.height}`)};window.addEventListener("resize",f),f();const e=o.getContext("webgl2",{alpha:!0,depth:!1,antialias:!1})||o.getContext("webgl",{alpha:!0,depth:!1,antialias:!1});if(!e){console.error("FluidCursor: WebGL not supported.");return}console.log("FluidCursor: WebGL Context achieved.");const i=(r,T,b)=>{const d=r.createShader(T);return d?(r.shaderSource(d,b),r.compileShader(d),r.getShaderParameter(d,r.COMPILE_STATUS)?d:(console.error("FluidCursor Shader Error:",r.getShaderInfoLog(d)),r.deleteShader(d),null)):null},c=(r,T,b)=>{const d=i(r,r.VERTEX_SHADER,T),p=i(r,r.FRAGMENT_SHADER,b),x=r.createProgram();return!x||!d||!p?(console.error("FluidCursor Program Creation Failed"),null):(r.attachShader(x,d),r.attachShader(x,p),r.linkProgram(x),r.getProgramParameter(x,r.LINK_STATUS)?x:(console.error("FluidCursor Program Link Error:",r.getProgramInfoLog(x)),null))},l=e instanceof WebGL2RenderingContext,u=l?"#version 300 es":"",P=l?"in":"attribute",v=l?"out":"varying",a=l?"in":"varying",g=l?"layout(location = 0) out vec4 outColor;":"",h=l?"outColor":"gl_FragColor",m=l?"texture":"texture2D",w=`${u}
      precision highp float;
      ${l?"layout(location = 0)":""} ${P} vec2 aPosition;
      ${v} vec2 vUv;
      ${v} vec2 vL;
      ${v} vec2 vR;
      ${v} vec2 vT;
      ${v} vec2 vB;
      uniform vec2 texelSize;
      void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `,te=`${u}
      precision highp float;
      ${a} vec2 vUv;
      uniform sampler2D uTexture;
      ${g}
      void main () {
          vec3 c = ${m}(uTexture, vUv).rgb;
          float a = max(c.r, max(c.g, c.b));
          ${h} = vec4(c, a * 0.8);
      }
    `,re=`${u}
      precision highp float;
      ${a} vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      ${g}
      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = ${m}(uTarget, vUv).xyz;
          ${h} = vec4(base + splat, 1.0);
      }
    `,oe=`${u}
      precision highp float;
      ${a} vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;
      ${g}
      void main () {
          vec2 coord = vUv - dt * ${m}(uVelocity, vUv).xy * texelSize;
          ${h} = dissipation * ${m}(uSource, coord);
      }
    `,ie=`${u}
      precision highp float;
      ${a} vec2 vUv;
      ${a} vec2 vL;
      ${a} vec2 vR;
      ${a} vec2 vT;
      ${a} vec2 vB;
      uniform sampler2D uVelocity;
      ${g}
      void main () {
          float L = ${m}(uVelocity, vL).x;
          float R = ${m}(uVelocity, vR).x;
          float T = ${m}(uVelocity, vT).y;
          float B = ${m}(uVelocity, vB).y;
          float div = 0.5 * (R - L + T - B);
          ${h} = vec4(div, 0.0, 0.0, 1.0);
      }
    `,ne=`${u}
      precision highp float;
      ${a} vec2 vUv;
      ${a} vec2 vL;
      ${a} vec2 vR;
      ${a} vec2 vT;
      ${a} vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      ${g}
      void main () {
          float L = ${m}(uPressure, vL).x;
          float R = ${m}(uPressure, vR).x;
          float T = ${m}(uPressure, vT).x;
          float B = ${m}(uPressure, vB).x;
          float div = ${m}(uDivergence, vUv).x;
          float p = (L + R + B + T - div) * 0.25;
          ${h} = vec4(p, 0.0, 0.0, 1.0);
      }
    `,ae=`${u}
      precision highp float;
      ${a} vec2 vUv;
      ${a} vec2 vL;
      ${a} vec2 vR;
      ${a} vec2 vT;
      ${a} vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      ${g}
      void main () {
          float L = ${m}(uPressure, vL).x;
          float R = ${m}(uPressure, vR).x;
          float T = ${m}(uPressure, vT).x;
          float B = ${m}(uPressure, vB).x;
          vec2 vel = ${m}(uVelocity, vUv).xy;
          vel.xy -= vec2(R - L, T - B) * 0.5;
          ${h} = vec4(vel, 0.0, 1.0);
      }
    `,y=c(e,w,re),_=c(e,w,oe),B=c(e,w,ie),O=c(e,w,ne),A=c(e,w,ae),X=c(e,w,te);if(!y||!_||!B||!O||!A||!X){console.error("FluidCursor: Critical failure during program creation. Simulation aborted.");return}const k=(r,T,b,d,p,x)=>{e.activeTexture(e.TEXTURE0);const U=e.createTexture();e.bindTexture(e.TEXTURE_2D,U),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,x),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,x),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,b,r,T,0,d,p,null);const L=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,L),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,U,0),e.viewport(0,0,r,T),e.clear(e.COLOR_BUFFER_BIT),{texture:U,fbo:L,width:r,height:T}},z=(r,T,b,d,p,x)=>{let U=k(r,T,b,d,p,x),L=k(r,T,b,d,p,x);return{get read(){return U},get write(){return L},swap(){[U,L]=[L,U]}}};e.getExtension("EXT_color_buffer_float");const j=l?e.HALF_FLOAT:((Q=e.getExtension("OES_texture_half_float"))==null?void 0:Q.HALF_FLOAT_OES)||e.FLOAT,$=l?e.RGBA16F:e.RGBA,M=e.RGBA;let I=z(s.SIM_RESOLUTION,s.SIM_RESOLUTION,$,M,j,e.LINEAR),R=z(s.SIM_RESOLUTION,s.SIM_RESOLUTION,$,M,j,e.LINEAR),V=k(s.SIM_RESOLUTION,s.SIM_RESOLUTION,$,M,j,e.NEAREST),D=z(s.SIM_RESOLUTION,s.SIM_RESOLUTION,$,M,j,e.NEAREST);const W=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,W),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),e.STATIC_DRAW);const F=()=>{e.bindBuffer(e.ARRAY_BUFFER,W),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.drawArrays(e.TRIANGLE_FAN,0,4)},G=(r,T,b,d,p)=>{e.viewport(0,0,s.SIM_RESOLUTION,s.SIM_RESOLUTION),e.useProgram(y),e.uniform1f(e.getUniformLocation(y,"aspectRatio"),o.width/o.height),e.uniform2f(e.getUniformLocation(y,"point"),r,T),e.uniform3f(e.getUniformLocation(y,"color"),b,d,0),e.uniform1f(e.getUniformLocation(y,"radius"),s.SPLAT_RADIUS/100),e.bindFramebuffer(e.FRAMEBUFFER,R.write.fbo),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,R.read.texture),e.uniform1i(e.getUniformLocation(y,"uTarget"),0),F(),R.swap(),e.uniform3f(e.getUniformLocation(y,"color"),p.r,p.g,p.b),e.bindFramebuffer(e.FRAMEBUFFER,I.write.fbo),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,I.read.texture),F(),I.swap()};setTimeout(()=>{G(.5,.5,200,200,{r:.23,g:.51,b:.96})},1e3);let H=0,q=0;const C=r=>{const T=r instanceof MouseEvent?r.clientX:r.touches[0].clientX,b=r instanceof MouseEvent?r.clientY:r.touches[0].clientY,d=T/window.innerWidth,p=1-b/window.innerHeight,x=(d-H)*s.SPLAT_FORCE,U=(p-q)*s.SPLAT_FORCE,L=[{r:.8,g:.9,b:1},{r:1,g:1,b:1}],se=L[Math.floor(Math.random()*L.length)];(Math.abs(x)>1e-4||Math.abs(U)>1e-4)&&G(d,p,x,U,se),H=d,q=p};window.addEventListener("mousemove",C),window.addEventListener("touchstart",C);let Y;const K=()=>{e.disable(e.BLEND),e.viewport(0,0,s.SIM_RESOLUTION,s.SIM_RESOLUTION),e.useProgram(_),e.uniform2f(e.getUniformLocation(_,"texelSize"),1/s.SIM_RESOLUTION,1/s.SIM_RESOLUTION),e.uniform1f(e.getUniformLocation(_,"dt"),.016),e.uniform1f(e.getUniformLocation(_,"dissipation"),.8),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,R.read.texture),e.uniform1i(e.getUniformLocation(_,"uVelocity"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,R.read.texture),e.uniform1i(e.getUniformLocation(_,"uSource"),1),e.bindFramebuffer(e.FRAMEBUFFER,R.write.fbo),F(),R.swap(),e.uniform1f(e.getUniformLocation(_,"dissipation"),.92),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,I.read.texture),e.bindFramebuffer(e.FRAMEBUFFER,I.write.fbo),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,R.read.texture),F(),I.swap(),e.useProgram(B),e.uniform2f(e.getUniformLocation(B,"texelSize"),1/s.SIM_RESOLUTION,1/s.SIM_RESOLUTION),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,R.read.texture),e.bindFramebuffer(e.FRAMEBUFFER,V.fbo),F(),e.useProgram(O),e.uniform2f(e.getUniformLocation(O,"texelSize"),1/s.SIM_RESOLUTION,1/s.SIM_RESOLUTION),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,V.texture),e.uniform1i(e.getUniformLocation(O,"uDivergence"),0);for(let r=0;r<s.PRESSURE_ITERATIONS;r++)e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,D.read.texture),e.uniform1i(e.getUniformLocation(O,"uPressure"),1),e.bindFramebuffer(e.FRAMEBUFFER,D.write.fbo),F(),D.swap();e.useProgram(A),e.uniform2f(e.getUniformLocation(A,"texelSize"),1/s.SIM_RESOLUTION,1/s.SIM_RESOLUTION),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,D.read.texture),e.uniform1i(e.getUniformLocation(A,"uPressure"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,R.read.texture),e.uniform1i(e.getUniformLocation(A,"uVelocity"),1),e.bindFramebuffer(e.FRAMEBUFFER,R.write.fbo),F(),R.swap(),e.viewport(0,0,o.width,o.height),e.useProgram(X),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,I.read.texture),e.uniform1i(e.getUniformLocation(X,"uTexture"),0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),F(),Y=requestAnimationFrame(K)};return K(),()=>{window.removeEventListener("mousemove",C),window.removeEventListener("touchstart",C),window.removeEventListener("resize",f),cancelAnimationFrame(Y)}},[]),t.jsx("canvas",{ref:n,className:"fixed inset-0 w-screen h-screen pointer-events-none z-[9999] opacity-30 mix-blend-screen overflow-hidden"})},ve=({onComplete:n})=>{const[o,f]=E.useState(!1);return E.useEffect(()=>{const e=setTimeout(()=>{f(!0),setTimeout(n,1e3)},2e3);return()=>clearTimeout(e)},[n]),t.jsxs("div",{className:"fixed inset-0 z-[100000] flex items-center justify-center bg-transparent overflow-hidden pointer-events-none",children:[t.jsx(S.div,{initial:{y:0},animate:o?{y:"-100%"}:{y:0},transition:{duration:1,ease:[.85,0,.15,1]},className:"absolute top-0 left-0 w-full h-1/2 bg-[var(--color-bg)] z-50 border-b border-[var(--color-border)]"}),t.jsx(S.div,{initial:{y:0},animate:o?{y:"100%"}:{y:0},transition:{duration:1,ease:[.85,0,.15,1]},className:"absolute bottom-0 left-0 w-full h-1/2 bg-[var(--color-bg)] z-50 border-t border-[var(--color-border)]"}),t.jsx("div",{className:"relative z-[60] flex flex-col items-center justify-center",children:t.jsxs(S.div,{initial:{opacity:0,y:20},animate:o?{opacity:0,scale:.95}:{opacity:1,y:0},transition:{duration:1,ease:[.85,0,.15,1]},className:"text-center space-y-6",children:[t.jsxs("h1",{className:"text-6xl md:text-8xl flex flex-col items-center leading-[0.9] tracking-tighter text-[var(--color-text)]",children:[t.jsx("span",{className:"font-sans font-bold uppercase mb-2",children:"Ilyas"}),t.jsx("span",{className:"font-serif italic font-light lowercase",children:"Nour."})]}),t.jsxs("div",{className:"flex flex-col items-center gap-4",children:[t.jsx(S.div,{animate:{width:[0,100,0]},transition:{duration:2,repeat:1/0,ease:"easeInOut"},className:"h-px bg-[var(--color-accent)]"}),t.jsx("span",{className:"font-mono text-[10px] uppercase tracking-[0.6em] text-[var(--color-accent)] opacity-60",children:"Digital Studio"})]})]})})]})},xe=()=>t.jsxs("section",{id:"home",className:"relative h-screen min-h-[700px] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden bg-[var(--color-bg)] transition-colors duration-500",children:[t.jsx("div",{className:"absolute top-1/3 left-0 w-[40vw] h-[40vw] bg-[var(--color-accent)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none"}),t.jsx("div",{className:"container mx-auto relative z-10 flex flex-col items-start text-left",children:t.jsxs(S.div,{initial:{opacity:0,x:-50},animate:{opacity:1,x:0},transition:{duration:1.5,ease:[.85,0,.15,1]},className:"space-y-12 max-w-4xl",children:[t.jsxs("div",{className:"space-y-6",children:[t.jsx(S.span,{initial:{opacity:0},animate:{opacity:.5},transition:{delay:.5,duration:1},className:"font-mono text-[10px] uppercase tracking-[0.6em] block text-[var(--color-text)] opacity-40",children:"Digital Artisan & Full-Stack Developer"}),t.jsxs("h1",{className:"text-[14vw] lg:text-[11vw] leading-[0.85] tracking-tighter text-[var(--color-text)]",children:[t.jsx("span",{className:"font-sans font-bold uppercase block mb-2",children:"Ilyas"}),t.jsx("span",{className:"font-serif italic font-light lowercase",children:"Nour."})]})]}),t.jsxs("p",{className:"text-lg md:text-2xl text-[var(--color-text-muted)] font-sans font-light leading-relaxed max-w-2xl",children:["Engineering elegant digital architecture where ",t.jsx("br",{className:"hidden md:block"}),"clean aesthetics meet technical excellence."]}),t.jsxs("div",{className:"pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-10",children:[t.jsx(S.button,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:()=>{var n;return(n=document.getElementById("projects"))==null?void 0:n.scrollIntoView({behavior:"smooth"})},className:"px-12 py-5 rounded-full border border-[var(--color-border)] glass font-mono text-[10px] uppercase tracking-widest text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-all duration-500",children:"View Selected Projects"}),t.jsxs(S.button,{whileHover:{x:10},onClick:()=>{var n;return(n=document.getElementById("contact"))==null?void 0:n.scrollIntoView({behavior:"smooth"})},className:"font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-4 group",children:["Start a Conversation",t.jsx("span",{className:"text-[var(--color-accent)] group-hover:translate-x-2 transition-transform duration-300",children:"→"})]})]})]})}),t.jsxs(S.div,{initial:{opacity:0},animate:{opacity:.3},transition:{delay:2,duration:1},className:"absolute bottom-10 left-6 md:left-12 lg:left-24 flex flex-col items-start gap-6",children:[t.jsx("div",{className:"w-px h-16 bg-gradient-to-b from-[var(--color-text)] to-transparent"}),t.jsx("span",{className:"font-mono text-[7px] uppercase tracking-[0.5em]",children:"Explore"})]}),t.jsx("div",{className:"absolute inset-0 pointer-events-none opacity-[0.03] z-0",style:{backgroundImage:"radial-gradient(var(--color-text) 0.5px, transparent 0)",backgroundSize:"40px 40px"}})]}),ee=E.createContext(void 0),he=({children:n})=>{const[o,f]=E.useState(()=>typeof window<"u"?localStorage.getItem("theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):"dark");E.useEffect(()=>{document.documentElement.setAttribute("data-theme",o),localStorage.setItem("theme",o)},[o]);const e=()=>{f(i=>i==="light"?"dark":"light")};return t.jsx(ee.Provider,{value:{theme:o,toggleTheme:e},children:n})},pe=()=>{const n=E.useContext(ee);if(!n)throw new Error("useTheme must be used within ThemeProvider");return n},Ee=()=>{const{theme:n,toggleTheme:o}=pe();return t.jsx(S.button,{onClick:o,className:"fixed top-8 right-8 z-[1000] p-4 rounded-full glass flex items-center justify-center overflow-hidden",whileHover:{scale:1.1},whileTap:{scale:.9},children:t.jsxs("div",{className:"relative w-6 h-6",children:[t.jsx(S.div,{animate:{y:n==="dark"?0:30,opacity:n==="dark"?1:0},className:"absolute inset-0 flex items-center justify-center text-white",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-6.364l1.591 1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M18.75 12a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0z"})})}),t.jsx(S.div,{animate:{y:n==="light"?0:-30,opacity:n==="light"?1:0},className:"absolute inset-0 flex items-center justify-center text-black",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"})})})]})})},Te=E.lazy(()=>N(()=>import("./IdentityArchive-CvSpfrfC.js"),__vite__mapDeps([0,1,2,3]))),ge=E.lazy(()=>N(()=>import("./TechStack-OSETBlNI.js"),__vite__mapDeps([4,1,2]))),Re=E.lazy(()=>N(()=>import("./ProjectCatalog-D2m6oTo5.js"),__vite__mapDeps([5,1,2,3]))),be=E.lazy(()=>N(()=>import("./InquiryContact-GZbr2oBx.js"),__vite__mapDeps([6,1,2,3]))),Se=E.lazy(()=>N(()=>import("./MassiveFooter-DKoeENp6.js"),__vite__mapDeps([7,1,2,3])));function Ue(){const[n,o]=Z.useState(!0);return E.useEffect(()=>{const f=new le({duration:1.2,easing:i=>Math.min(1,1.001-Math.pow(2,-10*i)),orientation:"vertical",gestureOrientation:"vertical",smoothWheel:!0,wheelMultiplier:1,touchMultiplier:2,infinite:!1});function e(i){f.raf(i),requestAnimationFrame(e)}return requestAnimationFrame(e),()=>{f.destroy()}},[]),t.jsx(he,{children:t.jsxs("main",{className:"relative min-h-screen selection:bg-[var(--color-accent)] selection:text-white",children:[t.jsx("div",{className:"fixed inset-0 pointer-events-none z-[999] opacity-[0.015] mix-blend-overlay",style:{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3FfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}),t.jsx(Ee,{}),t.jsx(fe,{}),t.jsx(ue,{children:n&&t.jsx(ve,{onComplete:()=>o(!1)})}),t.jsxs("div",{className:"relative z-10 w-full",children:[t.jsx(xe,{}),t.jsxs(E.Suspense,{fallback:t.jsx("div",{className:"h-screen flex items-center justify-center opacity-5 font-mono text-[8px] uppercase tracking-widest",children:"Loading..."}),children:[t.jsx(Te,{}),t.jsx(ge,{}),t.jsx(Re,{}),t.jsx(be,{}),t.jsx(Se,{})]})]})]})})}ce.createRoot(document.getElementById("root")).render(t.jsx(Z.StrictMode,{children:t.jsx(Ue,{})}));
