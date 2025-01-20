// src/types/three-canvas.d.ts
import * as THREE from 'three'

declare module 'three' {
  export class CanvasRenderer {
    constructor(parameters?: {
      canvas?: HTMLCanvasElement
      alpha?: boolean
      antialias?: boolean
    })

    domElement: HTMLCanvasElement
    readonly size: { width: number; height: number }

    setSize(width: number, height: number): void
    setClearColor(color: THREE.ColorRepresentation, alpha?: number): void
    render(scene: THREE.Scene, camera: THREE.Camera): void
    dispose(): void
    clear(): void
  }

  export class SpriteCanvasMaterial extends THREE.Material {
    constructor(parameters: {
      color?: THREE.ColorRepresentation
      program: (context: CanvasRenderingContext2D) => void
    })

    isSpriteMaterial: boolean
    color: THREE.Color
    program: (context: CanvasRenderingContext2D) => void
    clone(): this
    copy(source: this): this
  }
}
