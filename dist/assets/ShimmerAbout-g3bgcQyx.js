import{a as i,u as f,j as e}from"./react-vendor-70Kze2V4.js";import{C as g,u as b,V as u,a as l,b as j}from"./three-vendor-CQFfq_GZ.js";import{g as x,ah as y}from"./vendor-DPzc8ZBC.js";import{u as N}from"./index-Im8PsXfX.js";import{u as S,b as m,m as d}from"./motion-vendor-X9QeLGFO.js";x.registerPlugin(y);const v={uniforms:{uTime:{value:0},uColor1:{value:new l("#0a0a2a")},uColor2:{value:new l("#14b8a6")},uNoiseScale:{value:2},uIntensity:{value:1},uMouse:{value:new u(.5,.5)},uScroll:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uNoiseScale;
    uniform float uIntensity;
    uniform vec2 uMouse;
    uniform float uScroll;
    varying vec2 vUv;

    // Standard hash function for noise
    vec3 hash(vec3 p) {
        p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
                 dot(p, vec3(269.5, 183.3, 246.1)),
                 dot(p, vec3(113.5, 271.9, 124.6)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
    }

    // Gradient Noise
    float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        vec3 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(dot(hash(i + vec3(0, 0, 0)), f - vec3(0, 0, 0)),
                           dot(hash(i + vec3(1, 0, 0)), f - vec3(1, 0, 0)), u.x),
                       mix(dot(hash(i + vec3(0, 1, 0)), f - vec3(0, 1, 0)),
                           dot(hash(i + vec3(1, 1, 0)), f - vec3(1, 1, 0)), u.x), u.y),
                   mix(mix(dot(hash(i + vec3(0, 0, 1)), f - vec3(0, 0, 1)),
                           dot(hash(i + vec3(1, 0, 1)), f - vec3(1, 0, 1)), u.x),
                       mix(dot(hash(i + vec3(0, 1, 1)), f - vec3(0, 1, 1)),
                           dot(hash(i + vec3(1, 1, 1)), f - vec3(1, 1, 1)), u.x), u.y), u.z);
    }

    void main() {
      vec2 uv = vUv;
      
      // Interaction distortion
      float dist = distance(uv, uMouse);
      uv += (uv - uMouse) * exp(-dist * 10.0) * 0.05;

      // Layered Noise for Caustics
      float n = noise(vec3(uv * uNoiseScale, uTime * 0.2 + uScroll * 0.5));
      n += 0.5 * noise(vec3(uv * uNoiseScale * 2.0, uTime * 0.4));
      
      // Prismatic color blending
      vec3 color = mix(uColor1, uColor2, n * 0.5 + 0.5);
      
      // Add "shimmer" highlights
      float shimmer = pow(max(0.0, n), 3.0) * uIntensity;
      color += vec3(shimmer) * vec3(0.8, 0.9, 1.0);

      gl_FragColor = vec4(color, 1.0);
    }
  `},w=({scrollProgress:t,theme:c})=>{const o=i.useRef(null),r=i.useRef(null),{mouse:n}=b(),s=c==="dark"?"#020617":"#cbd5e1",a=c==="dark"?"#3b82f6":"#64748b",h=i.useMemo(()=>({...v.uniforms,uColor1:{value:new l(s)},uColor2:{value:new l(a)},uMouse:{value:new u(.5,.5)}}),[]);return i.useEffect(()=>{r.current&&(r.current.uniforms.uColor1.value.set(s),r.current.uniforms.uColor2.value.set(a))},[s,a]),j(p=>{r.current&&(r.current.uniforms.uTime.value=p.clock.getElapsedTime(),r.current.uniforms.uMouse.value.lerp(new u(n.x*.5+.5,n.y*.5+.5),.1),r.current.uniforms.uScroll.value=t.get())}),e.jsxs("mesh",{ref:o,scale:[2,2,1],children:[e.jsx("planeGeometry",{args:[1,1]}),e.jsx("shaderMaterial",{ref:r,...v,uniforms:h,transparent:!0})]})},R=()=>{const t=i.useRef(null),{theme:c}=N(),{scrollYProgress:o}=S({target:t,offset:["start end","end start"]}),r=m(o,[0,.2,.8,1],[0,1,1,0]),n=m(o,[0,.2],[50,0]);return f(()=>{x.from(".shimmer-narrative",{opacity:0,y:30,duration:1.5,stagger:.3,ease:"power3.out",scrollTrigger:{trigger:t.current,start:"top center",toggleActions:"play none none reverse"}})},{scope:t}),e.jsxs("section",{id:"about",ref:t,className:"min-h-screen relative overflow-hidden bg-[var(--color-bg)] flex items-center py-32 transition-colors duration-500",children:[e.jsx("div",{className:"absolute inset-0 z-0 opacity-40",children:e.jsx(g,{children:e.jsx(w,{scrollProgress:o,theme:c})})}),e.jsx("div",{className:"absolute inset-0 z-10 pointer-events-none opacity-[0.03]",style:{backgroundImage:"linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)",backgroundSize:"100px 100px"}}),e.jsx("div",{className:"container mx-auto px-6 md:px-24 relative z-20",children:e.jsxs(d.div,{style:{opacity:r,y:n},className:"max-w-5xl space-y-24",children:[e.jsxs("div",{className:"shimmer-narrative",children:[e.jsx("span",{className:"font-mono text-[10px] uppercase tracking-[1em] text-[var(--color-accent)] mb-8 block",children:"Project : Identity"}),e.jsxs("h2",{className:"text-6xl md:text-[9rem] font-black text-[var(--color-text)] leading-[0.8] tracking-tighter uppercase italic font-serif",children:["Prismatic ",e.jsx("br",{})," ",e.jsx("span",{className:"not-italic font-sans opacity-20",children:"Presence."})]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-16 items-start",children:[e.jsx("div",{className:"lg:col-span-8 shimmer-narrative",children:e.jsxs("p",{className:"text-2xl md:text-5xl text-[var(--color-text)] font-light leading-tight",children:["I architect ",e.jsx("span",{className:"text-[var(--color-accent)] italic",children:"atmospheric"})," digital spaces where aesthetic intuition meets brutal technical precision."]})}),e.jsxs("div",{className:"lg:col-span-4 shimmer-narrative space-y-6 pt-4",children:[e.jsx("p",{className:"text-[var(--color-text-muted)] font-sans text-sm leading-relaxed uppercase tracking-widest",children:"Specializing in React, Three.js, and high-fidelity motion. Based in Morocco, operating globally."}),e.jsx("div",{className:"h-[1px] w-20 bg-[var(--color-accent)] opacity-50"})]})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8 shimmer-narrative",children:[{title:"Strategy",desc:"Understanding the core 'Why' before drafting the 'How'."},{title:"Design",desc:"Crafting narratives through light, motion, and typography."},{title:"Development",desc:"Building resilient, zero-error systems for the modern web."}].map((s,a)=>e.jsxs("div",{className:"group p-10 border border-[var(--color-border)] bg-[var(--color-text)]/[0.02] backdrop-blur-2xl hover:bg-[var(--color-text)]/[0.05] transition-all duration-700",children:[e.jsxs("span",{className:"font-mono text-[8px] text-[var(--color-accent)] mb-6 block",children:["0",a+1," //"]}),e.jsx("h4",{className:"text-2xl text-[var(--color-text)] font-serif italic mb-4",children:s.title}),e.jsx("p",{className:"text-[var(--color-text-muted)] text-sm leading-relaxed font-light",children:s.desc})]},a))})]})}),e.jsxs("div",{className:"absolute right-12 bottom-12 hidden lg:flex flex-col items-center gap-4",children:[e.jsx("div",{className:"h-40 w-[1px] bg-[var(--color-border)] relative overflow-hidden",children:e.jsx(d.div,{style:{height:"100%",scaleY:o},className:"absolute top-0 left-0 w-full bg-[var(--color-accent)] origin-top"})}),e.jsx("span",{className:"font-mono text-[8px] text-[var(--color-text-muted)] opacity-50 uppercase tracking-widest [writing-mode:vertical-lr]",children:"Chronology"})]})]})};export{R as ShimmerAbout,R as default};
