// src/types/spline.d.ts

import '@splinetool/runtime';

declare module '@splinetool/runtime' {
  interface Application {
    // Add these methods to the type definition
    setRenderQuality?: (quality: number) => void;
    createRenderLoop?: (callback: () => boolean) => void;
  }
}
