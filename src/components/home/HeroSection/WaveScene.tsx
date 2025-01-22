// src/components/home/HeroSection/WaveScene.tsx
import React, { useEffect, useRef, useCallback, JSX } from 'react'
import { useTheme } from 'next-themes'
import { debounce } from '@/lib/utils'
import type * as THREE from 'three'

// Types
interface SceneConfig {
  separation: number
  amountX: number
  amountY: number
  cameraZ: number
}

interface EngineRefs {
  renderer?: THREE.WebGLRenderer
  scene?: THREE.Scene
  camera?: THREE.PerspectiveCamera
  particles?: THREE.Points
  material?: THREE.ShaderMaterial
  geometry?: THREE.BufferGeometry
  animationFrame?: number
}

interface MousePosition {
  x: number
  y: number
}

interface ThreeModule {
  current: typeof THREE | null
}

// Constants
const MOBILE_BREAKPOINT = 768
const MOBILE_CONFIG: SceneConfig = {
  separation: 80,
  amountX: 40,
  amountY: 40,
  cameraZ: 1500,
}
const DESKTOP_CONFIG: SceneConfig = {
  separation: 100,
  amountX: 50,
  amountY: 50,
  cameraZ: 1000,
}

// Shaders
const VERTEX_SHADER = `
  attribute float scale;
  uniform vec2 mousePos;
  
  void main() {
    vec3 pos = position;
    float distToMouse = length(pos.xz - mousePos * 1000.0);
    float influence = smoothstep(500.0, 0.0, distToMouse) * 2.0;
    pos.y += influence * 50.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = scale * 10.0 * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const FRAGMENT_SHADER = `
  uniform vec3 color;
  
  void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    gl_FragColor = vec4(color, 1.0 - (r * 2.0));
  }
