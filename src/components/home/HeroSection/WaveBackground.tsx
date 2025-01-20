// src/components/home/HeroSection/WaveBackground.tsx
'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from 'next-themes'

export default function WaveBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof window === 'undefined') return

    // Cleanup function to handle component unmount
    const cleanup = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (particlesRef.current && sceneRef.current) {
        const geometry = particlesRef.current.geometry
        const material = particlesRef.current.material
        sceneRef.current.remove(particlesRef.current)
        geometry.dispose()

        // Handle material disposal with proper type checking
        if (Array.isArray(material)) {
          material.forEach((m) => m.dispose())
        } else {
          material.dispose()
        }
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }

    try {
      // Scene setup
      const scene = new THREE.Scene()
      sceneRef.current = scene

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
      )
      camera.position.z = 1000
      cameraRef.current = camera

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: container.querySelector('canvas') || undefined,
      })
      renderer.setSize(window.innerWidth, container.clientHeight) // Use container height instead of window height
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)
      rendererRef.current = renderer

      // Particles setup
      const SEPARATION = 100
      const AMOUNTX = 50
      const AMOUNTY = 50

      const numParticles = AMOUNTX * AMOUNTY
      const positions = new Float32Array(numParticles * 3)
      const scales = new Float32Array(numParticles)

      let i = 0
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          positions[i * 3] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
          positions[i * 3 + 1] = 0
          positions[i * 3 + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2
          scales[i] = 1
          i++
        }
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: {
            value: new THREE.Color(
              resolvedTheme === 'dark' ? '#186ebc' : '#0066cc'
            ),
          },
        },
        vertexShader: `
          attribute float scale;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = scale * 10.0 * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          void main() {
            float r = distance(gl_PointCoord, vec2(0.5, 0.5));
            if (r > 0.5) discard;
            gl_FragColor = vec4(color, 1.0 - (r * 2.0));
          }
        `,
        transparent: true,
      })

      const particles = new THREE.Points(geometry, material)
      scene.add(particles)
      particlesRef.current = particles

      // Animation
      let count = 0

      const animate = () => {
        count += 0.1

        const positions = particles.geometry.attributes.position.array
        const scales = particles.geometry.attributes.scale.array

        let i = 0
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            positions[i * 3 + 1] =
              Math.sin((ix + count) * 0.3) * 50 +
              Math.sin((iy + count) * 0.5) * 50

            scales[i] =
              (Math.sin((ix + count) * 0.3) + 1) * 8 +
              (Math.sin((iy + count) * 0.5) + 1) * 8

            i++
          }
        }

        particles.geometry.attributes.position.needsUpdate = true
        particles.geometry.attributes.scale.needsUpdate = true

        renderer.render(scene, camera)
        animationFrameRef.current = requestAnimationFrame(animate)
      }

      animate()

      // Resize handler
      const handleResize = () => {
        camera.aspect = window.innerWidth / container.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, container.clientHeight)
      }

      window.addEventListener('resize', handleResize)

      // Cleanup on unmount
      return () => {
        window.removeEventListener('resize', handleResize)
        cleanup()
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
      }
    } catch (error) {
      console.error('Error initializing WaveBackground:', error)
      cleanup()
      return () => {}
    }
  }, [resolvedTheme])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ pointerEvents: 'none', height: '100%' }}
    >
      <canvas />
    </div>
  )
}
