const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/IdentityArchive-B2Ssr4-i.js","assets/react-vendor-C6wAbPJK.js","assets/vendor-mDk4w9fR.js","assets/motion-vendor-B-ZcOnaJ.js","assets/TechStack-QANGE9IL.js","assets/ProjectCatalog-DHFIHaXi.js","assets/InquiryContact-BVvBO7ir.js","assets/MassiveFooter-1azcqsN0.js"])))=>i.map(i=>d[i]);
import{r as f,j as t,u as ge,R as de,a as Ee}from"./react-vendor-C6wAbPJK.js";import{g as me,aa as Te,ab as be}from"./vendor-mDk4w9fR.js";import{m as w,u as se,a as ce,A as Re}from"./motion-vendor-B-ZcOnaJ.js";(function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const l of e)if(l.type==="childList")for(const n of l.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const l={};return e.integrity&&(l.integrity=e.integrity),e.referrerPolicy&&(l.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?l.credentials="include":e.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function c(e){if(e.ep)return;e.ep=!0;const l=a(e);fetch(e.href,l)}})();const ye="modulepreload",Se=function(i){return"/"+i},le={},$=function(u,a,c){let e=Promise.resolve();if(a&&a.length>0){let n=function(p){return Promise.all(p.map(E=>Promise.resolve(E).then(s=>({status:"fulfilled",value:s}),s=>({status:"rejected",reason:s}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),x=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));e=n(a.map(p=>{if(p=Se(p),p in le)return;le[p]=!0;const E=p.endsWith(".css"),s=E?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${s}`))return;const h=document.createElement("link");if(h.rel=E?"stylesheet":ye,E||(h.as="script"),h.crossOrigin="",h.href=p,x&&h.setAttribute("nonce",x),document.head.appendChild(h),E)return new Promise((U,m)=>{h.addEventListener("load",U),h.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${p}`)))})}))}function l(n){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=n,window.dispatchEvent(r),!r.defaultPrevented)throw n}return e.then(n=>{for(const r of n||[])r.status==="rejected"&&l(r.reason);return u().catch(l)})},d={SIM_RESOLUTION:64,PRESSURE_ITERATIONS:10,SPLAT_RADIUS:.25,SPLAT_FORCE:6e3},we=()=>{const i=f.useRef(null);f.useEffect(()=>{var ae;const a=i.current;if(!a)return;const c=()=>{a.width=window.innerWidth,a.height=window.innerHeight};window.addEventListener("resize",c),c();const e=a.getContext("webgl2",{alpha:!0,depth:!1,antialias:!1})||a.getContext("webgl",{alpha:!0,depth:!1,antialias:!1});if(!e){console.warn("FluidCursor: WebGL context not available. Interaction disabled.");return}const l=(o,b,y)=>{const v=o.createShader(b);return v?(o.shaderSource(v,y),o.compileShader(v),o.getShaderParameter(v,o.COMPILE_STATUS)?v:(console.error("FluidCursor Shader Error:",o.getShaderInfoLog(v)),o.deleteShader(v),null)):null},n=(o,b,y)=>{const v=l(o,o.VERTEX_SHADER,b),g=l(o,o.FRAGMENT_SHADER,y),T=o.createProgram();return!T||!v||!g?null:(o.attachShader(T,v),o.attachShader(T,g),o.linkProgram(T),T)},r=e instanceof WebGL2RenderingContext,x=r?"#version 300 es":"",p=r?"in":"attribute",E=r?"out":"varying",s=r?"in":"varying",h=r?"layout(location = 0) out vec4 outColor;":"",U=r?"outColor":"gl_FragColor",m=r?"texture":"texture2D",S=`${x}
      precision highp float;
      ${r?"layout(location = 0)":""} ${p} vec2 aPosition;
      ${E} vec2 vUv;
      ${E} vec2 vL;
      ${E} vec2 vR;
      ${E} vec2 vT;
      ${E} vec2 vB;
      uniform vec2 texelSize;
      void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `,M=`${x}
      precision highp float;
      ${s} vec2 vUv;
      uniform sampler2D uTexture;
      ${h}
      void main () {
          vec3 c = ${m}(uTexture, vUv).rgb;
          float a = max(c.r, max(c.g, c.b));
          ${U} = vec4(c, a * 0.95);
      }
    `,k=`${x}
      precision highp float;
      ${s} vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      ${h}
      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = ${m}(uTarget, vUv).xyz;
          ${U} = vec4(base + splat, 1.0);
      }
    `,V=`${x}
      precision highp float;
      ${s} vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;
      ${h}
      void main () {
          vec2 coord = vUv - dt * ${m}(uVelocity, vUv).xy * texelSize;
          ${U} = dissipation * ${m}(uSource, coord);
      }
    `,G=`${x}
      precision highp float;
      ${s} vec2 vUv;
      ${s} vec2 vL;
      ${s} vec2 vR;
      ${s} vec2 vT;
      ${s} vec2 vB;
      uniform sampler2D uVelocity;
      ${h}
      void main () {
          float L = ${m}(uVelocity, vL).x;
          float R = ${m}(uVelocity, vR).x;
          float T = ${m}(uVelocity, vT).y;
          float B = ${m}(uVelocity, vB).y;
          float div = 0.5 * (R - L + T - B);
          ${U} = vec4(div, 0.0, 0.0, 1.0);
      }
    `,Y=`${x}
      precision highp float;
      ${s} vec2 vUv;
      ${s} vec2 vL;
      ${s} vec2 vR;
      ${s} vec2 vT;
      ${s} vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      ${h}
      void main () {
          float L = ${m}(uPressure, vL).x;
          float R = ${m}(uPressure, vR).x;
          float T = ${m}(uPressure, vT).x;
          float B = ${m}(uPressure, vB).x;
          float div = ${m}(uDivergence, vUv).x;
          float p = (L + R + B + T - div) * 0.25;
          ${U} = vec4(p, 0.0, 0.0, 1.0);
      }
    `,q=`${x}
      precision highp float;
      ${s} vec2 vUv;
      ${s} vec2 vL;
      ${s} vec2 vR;
      ${s} vec2 vT;
      ${s} vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      ${h}
      void main () {
          float L = ${m}(uPressure, vL).x;
          float R = ${m}(uPressure, vR).x;
          float T = ${m}(uPressure, vT).x;
          float B = ${m}(uPressure, vB).x;
          vec2 vel = ${m}(uVelocity, vUv).xy;
          vel.xy -= vec2(R - L, T - B) * 0.5;
          ${U} = vec4(vel, 0.0, 1.0);
      }
    `,F=n(e,S,k),I=n(e,S,V),W=n(e,S,G),O=n(e,S,Y),P=n(e,S,q),H=n(e,S,M);if(!F||!I||!W||!O||!P||!H)return;const K=(o,b,y,v,g,T)=>{e.activeTexture(e.TEXTURE0);const _=e.createTexture();e.bindTexture(e.TEXTURE_2D,_),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,T),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,T),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,y,o,b,0,v,g,null);const L=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,L),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,_,0),{texture:_,fbo:L,width:o,height:b}},Q=(o,b,y,v,g,T)=>{let _=K(o,b,y,v,g,T),L=K(o,b,y,v,g,T);return{get read(){return _},get write(){return L},swap(){[_,L]=[L,_]}}};e.getExtension("EXT_color_buffer_float");const D=r?e.HALF_FLOAT:((ae=e.getExtension("OES_texture_half_float"))==null?void 0:ae.HALF_FLOAT_OES)||e.FLOAT,B=r?e.RGBA16F:e.RGBA,X=e.RGBA;let A=Q(d.SIM_RESOLUTION,d.SIM_RESOLUTION,B,X,D,e.LINEAR),R=Q(d.SIM_RESOLUTION,d.SIM_RESOLUTION,B,X,D,e.LINEAR),Z=K(d.SIM_RESOLUTION,d.SIM_RESOLUTION,B,X,D,e.NEAREST),C=Q(d.SIM_RESOLUTION,d.SIM_RESOLUTION,B,X,D,e.NEAREST);const ee=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,ee),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),e.STATIC_DRAW);const j=()=>{e.bindBuffer(e.ARRAY_BUFFER,ee),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.drawArrays(e.TRIANGLE_FAN,0,4)},fe=(o,b,y,v,g)=>{e.viewport(0,0,d.SIM_RESOLUTION,d.SIM_RESOLUTION),e.useProgram(F),e.uniform1f(e.getUniformLocation(F,"aspectRatio"),a.width/a.height),e.uniform2f(e.getUniformLocation(F,"point"),o,b),e.uniform3f(e.getUniformLocation(F,"color"),y,v,0),e.uniform1f(e.getUniformLocation(F,"radius"),d.SPLAT_RADIUS/100),e.bindFramebuffer(e.FRAMEBUFFER,R.write.fbo),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,R.read.texture),e.uniform1i(e.getUniformLocation(F,"uTarget"),0),j(),R.swap(),e.uniform3f(e.getUniformLocation(F,"color"),g.r,g.g,g.b),e.bindFramebuffer(e.FRAMEBUFFER,A.write.fbo),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,A.read.texture),j(),A.swap()};let te=0,re=0,N=document.documentElement.getAttribute("data-theme")==="dark";const ne=new MutationObserver(()=>{N=document.documentElement.getAttribute("data-theme")==="dark",a.className=`fixed inset-0 w-screen h-screen pointer-events-none z-[9999] opacity-70 overflow-hidden ${N?"mix-blend-screen":"mix-blend-multiply"}`});ne.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]});const z=o=>{const b=o instanceof MouseEvent?o.clientX:o.touches[0].clientX,y=o instanceof MouseEvent?o.clientY:o.touches[0].clientY,v=b/window.innerWidth,g=1-y/window.innerHeight,T=(v-te)*d.SPLAT_FORCE,_=(g-re)*d.SPLAT_FORCE,L=Date.now()*.005,ve=Math.sin(L)*.5+.5,xe=Math.sin(L+2.1)*.5+.5,he=Math.sin(L+4.2)*.5+.5,J=N?.9:1.2,pe={r:Math.min(1,ve*J+(N?.1:0)),g:Math.min(1,xe*J+(N?.1:0)),b:Math.min(1,he*J+(N?.1:0))};(Math.abs(T)>1e-4||Math.abs(_)>1e-4)&&fe(v,g,T,_,pe),te=v,re=g};window.addEventListener("mousemove",z),window.addEventListener("touchstart",z);let oe;const ie=()=>{e.disable(e.BLEND),e.viewport(0,0,d.SIM_RESOLUTION,d.SIM_RESOLUTION),e.useProgram(I),e.uniform2f(e.getUniformLocation(I,"texelSize"),1/d.SIM_RESOLUTION,1/d.SIM_RESOLUTION),e.uniform1f(e.getUniformLocation(I,"dt"),.016),e.uniform1f(e.getUniformLocation(I,"dissipation"),.8),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,R.read.texture),e.uniform1i(e.getUniformLocation(I,"uVelocity"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,R.read.texture),e.uniform1i(e.getUniformLocation(I,"uSource"),1),e.bindFramebuffer(e.FRAMEBUFFER,R.write.fbo),j(),R.swap(),e.uniform1f(e.getUniformLocation(I,"dissipation"),N?.92:.95),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,A.read.texture),e.bindFramebuffer(e.FRAMEBUFFER,A.write.fbo),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,R.read.texture),j(),A.swap(),e.useProgram(W),e.uniform2f(e.getUniformLocation(W,"texelSize"),1/d.SIM_RESOLUTION,1/d.SIM_RESOLUTION),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,R.read.texture),e.bindFramebuffer(e.FRAMEBUFFER,Z.fbo),j(),e.useProgram(O),e.uniform2f(e.getUniformLocation(O,"texelSize"),1/d.SIM_RESOLUTION,1/d.SIM_RESOLUTION),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,Z.texture),e.uniform1i(e.getUniformLocation(O,"uDivergence"),0);for(let o=0;o<d.PRESSURE_ITERATIONS;o++)e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,C.read.texture),e.uniform1i(e.getUniformLocation(O,"uPressure"),1),e.bindFramebuffer(e.FRAMEBUFFER,C.write.fbo),j(),C.swap();e.useProgram(P),e.uniform2f(e.getUniformLocation(P,"texelSize"),1/d.SIM_RESOLUTION,1/d.SIM_RESOLUTION),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,C.read.texture),e.uniform1i(e.getUniformLocation(P,"uPressure"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,R.read.texture),e.uniform1i(e.getUniformLocation(P,"uVelocity"),1),e.bindFramebuffer(e.FRAMEBUFFER,R.write.fbo),j(),R.swap(),e.viewport(0,0,a.width,a.height),e.useProgram(H),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,A.read.texture),e.uniform1i(e.getUniformLocation(H,"uTexture"),0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),j(),oe=requestAnimationFrame(ie)};return ie(),()=>{window.removeEventListener("mousemove",z),window.removeEventListener("touchstart",z),window.removeEventListener("resize",c),ne.disconnect(),cancelAnimationFrame(oe)}},[]);const u=typeof document<"u"&&document.documentElement.getAttribute("data-theme")==="dark";return t.jsx("canvas",{ref:i,className:`fixed inset-0 w-screen h-screen pointer-events-none z-[9999] opacity-70 overflow-hidden ${u?"mix-blend-screen":"mix-blend-multiply"}`})},Ue=({onComplete:i})=>{const[u,a]=f.useState(!1);return f.useEffect(()=>{const c=setTimeout(()=>{a(!0),setTimeout(i,800)},1200);return()=>clearTimeout(c)},[i]),t.jsxs("div",{className:"fixed inset-0 z-[100000] flex items-center justify-center bg-transparent overflow-hidden pointer-events-none",children:[t.jsx(w.div,{initial:{y:0},animate:u?{y:"-100%"}:{y:0},transition:{duration:.8,ease:[.85,0,.15,1]},className:"absolute top-0 left-0 w-full h-1/2 bg-[var(--color-bg)] z-50"}),t.jsx(w.div,{initial:{y:0},animate:u?{y:"100%"}:{y:0},transition:{duration:.8,ease:[.85,0,.15,1]},className:"absolute bottom-0 left-0 w-full h-1/2 bg-[var(--color-bg)] z-50"}),t.jsx("div",{className:"relative z-[60] flex flex-col items-center justify-center",children:t.jsx(w.div,{initial:{opacity:0,y:20},animate:u?{opacity:0,scale:.9}:{opacity:1,y:0},transition:{duration:.6,ease:"easeOut"},className:"text-center",children:t.jsx("h1",{className:"text-7xl md:text-9xl text-[var(--color-text)] tracking-tight",style:{fontFamily:"var(--font-signature)"},children:"Ilyas Nour"})})})]})},ue=({children:i,onClick:u,className:a="",variant:c="outline",icon:e,type:l="button",disabled:n=!1})=>{const r=f.useRef(null),x=se(0),p=se(0),E=ce(x,{stiffness:150,damping:20}),s=ce(p,{stiffness:150,damping:20}),h=m=>{if(!r.current)return;const S=r.current.getBoundingClientRect(),M=m.clientX-S.left,k=m.clientY-S.top;r.current.style.setProperty("--x",`${M}px`),r.current.style.setProperty("--y",`${k}px`);const V=S.width/2,G=S.height/2,Y=(M-V)*.15,q=(k-G)*.15;x.set(Y),p.set(q)},U=()=>{x.set(0),p.set(0)};return t.jsxs(w.button,{ref:r,type:l,disabled:n,onMouseMove:h,onMouseLeave:U,onClick:u,style:{x:E,y:s},className:`btn-kinetic ${c==="primary"?"btn-kinetic-primary":""} ${n?"opacity-50 cursor-not-allowed":""} ${a}`,children:[t.jsx("span",{children:i}),e&&t.jsx("span",{className:"transform group-hover:translate-x-1 transition-transform",children:e})]})};me.registerPlugin(Te);const _e=()=>(ge(()=>{const i=me.timeline({scrollTrigger:{trigger:"#home",start:"top top",end:"+=1",scrub:!0}});i.to("#gojo-masked",{opacity:0,ease:"none"},0),i.to("#gojo-unmasked",{opacity:.3,ease:"none"},0)},[]),t.jsxs("section",{id:"home",className:"relative h-screen min-h-[700px] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden bg-[var(--color-bg)] transition-colors duration-500",children:[t.jsxs("div",{className:"absolute inset-0 z-0 pointer-events-none overflow-hidden select-none",children:[t.jsx(w.img,{id:"gojo-masked",initial:{opacity:.1,scale:1},src:"/gojo_outline_alchemical_1773527133132.png",alt:"Masked Presence",className:`w-full h-full object-cover object-center scale-150 md:scale-110 \r
                     mix-blend-screen brightness-100 invert-0\r
                     dark:mix-blend-screen dark:brightness-100 dark:invert-0\r
                     [&:not(.dark *)]:invert [&:not(.dark *)]:brightness-[1.2] [&:not(.dark *)]:mix-blend-multiply`}),t.jsx(w.img,{id:"gojo-unmasked",initial:{opacity:0,scale:1},src:"/gojo_unmasked_adaptive.png",alt:"Unmasked Presence",className:`absolute inset-0 w-full h-full object-cover object-center scale-150 md:scale-110 \r
                     mix-blend-screen brightness-100 invert-0\r
                     dark:mix-blend-screen dark:brightness-100 dark:invert-0\r
                     [&:not(.dark *)]:invert [&:not(.dark *)]:brightness-[1.2] [&:not(.dark *)]:mix-blend-multiply`})]}),t.jsx("div",{className:"container mx-auto relative z-10 flex flex-col items-center md:items-start text-center md:text-left",children:t.jsxs(w.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:1.5,ease:[.85,0,.15,1]},className:"space-y-8 md:space-y-12 w-full max-w-4xl flex flex-col items-center md:items-start",children:[t.jsx("div",{className:"space-y-4 md:space-y-6 w-full",children:t.jsxs("h1",{className:"text-[12vw] leading-[0.7] tracking-tight text-[var(--color-text)] relative flex flex-col items-center md:items-start w-full",style:{fontSize:"clamp(3rem, 12vw, 15vw)"},children:[t.jsx("span",{className:"font-serif font-bold uppercase block -mb-2 md:-mb-4 tracking-[-0.05em] opacity-40 md:opacity-100",children:"Ilyas"}),t.jsx("span",{className:"block w-full text-center md:text-left md:ml-[5vw]",style:{fontFamily:"var(--font-signature)",fontSize:"clamp(4rem, 25vw, 12rem)",lineHeight:1},children:"Nour."})]})}),t.jsxs("p",{className:"text-base md:text-2xl text-[var(--color-text-muted)] font-sans font-light leading-relaxed max-w-2xl",children:["Engineering elegant digital architecture where ",t.jsx("br",{className:"hidden md:block"}),"clean aesthetics meet technical excellence."]}),t.jsxs("div",{className:"pt-4 md:pt-8 flex flex-col sm:flex-row items-center md:items-start gap-6 md:gap-10",children:[t.jsx(ue,{onClick:()=>{var i;return(i=document.getElementById("projects"))==null?void 0:i.scrollIntoView({behavior:"smooth"})},children:"Illuminate Projects"}),t.jsx(ue,{variant:"outline",onClick:()=>{var i;return(i=document.getElementById("contact"))==null?void 0:i.scrollIntoView({behavior:"smooth"})},className:"group",icon:t.jsx("span",{className:"text-[var(--color-accent)] group-hover:translate-x-2 transition-transform duration-300",children:"→"}),children:"Begin Dialogue"})]})]})}),t.jsxs(w.div,{initial:{opacity:0},animate:{opacity:.3},transition:{delay:2,duration:1},className:"absolute bottom-10 left-6 md:left-12 lg:left-24 flex flex-col items-start gap-6",children:[t.jsx("div",{className:"w-px h-16 bg-gradient-to-b from-[var(--color-text)] to-transparent"}),t.jsx("span",{className:"font-mono text-[7px] uppercase tracking-[0.5em]",children:"Explore"})]}),t.jsx("div",{className:"absolute inset-0 pointer-events-none opacity-[0.03] z-0",style:{backgroundImage:"radial-gradient(var(--color-text) 0.5px, transparent 0)",backgroundSize:"40px 40px"}})]})),Le=f.createContext(void 0),Fe=({children:i})=>{const[u,a]=f.useState(()=>{if(typeof window<"u"){const e=localStorage.getItem("theme");return e||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}return"dark"});f.useEffect(()=>{document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},[u]);const c=()=>{a(e=>e==="light"?"dark":"light")};return t.jsx(Le.Provider,{value:{theme:u,toggleTheme:c},children:i})},Ie=i=>{const[u,a]=f.useState(i[0]||""),c=f.useRef({});return f.useEffect(()=>{const e=new IntersectionObserver(l=>{l.forEach(r=>{c.current[r.target.id]=r.isIntersecting});const n=i.filter(r=>c.current[r]);if(n.length>0){const r=n[n.length-1];a(r)}},{threshold:[0,.1,.2,.5],rootMargin:"-15% 0px -75% 0px"});return i.forEach(l=>{const n=document.getElementById(l);n&&e.observe(n)}),()=>{e.disconnect()}},[i]),u},je=()=>{const[i,u]=f.useState(!1),a=Ie(["home","about","expertise","projects","contact"]),[c,e]=f.useState("dark");f.useEffect(()=>{const n=()=>{u(window.scrollY>50)},r=document.documentElement.getAttribute("data-theme")||"dark";return e(r),window.addEventListener("scroll",n),()=>{window.removeEventListener("scroll",n)}},[]);const l=()=>{const n=c==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",n),e(n),localStorage.setItem("theme",n)};return t.jsxs(t.Fragment,{children:[t.jsx(w.nav,{initial:{y:-100},animate:{y:0},className:`fixed top-0 left-0 w-full z-[10000] transition-all duration-700 px-6 md:px-12 py-6 ${i?"glass py-4":"bg-transparent"}`,children:t.jsxs("div",{className:"max-w-7xl mx-auto flex justify-between items-center",children:[t.jsx("a",{href:"#",className:"flex flex-col group",children:t.jsx("span",{className:"font-serif italic text-2xl md:text-3xl text-[var(--color-text)] leading-none transform group-hover:skew-x-2 transition-transform duration-500",children:"Ilyas."})}),t.jsx("div",{className:"hidden md:flex items-center gap-12 font-mono text-[10px] uppercase tracking-widest",children:[{name:"Home",id:"home"},{name:"About",id:"about"},{name:"Expertise",id:"expertise"},{name:"Projects",id:"projects"}].map(n=>t.jsx("a",{href:`#${n.id}`,className:`navbar-link ${a===n.id?"active":""}`,children:t.jsx("span",{className:"prismatic-link",children:n.name.split("").map((r,x)=>t.jsx("span",{className:"prismatic-char",style:{transitionDelay:`${x*30}ms`},children:r},x))})},n.id))}),t.jsxs("div",{className:"flex items-center gap-6",children:[t.jsx("button",{onClick:l,className:"w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-all duration-500",title:`Switch to ${c==="dark"?"light":"dark"} mode`,children:c==="dark"?"☼":"☾"}),t.jsx("a",{href:"#contact",className:"hidden sm:flex px-6 py-2 border border-[var(--color-text)] rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-all duration-500",children:"Inquire"})]})]})}),t.jsx("svg",{style:{position:"absolute",width:0,height:0,pointerEvents:"none"},children:t.jsx("defs",{children:t.jsxs("filter",{id:"distort",children:[t.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.01 0.05",numOctaves:"3",result:"noise"}),t.jsx("feDisplacementMap",{in:"SourceGraphic",in2:"noise",scale:"5"})]})})})]})},Ae=()=>{f.useEffect(()=>{console.log(`%c
    ██╗██╗     ██╗   ██╗ █████╗ ███████╗    ███╗   ██╗ ██████╗ ██╗   ██╗██████╗ 
    ██║██║     ╚██╗ ██╔╝██╔══██╗██╔════╝    ████╗  ██║██╔═══██╗██║   ██║██╔══██╗
    ██║██║      ╚████╔╝ ███████║███████╗    ██╔██╗ ██║██║   ██║██║   ██║██████╔╝
    ██║██║       ╚██╔╝  ██╔══██║╚════██║    ██║╚██╗██║██║   ██║██║   ██║██╔══██╗
    ██║███████╗   ██║   ██║  ██║███████║    ██║ ╚████║╚██████╔╝╚██████╔╝██║  ██║
    ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝
    %c
⚡ Digital Architecture by Ilyas Nour
🛠 Built with React, GSAP, & Framer Motion

%c"Alchemical code for the modern web."%c`,"color: #6366f1; font-weight: bold;","color: #888; font-style: italic;","color: #6366f1; font-weight: bold; font-style: italic;","color: inherit;")},[])},Ne=f.lazy(()=>$(()=>import("./IdentityArchive-B2Ssr4-i.js"),__vite__mapDeps([0,1,2,3]))),Oe=f.lazy(()=>$(()=>import("./TechStack-QANGE9IL.js"),__vite__mapDeps([4,1,2,3]))),Pe=f.lazy(()=>$(()=>import("./ProjectCatalog-DHFIHaXi.js"),__vite__mapDeps([5,1,2,3]))),$e=f.lazy(()=>$(()=>import("./InquiryContact-BVvBO7ir.js"),__vite__mapDeps([6,1,2,3]))),Me=f.lazy(()=>$(()=>import("./MassiveFooter-1azcqsN0.js"),__vite__mapDeps([7,1,2,3])));function ke(){Ae();const[i,u]=de.useState(!0);return f.useEffect(()=>{const a=new be({duration:1.2,easing:e=>Math.min(1,1.001-Math.pow(2,-10*e)),orientation:"vertical",gestureOrientation:"vertical",smoothWheel:!0,wheelMultiplier:1,touchMultiplier:2,infinite:!1});function c(e){a.raf(e),requestAnimationFrame(c)}return requestAnimationFrame(c),()=>{a.destroy()}},[]),t.jsx(Fe,{children:t.jsxs("main",{className:"relative min-h-screen selection:bg-[var(--color-accent)] selection:text-white",children:[t.jsx("div",{className:"fixed inset-0 pointer-events-none z-[999] opacity-[0.015] mix-blend-overlay",style:{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3FfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}),t.jsx(je,{}),t.jsx(we,{}),t.jsx(Re,{children:i&&t.jsx(Ue,{onComplete:()=>u(!1)})}),t.jsxs("div",{className:"relative z-10 w-full",children:[t.jsx(w.div,{initial:{opacity:0,scale:.9},whileInView:{opacity:1,scale:1},viewport:{margin:"-100px"},transition:{duration:1.2,ease:[.85,0,.15,1]},children:t.jsx(_e,{})}),t.jsx(f.Suspense,{fallback:t.jsx("div",{className:"h-screen flex items-center justify-center opacity-5 font-mono text-[8px] uppercase tracking-widest",children:"Loading Digital Architecture..."}),children:[{id:"about",Component:Ne},{id:"skills",Component:Oe},{id:"projects",Component:Pe},{id:"contact",Component:$e},{id:"footer",Component:Me}].map(({id:a,Component:c})=>t.jsx(w.div,{initial:{opacity:0,scale:.95,y:50},whileInView:{opacity:1,scale:1,y:0},viewport:{margin:"-5%"},transition:{duration:1,ease:[.85,0,.15,1]},className:"will-change-transform",children:t.jsx(c,{})},a))})]})]})})}Ee.createRoot(document.getElementById("root")).render(t.jsx(de.StrictMode,{children:t.jsx(ke,{})}));export{ue as K,Ie as u};
