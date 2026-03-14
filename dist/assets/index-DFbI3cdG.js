const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/IdentityArchive-CRBgUAUN.js","assets/react-vendor-DJIKD06v.js","assets/vendor-XwrmHoPT.js","assets/motion-vendor-C97zinQ4.js","assets/TechStack-DOVgcDkO.js","assets/ProjectCatalog-DQa6q1tg.js","assets/InquiryContact-Colyvrp9.js","assets/MassiveFooter-Dn5YW-iM.js"])))=>i.map(i=>d[i]);
import{r as p,j as t,R as Z,a as te}from"./react-vendor-DJIKD06v.js";import{a8 as re}from"./vendor-XwrmHoPT.js";import{m as l,A as Q,u as ie,a as $}from"./motion-vendor-C97zinQ4.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))h(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&h(i)}).observe(document,{childList:!0,subtree:!0});function m(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function h(e){if(e.ep)return;e.ep=!0;const a=m(e);fetch(e.href,a)}})();const ne="modulepreload",oe=function(v){return"/"+v},K={},L=function(n,m,h){let e=Promise.resolve();if(m&&m.length>0){let i=function(g){return Promise.all(g.map(w=>Promise.resolve(w).then(_=>({status:"fulfilled",value:_}),_=>({status:"rejected",reason:_}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),y=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));e=i(m.map(g=>{if(g=oe(g),g in K)return;K[g]=!0;const w=g.endsWith(".css"),_=w?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${g}"]${_}`))return;const T=document.createElement("link");if(T.rel=w?"stylesheet":ne,w||(T.as="script"),T.crossOrigin="",T.href=g,y&&T.setAttribute("nonce",y),document.head.appendChild(T),w)return new Promise((C,b)=>{T.addEventListener("load",C),T.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${g}`)))})}))}function a(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return e.then(i=>{for(const s of i||[])s.status==="rejected"&&a(s.reason);return n().catch(a)})},o={SIM_RESOLUTION:128,PRESSURE_ITERATIONS:20,SPLAT_RADIUS:.25,SPLAT_FORCE:6e3},ae=()=>{const v=p.useRef(null);return p.useEffect(()=>{const n=v.current;if(!n)return;const{width:m,height:h}=n.getBoundingClientRect();n.width=m,n.height=h;const e=n.getContext("webgl2",{alpha:!0,depth:!1,antialias:!1});if(!e)return;const a=(r,u,f)=>{const c=r.createShader(u);return c?(r.shaderSource(c,f),r.compileShader(c),r.getShaderParameter(c,r.COMPILE_STATUS)?c:(console.error(r.getShaderInfoLog(c)),r.deleteShader(c),null)):null},i=(r,u,f)=>{const c=a(r,r.VERTEX_SHADER,u),x=a(r,r.FRAGMENT_SHADER,f),d=r.createProgram();return!d||!c||!x?null:(r.attachShader(d,c),r.attachShader(d,x),r.linkProgram(d),r.getProgramParameter(d,r.LINK_STATUS)?d:(console.error(r.getProgramInfoLog(d)),null))},s=`#version 300 es
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
    `,y=`#version 300 es
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
    `,g=`#version 300 es
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
    `,w=`#version 300 es
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
    `,_=`#version 300 es
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
    `,T=`#version 300 es
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
    `,C=`#version 300 es
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
    `,b=i(e,s,g),N=i(e,s,w),V=i(e,s,_),j=i(e,s,T),A=i(e,s,C),G=i(e,s,y),B=(r,u,f,c,x,d)=>{e.activeTexture(e.TEXTURE0);const R=e.createTexture();e.bindTexture(e.TEXTURE_2D,R),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,d),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,d),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,f,r,u,0,c,x,null);const U=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,U),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,R,0),e.viewport(0,0,r,u),e.clear(e.COLOR_BUFFER_BIT),{texture:R,fbo:U,width:r,height:u}},k=(r,u,f,c,x,d)=>{let R=B(r,u,f,c,x,d),U=B(r,u,f,c,x,d);return{get read(){return R},get write(){return U},swap(){[R,U]=[U,R]}}};e.getExtension("EXT_color_buffer_float");const F=e.HALF_FLOAT,O=e.RGBA16F,P=e.RGBA;let I=k(o.SIM_RESOLUTION,o.SIM_RESOLUTION,O,P,F,e.LINEAR),E=k(o.SIM_RESOLUTION,o.SIM_RESOLUTION,O,P,F,e.LINEAR),Y=B(o.SIM_RESOLUTION,o.SIM_RESOLUTION,O,P,F,e.NEAREST),D=k(o.SIM_RESOLUTION,o.SIM_RESOLUTION,O,P,F,e.NEAREST);const J=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,J),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),e.STATIC_DRAW);const S=()=>{e.drawArrays(e.TRIANGLE_FAN,0,4)},ee=(r,u,f,c,x)=>{e.viewport(0,0,o.SIM_RESOLUTION,o.SIM_RESOLUTION),e.useProgram(b),e.uniform1f(e.getUniformLocation(b,"aspectRatio"),n.width/n.height),e.uniform2f(e.getUniformLocation(b,"point"),r,u),e.uniform3f(e.getUniformLocation(b,"color"),f,c,0),e.uniform1f(e.getUniformLocation(b,"radius"),o.SPLAT_RADIUS/100),e.bindFramebuffer(e.FRAMEBUFFER,E.write.fbo),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,E.read.texture),e.uniform1i(e.getUniformLocation(b,"uTarget"),0),S(),E.swap(),e.uniform3f(e.getUniformLocation(b,"color"),x.r,x.g,x.b),e.bindFramebuffer(e.FRAMEBUFFER,I.write.fbo),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,I.read.texture),S(),I.swap()};let q=0,H=0;const M=r=>{const u=(r instanceof MouseEvent?r.pageX:r.touches[0].pageX)/n.width,f=1-(r instanceof MouseEvent?r.pageY:r.touches[0].pageY)/n.height,c=(u-q)*o.SPLAT_FORCE,x=(f-H)*o.SPLAT_FORCE,d=[{r:.23,g:.51,b:.96},{r:.5,g:.2,b:1},{r:0,g:1,b:.8}],R=d[Math.floor(Math.random()*d.length)];(Math.abs(c)>0||Math.abs(x)>0)&&ee(u,f,c,x,R),q=u,H=f};window.addEventListener("mousemove",M),window.addEventListener("touchstart",M);const W=()=>{e.disable(e.BLEND),e.viewport(0,0,o.SIM_RESOLUTION,o.SIM_RESOLUTION),e.useProgram(N),e.uniform2f(e.getUniformLocation(N,"texelSize"),1/o.SIM_RESOLUTION,1/o.SIM_RESOLUTION),e.uniform1f(e.getUniformLocation(N,"dt"),.016),e.uniform1f(e.getUniformLocation(N,"dissipation"),1-.01),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,E.read.texture),e.uniform1i(e.getUniformLocation(N,"uVelocity"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,E.read.texture),e.uniform1i(e.getUniformLocation(N,"uSource"),1),e.bindFramebuffer(e.FRAMEBUFFER,E.write.fbo),S(),E.swap(),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,I.read.texture),e.bindFramebuffer(e.FRAMEBUFFER,I.write.fbo),S(),I.swap(),e.useProgram(V),e.uniform2f(e.getUniformLocation(V,"texelSize"),1/o.SIM_RESOLUTION,1/o.SIM_RESOLUTION),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,E.read.texture),e.bindFramebuffer(e.FRAMEBUFFER,Y.fbo),S(),e.useProgram(j),e.uniform2f(e.getUniformLocation(j,"texelSize"),1/o.SIM_RESOLUTION,1/o.SIM_RESOLUTION),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,Y.texture),e.uniform1i(e.getUniformLocation(j,"uDivergence"),0);for(let r=0;r<o.PRESSURE_ITERATIONS;r++)e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,D.read.texture),e.uniform1i(e.getUniformLocation(j,"uPressure"),1),e.bindFramebuffer(e.FRAMEBUFFER,D.write.fbo),S(),D.swap();e.useProgram(A),e.uniform2f(e.getUniformLocation(A,"texelSize"),1/o.SIM_RESOLUTION,1/o.SIM_RESOLUTION),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,D.read.texture),e.uniform1i(e.getUniformLocation(A,"uPressure"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,E.read.texture),e.uniform1i(e.getUniformLocation(A,"uVelocity"),1),e.bindFramebuffer(e.FRAMEBUFFER,E.write.fbo),S(),E.swap(),e.viewport(0,0,n.width,n.height),e.useProgram(G),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,I.read.texture),e.uniform1i(e.getUniformLocation(G,"uTexture"),0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),S(),requestAnimationFrame(W)};return W(),()=>{window.removeEventListener("mousemove",M),window.removeEventListener("touchstart",M)}},[]),t.jsx("canvas",{ref:v,className:"fixed inset-0 w-full h-full pointer-events-none z-[5] opacity-60 mix-blend-screen overflow-hidden"})},X=`
 █████  ██████  ████████ ██ ███████  █████  ███    ██ 
██   ██ ██   ██    ██    ██ ██      ██   ██ ████   ██ 
███████ ██████     ██    ██ ███████ ███████ ██ ██  ██ 
██   ██ ██   ██    ██    ██      ██ ██   ██ ██  ██ ██ 
██   ██ ██   ██    ██    ██ ███████ ██   ██ ██   ████ 
`,z=["[SYSTEM] INITIALIZING ARTISAN_V1.0...","[KERNEL] CURATING COLOR PALETTE...","[DATA] REFINING TYPOGRAPHIC FLOW...","[CRAFTSMAN] ASSEMBLING DIGITAL CANVAS...","[ARTISAN] READY: WELCOME TO THE CREATION."],se=({onComplete:v})=>{const[n,m]=p.useState(0),[h,e]=p.useState(!1);return p.useEffect(()=>{const a=setInterval(()=>{m(y=>y<z.length-1?y+1:(clearInterval(a),y))},400),i=setTimeout(()=>e(!0),500),s=setTimeout(()=>v(),3500);return()=>{clearInterval(a),clearTimeout(i),clearTimeout(s)}},[v]),t.jsxs(l.div,{initial:{opacity:1},exit:{opacity:[1,.8,1,0],scale:[1,1.05,.95,1.2],filter:["blur(0px)","blur(10px)","blur(5px)","blur(40px)"]},transition:{duration:1.2,times:[0,.2,.4,1],ease:"easeInOut"},className:"fixed inset-0 z-[100000] bg-black flex flex-col items-center justify-center font-mono selection:bg-accent selection:text-background overflow-hidden",children:[t.jsxs("div",{className:"absolute inset-0 pointer-events-none z-50",children:[t.jsx("div",{className:"absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-1 bg-[length:100%_2px,3px_100%]"}),t.jsx(l.div,{animate:{opacity:[.1,.15,.1],y:["0%","100%"]},transition:{duration:.1,repeat:1/0,y:{duration:3,repeat:1/0,ease:"linear"}},className:"absolute inset-0 bg-[url('https://res.cloudinary.com/dzv9s1psp/image/upload/v1671536417/noise_btp0vj.png')] mix-blend-overlay"})]}),t.jsx(l.div,{animate:{opacity:[0,.1,0,.05,0]},transition:{duration:.5,repeat:1/0,repeatDelay:1},className:"absolute inset-0 bg-white z-40 pointer-events-none"}),t.jsxs("div",{className:"max-w-4xl w-full px-6 space-y-16 relative z-10",children:[t.jsxs("div",{className:"flex justify-between items-end border-b border-white/10 pb-4",children:[t.jsxs("div",{className:"space-y-1",children:[t.jsx("div",{className:"text-[10px] text-accent font-bold tracking-[0.3em] uppercase",children:"System_Reboot_Sequence"}),t.jsx("div",{className:"text-[14px] text-white/80 font-bold tracking-tighter",children:"ARTISAN_CORE [V.1.0.0]"})]}),t.jsx("div",{className:"text-right",children:t.jsx(l.div,{animate:{opacity:[.3,1,.3]},transition:{duration:1.5,repeat:1/0},className:"text-[10px] text-accent font-mono uppercase tracking-widest",children:"Protocol_Active"})})]}),t.jsxs("div",{className:"space-y-4",children:[t.jsxs("div",{className:"flex justify-between text-[9px] uppercase tracking-widest text-white/40 font-mono",children:[t.jsx("span",{children:"Loading_Resources"}),t.jsx(l.span,{animate:{opacity:[1,0,1]},transition:{duration:1,repeat:1/0},children:"[Executing]"})]}),t.jsx("div",{className:"w-full h-1 bg-white/5 relative overflow-hidden rounded-full",children:t.jsx(l.div,{initial:{width:"0%"},animate:{width:"100%"},transition:{duration:3,ease:[.65,0,.35,1]},className:"absolute top-0 left-0 h-full bg-accent shadow-[0_0_30px_rgba(45,212,191,1)]"})})]}),t.jsx(Q,{children:h&&t.jsxs(l.div,{initial:{opacity:0,scale:.9,filter:"blur(20px)"},animate:{opacity:1,scale:1,filter:"blur(0px)"},className:"relative py-12",children:[t.jsx("pre",{className:"text-[0.55vw] leading-none text-white/40 select-none hidden md:block text-center font-bold tracking-tighter filter grayscale",children:X}),t.jsx(l.pre,{animate:{x:[-1,1,-1],opacity:[.1,.2,.1]},transition:{duration:.1,repeat:1/0},className:"absolute inset-0 text-[0.55vw] leading-none text-red-500/20 select-none hidden md:block text-center font-bold tracking-tighter pointer-events-none",children:X}),t.jsx(l.pre,{animate:{x:[1,-1,1],opacity:[.1,.2,.1]},transition:{duration:.12,repeat:1/0},className:"absolute inset-0 text-[0.55vw] leading-none text-blue-500/20 select-none hidden md:block text-center font-bold tracking-tighter pointer-events-none",children:X})]})}),t.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8 font-mono",children:[t.jsx("div",{className:"space-y-3",children:z.slice(0,n+1).map((a,i)=>t.jsxs(l.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},className:"flex items-center gap-4",children:[t.jsxs("span",{className:"text-white/20 text-[9px] w-8",children:["0x0",i]}),t.jsx("span",{className:`text-[10px] font-bold tracking-widest uppercase ${i===z.length-1?"text-accent":"text-white/60"}`,children:a})]},i))}),t.jsxs("div",{className:"hidden md:block p-4 border border-white/5 bg-white/[0.02] rounded-lg",children:[t.jsxs("div",{className:"text-[8px] uppercase tracking-widest text-white/30 mb-4 flex justify-between",children:[t.jsx("span",{children:"Memory_Stream"}),t.jsx("span",{children:"Buffer: 1024KB"})]}),t.jsx("div",{className:"grid grid-cols-4 gap-2 h-20 overflow-hidden",children:Array.from({length:12}).map((a,i)=>t.jsx(l.div,{animate:{height:[10,30,15,40,10]},transition:{duration:2,repeat:1/0,delay:i*.1},className:"w-full bg-accent/10 border-t border-accent/30"},i))})]})]})]}),t.jsx(l.div,{animate:{scale:[1,1.2,1],opacity:[.2,.3,.2]},transition:{duration:6,repeat:1/0},className:"absolute w-[1000px] h-[1000px] bg-accent/10 rounded-full blur-[150px] pointer-events-none z-0"})]})},ce=()=>{const v=p.useRef(null),{scrollY:n}=ie(),m=$(n,[0,500],[0,200]),h=$(n,[0,300],[1,0]);return t.jsxs("section",{id:"home",ref:v,className:"relative h-screen w-full flex items-center bg-hero-studio overflow-hidden px-6 md:px-12 lg:px-24",children:[t.jsx(l.div,{initial:{opacity:0},animate:{opacity:.05},className:"absolute inset-0 z-0 pointer-events-none",style:{backgroundImage:"url(/assets/real_anime_hero.png)",backgroundPosition:"right bottom",backgroundSize:"contain",backgroundRepeat:"no-repeat"}}),t.jsx("div",{className:"absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[var(--color-accent)]/10 rounded-full blur-[160px] pointer-events-none animate-pulse"}),t.jsx("div",{className:"absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[var(--color-accent)]/10 rounded-full blur-[160px] pointer-events-none animate-pulse delay-1000"}),t.jsxs("div",{className:"absolute inset-0 z-0 pointer-events-none opacity-20",children:[t.jsx(l.div,{animate:{rotate:360},transition:{duration:60,repeat:1/0,ease:"linear"},className:"absolute -top-1/2 -right-1/4 w-[100vw] h-[100vw] border border-white/5 rounded-full"}),t.jsx(l.div,{animate:{rotate:-360},transition:{duration:40,repeat:1/0,ease:"linear"},className:"absolute -bottom-1/4 -left-1/4 w-[80vw] h-[80vw] border border-white/5 rounded-full"})]}),t.jsxs(l.div,{style:{y:m,opacity:h},className:"relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end",children:[t.jsxs("div",{className:"lg:col-span-8 flex flex-col items-start text-left relative",children:[t.jsx("div",{className:"absolute -top-12 -left-8 w-8 h-8 border-t border-l border-[var(--color-accent)]/20 hidden lg:block"}),t.jsxs(l.div,{initial:{opacity:0,x:-50},animate:{opacity:1,x:0},transition:{duration:1},className:"w-full space-y-4",children:[t.jsxs("div",{className:"flex items-center gap-4 mb-2",children:[t.jsx("span",{className:"font-mono text-[8px] uppercase tracking-[0.5em] text-[var(--color-accent)]/60",children:"System_Initiated // 0xAF3"}),t.jsx("div",{className:"h-px w-12 bg-[var(--color-accent)]/20"})]}),t.jsxs("h1",{className:"text-header-responsive font-black text-left flex flex-col items-start gap-0",children:[t.jsx("span",{className:"text-white font-bold uppercase leading-none tracking-tighter",style:{fontFamily:"'Syncopate', sans-serif"},children:"ILYAS"}),t.jsx("span",{className:"text-[var(--color-accent)] font-display italic font-light lowercase tracking-tighter leading-none -mt-4",children:"nour."})]}),t.jsxs("div",{className:"pt-4 md:pt-8 w-full border-t border-white/10 relative",children:[t.jsxs("h2",{className:"text-2xl sm:text-3xl md:text-5xl font-display italic font-light text-[var(--color-accent)]/80 leading-tight tracking-tight",children:["Full-Stack Developer ",t.jsx("br",{}),t.jsx("span",{className:"text-white font-sans not-italic font-black text-3xl sm:text-4xl md:text-6xl",children:"& Websites Builder."})]}),t.jsx("div",{className:"absolute -bottom-6 right-0 font-mono text-[6px] text-white/10 uppercase tracking-widest hidden md:block",children:"Calibration: 0.00ms // Precision: Absolute"})]})]})]}),t.jsxs("div",{className:"lg:col-span-4 flex flex-col justify-end items-start gap-8 lg:gap-12 text-left relative",children:[t.jsx(l.p,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.5,duration:2},className:"text-xs sm:text-sm md:text-base text-white/80 font-mono max-w-[320px] leading-relaxed uppercase tracking-widest",children:"Engineering premium digital architecture with artistic precision."}),t.jsxs(l.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.8,duration:1},className:"flex flex-wrap items-center gap-4 w-full",children:[t.jsx("button",{className:"magnetic-button group w-full sm:w-auto text-center",onClick:()=>{var e;return(e=document.getElementById("contact"))==null?void 0:e.scrollIntoView({behavior:"smooth"})},children:t.jsx("span",{className:"relative z-10",children:"INITIALIZE_SYNC()"})}),t.jsx("button",{className:"px-4 md:px-8 py-3 md:py-4 glass text-white font-mono text-[10px] md:text-xs tracking-widest hover:bg-white/5 transition-colors uppercase w-full sm:w-auto text-center",onClick:()=>{var e;return(e=document.getElementById("projects"))==null?void 0:e.scrollIntoView({behavior:"smooth"})},children:"$ view_archive"})]})]})]}),t.jsx("div",{className:"absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"}),t.jsxs("div",{className:"absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex",children:[t.jsx("span",{className:"font-mono text-[10px] uppercase tracking-[0.5em] text-white/20",children:"Scroll to Explore"}),t.jsx(l.div,{animate:{y:[0,10,0]},transition:{duration:2,repeat:1/0},className:"w-px h-12 bg-white/20"})]})]})},le=p.lazy(()=>L(()=>import("./IdentityArchive-CRBgUAUN.js"),__vite__mapDeps([0,1,2,3]))),ue=p.lazy(()=>L(()=>import("./TechStack-DOVgcDkO.js"),__vite__mapDeps([4,1,2,3]))),de=p.lazy(()=>L(()=>import("./ProjectCatalog-DQa6q1tg.js"),__vite__mapDeps([5,1,2,3]))),me=p.lazy(()=>L(()=>import("./InquiryContact-Colyvrp9.js"),__vite__mapDeps([6,1,2]))),fe=p.lazy(()=>L(()=>import("./MassiveFooter-Dn5YW-iM.js"),__vite__mapDeps([7,1,2,3])));function xe(){const[v,n]=Z.useState(!0);return p.useEffect(()=>{const m=new re({duration:1.2,easing:e=>Math.min(1,1.001-Math.pow(2,-10*e)),orientation:"vertical",gestureOrientation:"vertical",smoothWheel:!0,wheelMultiplier:1,touchMultiplier:2,infinite:!1});function h(e){m.raf(e),requestAnimationFrame(h)}return requestAnimationFrame(h),()=>{m.destroy()}},[]),t.jsxs("main",{className:"relative min-h-screen font-sans overflow-x-hidden selection:bg-[var(--color-accent)] selection:text-white bg-[var(--color-background)]",children:[t.jsx("div",{className:"fixed inset-0 pointer-events-none z-[999] opacity-[0.02] mix-blend-overlay pointer-events-none",style:{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3FfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}),t.jsx(ae,{}),t.jsx(Q,{children:v&&t.jsx(se,{onComplete:()=>n(!1)})}),t.jsxs("div",{className:"relative z-10 w-full",children:[t.jsx(ce,{}),t.jsxs(p.Suspense,{fallback:t.jsx("div",{className:"h-screen flex items-center justify-center opacity-5 font-mono text-[8px] uppercase tracking-widest",children:"Hydrating_Module..."}),children:[t.jsx(le,{}),t.jsx(ue,{}),t.jsx(de,{}),t.jsx(me,{}),t.jsx(fe,{})]})]})]})}te.createRoot(document.getElementById("root")).render(t.jsx(Z.StrictMode,{children:t.jsx(xe,{})}));
