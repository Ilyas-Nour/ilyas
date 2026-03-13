# Ilyas Nour — Digital Monolith Portfolio

A high-end, performance-optimized professional portfolio. This project is architected as a "Digital Monolith," leveraging a glass-morphism aesthetic and a custom-synchronized motion engine.

## 🏛️ Architecture Overview

The codebase is structured for high-performance rendering and maintainability:

- **`src/app`**: Next.js App Router core. Manages routing, global metadata, and page templates.
- **`src/components/motion`**: The core motion engine.
  - `SmoothScroll.tsx`: Custom Lenis implementation driven by the GSAP ticker for jitter-free synchronization.
  - `AmazingTypography.tsx`: Masked text reveal system using SplitType.
- **`src/components/sections`**: Modular page segments.
  - `CaseStudyVault.tsx`: Complex stacking-card mechanism with frame-perfect ScrollTrigger pinning.
  - `PrecisionHero.tsx`: Entry section with interactive R3F (React Three Fiber) background.
- **`src/components/canvas`**: WebGL/R3F components for ambient visual depth.

## 🛠️ Technical Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Animation**: [GSAP](https://gsap.com/) + [Framer Motion](https://www.framer.com/motion/)
- **Scroll Engine**: [Lenis](https://lenis.darkroom.engineering/) (Frame-synchronized with GSAP)
- **3D Engine**: [React Three Fiber](https://r3f.docs.pmnd.rs/) (Three.js)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Typography**: Geist Sans & Geist Mono

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm / yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## 📐 Design Patterns

### Motion Synchronization
To prevent jitter between momentum scrolling (Lenis) and parallax/pinning (GSAP), this project uses a singular RAF (Request Animation Frame) loop. Lenis is driven by the GSAP ticker:

```typescript
// Inside SmoothScroll.tsx
function update(time: number) {
    lenis.raf(time * 1000);
}
gsap.ticker.add(update);
```

### Performance Optimization
- **GPU Acceleration**: All motion components utilize `transform-gpu` and `will-change` where appropriate.
- **3D Throttling**: The R3F background uses a reduced vertex count and throttled mouse interpolation to ensure stability on mid-range devices.
- **Lazy Loading**: Sections are organized for optimal hydration in Next.js.