`

export default function WaveScene(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<EngineRefs>({})
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 })
  const threeRef = useRef<ThreeModule>({ current: null })
  const { resolvedTheme } = useTheme()

  // Initialize Three.js asynchronously
  const initThree = useCallback(async () => {
    if (!threeRef.current?.current) {
      const THREE = await import('three')
      threeRef.current = { current: THREE }
    }
    return threeRef.current.current!
  }, [])

  const calculateParticlePositions = useCallback(
    (THREE: typeof import('three'), config: SceneConfig) => {
      const numParticles = config.amountX * config.amountY
      const positions = new Float32Array(numParticles * 3)
      const scales = new Float32Array(numParticles)

      let i = 0
      for (let ix = 0; ix < config.amountX; ix++) {
        for (let iy = 0; iy < config.amountY; iy++) {
          positions[i * 3] =
            ix * config.separation - (config.amountX * config.separation) / 2
          positions[i * 3 + 1] = 0
          positions[i * 3 + 2] =
            iy * config.separation - (config.amountY * config.separation) / 2
          scales[i] = 1
          i++
        }
      }

      return { positions, scales }
    },
    []
  )

  const handleResize = useCallback(() => {
    const debouncedResize = debounce(() => {
      if (
        !containerRef.current ||
        !engineRef.current.camera ||
        !engineRef.current.renderer
      ) {
        return
      }

      const { camera, renderer } = engineRef.current
      const container = containerRef.current
      const width = container.clientWidth
      const height = container.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      camera.position.z =
        width < MOBILE_BREAKPOINT
          ? MOBILE_CONFIG.cameraZ
          : DESKTOP_CONFIG.cameraZ
    }, 150)

    return debouncedResize
  }, [])

  const animate = useCallback(() => {
    if (
      !engineRef.current.particles ||
      !engineRef.current.scene ||
      !engineRef.current.camera ||
      !engineRef.current.renderer
    ) {
      return
    }

    const { particles, scene, camera, renderer } = engineRef.current

    if (
      particles.geometry.attributes.position &&
      particles.geometry.attributes.scale
    ) {
      const positions = particles.geometry.attributes.position
        .array as Float32Array
      const scales = particles.geometry.attributes.scale.array as Float32Array
      let i = 0
      const time = Date.now() * 0.001

      for (let ix = 0; ix < DESKTOP_CONFIG.amountX; ix++) {
        for (let iy = 0; iy < DESKTOP_CONFIG.amountY; iy++) {
          positions[i * 3 + 1] =
            Math.sin((ix + time) * 0.3) * 50 + Math.sin((iy + time) * 0.5) * 50
          scales[i] =
            (Math.sin((ix + time) * 0.3) + 1) * 8 +
            (Math.sin((iy + time) * 0.5) + 1) * 8
          i++
        }
      }

      particles.geometry.attributes.position.needsUpdate = true
      particles.geometry.attributes.scale.needsUpdate = true
    }

    camera.position.x += (mouseRef.current.x * 100 - camera.position.x) * 0.05
    camera.position.y += (-mouseRef.current.y * 100 - camera.position.y) * 0.05
    camera.lookAt(scene.position)

    renderer.render(scene, camera)
    engineRef.current.animationFrame = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    let mounted = true
    let cleanupFn: (() => void) | undefined
    const resizeHandler = handleResize()

    const setup = async () => {
      if (!containerRef.current || typeof window === 'undefined') return

      try {
        const THREE = await initThree()
        if (!mounted) return

        const container = containerRef.current
        const config =
          window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_CONFIG : DESKTOP_CONFIG

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
          75,
          container.clientWidth / container.clientHeight,
          1,
          10000
        )
        camera.position.z = config.cameraZ

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        })
        renderer.setSize(container.clientWidth, container.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(0x000000, 0)
        container.appendChild(renderer.domElement)

        // Particle setup
        const { positions, scales } = calculateParticlePositions(THREE, config)
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(positions, 3)
        )
        geometry.setAttribute(
          'scale',
          new THREE.Float32BufferAttribute(scales, 1)
        )

        // Material setup
        const material = new THREE.ShaderMaterial({
          uniforms: {
            color: {
              value: new THREE.Color(
                resolvedTheme === 'dark' ? '#60a5fa' : '#93c5fd'
              ),
            },
            mousePos: { value: new THREE.Vector2(0, 0) },
          },
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
          transparent: true,
        })

        const particles = new THREE.Points(geometry, material)
        scene.add(particles)

        engineRef.current = {
          renderer,
          scene,
          camera,
          particles,
          material,
          geometry,
        }

        // Event listeners
        const handleMouseMove = (event: MouseEvent) => {
          requestAnimationFrame(() => {
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1

            if (material.uniforms.mousePos) {
              material.uniforms.mousePos.value.set(
                mouseRef.current.x,
                mouseRef.current.y
              )
            }
          })
        }

        window.addEventListener('resize', resizeHandler, { passive: true })
        window.addEventListener('mousemove', handleMouseMove, { passive: true })

        // Start animation
        animate()

        // Setup cleanup function
        cleanupFn = () => {
          window.removeEventListener('resize', resizeHandler)
          window.removeEventListener('mousemove', handleMouseMove)

          if (engineRef.current.renderer) {
            const rendererDomElement = engineRef.current.renderer.domElement
            if (container.contains(rendererDomElement)) {
              container.removeChild(rendererDomElement)
            }
            engineRef.current.renderer.dispose()
          }

          engineRef.current.geometry?.dispose()
          engineRef.current.material?.dispose()

          if (engineRef.current.animationFrame !== undefined) {
            cancelAnimationFrame(engineRef.current.animationFrame)
          }
        }
      } catch (error) {
        console.error('Error initializing Three.js:', error)
      }
    }

    setup()

    return () => {
      mounted = false
      cleanupFn?.()
    }
  }, [
    animate,
    calculateParticlePositions,
    handleResize,
    initThree,
    resolvedTheme,
  ])

  return <div ref={containerRef} className="h-full w-full" />
}
