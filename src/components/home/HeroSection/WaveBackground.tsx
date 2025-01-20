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
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof window === 'undefined') return

    // Cleanup function
    const cleanup = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (particlesRef.current && sceneRef.current) {
        const geometry = particlesRef.current.geometry
        const material = particlesRef.current.material
        sceneRef.current.remove(particlesRef.current)
        geometry.dispose()

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

      // Camera setup with responsive adjustments
      const getAspectRatio = () =>
        container.clientWidth / container.clientHeight
      const camera = new THREE.PerspectiveCamera(75, getAspectRatio(), 1, 10000)
      camera.position.z = window.innerWidth < 768 ? 1500 : 1000 // Adjust for mobile
      cameraRef.current = camera

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: container.querySelector('canvas') || undefined,
      })
      renderer.setSize(container.clientWidth, container.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)
      rendererRef.current = renderer

      // Responsive particle setup
      const SEPARATION = window.innerWidth < 768 ? 80 : 100
      const AMOUNTX = window.innerWidth < 768 ? 40 : 50
      const AMOUNTY = window.innerWidth < 768 ? 40 : 50

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

      // Updated colors for better visibility
      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: {
            value: new THREE.Color(
              resolvedTheme === 'dark'
                ? '#60a5fa' // Lighter blue for dark mode
                : '#93c5fd' // Very light blue for light mode
            ),
          },
          mousePos: { value: new THREE.Vector2(0, 0) },
        },
        vertexShader: `
          attribute float scale;
          uniform vec2 mousePos;
          
          void main() {
            vec3 pos = position;
            
            // Add mouse influence
            float distToMouse = length(pos.xz - mousePos * 1000.0);
            float influence = smoothstep(500.0, 0.0, distToMouse) * 2.0;
            pos.y += influence * 50.0;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
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

      // Mouse movement handler
      const handleMouseMove = (event: MouseEvent) => {
        // Convert mouse coordinates to normalized device coordinates (-1 to +1)
        mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
        mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1

        if (particles.material instanceof THREE.ShaderMaterial) {
          particles.material.uniforms.mousePos.value.set(
            mouseRef.current.x,
            mouseRef.current.y
          )
        }
      }

      // Touch movement handler
      const handleTouchMove = (event: TouchEvent) => {
        if (event.touches.length > 0) {
          const touch = event.touches[0]
          mouseRef.current.x = (touch.clientX / window.innerWidth) * 2 - 1
          mouseRef.current.y = -(touch.clientY / window.innerHeight) * 2 + 1

          if (particles.material instanceof THREE.ShaderMaterial) {
            particles.material.uniforms.mousePos.value.set(
              mouseRef.current.x,
              mouseRef.current.y
            )
          }
        }
      }

      // Enhanced animation
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

        // Gentle camera movement based on mouse position
        camera.position.x +=
          (mouseRef.current.x * 100 - camera.position.x) * 0.05
        camera.position.y +=
          (-mouseRef.current.y * 100 - camera.position.y) * 0.05
        camera.lookAt(scene.position)

        renderer.render(scene, camera)
        animationFrameRef.current = requestAnimationFrame(animate)
      }

      animate()

      // Enhanced resize handler for better responsiveness
      const handleResize = () => {
        const width = container.clientWidth
        const height = container.clientHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height)

        // Adjust camera position for different screen sizes
        camera.position.z = width < 768 ? 1500 : 1000
      }

      // Event listeners
      window.addEventListener('resize', handleResize)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleTouchMove, { passive: true })

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('touchmove', handleTouchMove)
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
      className="absolute inset-0 transition-opacity duration-500"
      style={{ pointerEvents: 'none', height: '100%' }}
    >
      <canvas />
    </div>
  )
}
