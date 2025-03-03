// src/components/animations/FluidBackgroundAnimation.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { ReactElement } from 'react';

interface FluidBackgroundAnimationProps {
  primaryColor?: string;
  secondaryColor?: string;
  speed?: number;
}

export default function FluidBackgroundAnimation({
  primaryColor = '#0055B8',
  secondaryColor = '#000000',
  speed = 0.2,
}: FluidBackgroundAnimationProps): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect((): (() => void) => {
    if (!canvasRef.current)
      return (): void => {
        /* Empty cleanup */
      };

    // Performance detection
    const isLowPowerDevice = (): boolean => {
      if (typeof window === 'undefined') return true;
      const userAgent = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
      return isMobile || (window.navigator.hardwareConcurrency || 0) <= 4;
    };

    const lowPower = isLowPowerDevice();

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 1;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: !lowPower,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1); // Black background

    // Create colors from props
    const primary = new THREE.Color(primaryColor);
    const secondary = new THREE.Color(secondaryColor);

    // Create shader material
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_color1: { value: new THREE.Vector3(primary.r, primary.g, primary.b) },
      u_color2: { value: new THREE.Vector3(secondary.r, secondary.g, secondary.b) },
    };

    const vertexShader = `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform vec3 u_color1;
      uniform vec3 u_color2;
      varying vec2 vUv;

      #define PI 3.14159265359

      // Simplex noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,
                            0.366025403784439,
                           -0.577350269189626,
                            0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        // Normalized coordinates
        vec2 st = vUv;

        // Create gradient from top-right to bottom-left
        vec2 pos = vec2(st.x, 1.0 - st.y);

        // Apply noise to create a fluid-like effect
        float noise1 = snoise(pos * 3.0 + u_time * 0.1) * 0.5 + 0.5;
        float noise2 = snoise(pos * 6.0 - u_time * 0.15) * 0.5 + 0.5;

        // Combine noise layers
        float combinedNoise = mix(noise1, noise2, 0.5);

        // Create a gradient based on position and modified by noise
        float gradientFactor = length(pos - vec2(0.7, 0.3));
        gradientFactor = smoothstep(0.2, 1.0, gradientFactor + combinedNoise * 0.3);

        // Mix between the two colors
        vec3 color = mix(u_color1, u_color2, gradientFactor);

        // Add vignette effect
        float vignette = 1.0 - smoothstep(0.5, 1.5, length(st - 0.5) * 1.5);
        color = mix(u_color2, color, vignette);

        // Output final color
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    // Create plane geometry that fills the screen
    const geometry = new THREE.PlaneGeometry(2, 2);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Mouse movement tracking
    let mouseX = 0.5;
    let mouseY = 0.5;

    const handleMouseMove = (event: MouseEvent): void => {
      mouseX = event.clientX / window.innerWidth;
      mouseY = 1 - event.clientY / window.innerHeight;
    };

    // Handle touch for mobile
    const handleTouchMove = (event: TouchEvent): void => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        if (touch) {
          mouseX = touch.clientX / window.innerWidth;
          mouseY = 1 - touch.clientY / window.innerHeight;
        }
      }
    };

    // Handle window resize
    const handleResize = (): void => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
    };

    // Animation loop
    let animationId: number | null = null;

    const animate = (time: number): void => {
      // Update uniforms
      uniforms.u_time.value = time * 0.001 * speed;
      uniforms.u_mouse.value.set(mouseX, mouseY);

      // Render scene
      renderer.render(scene, camera);

      // Continue animation loop
      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animationId = requestAnimationFrame(animate);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return (): void => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      // Dispose resources
      if (geometry) {
        geometry.dispose();
      }

      if (material) {
        material.dispose();
      }

      // Clear scene
      scene.clear();
      renderer.dispose();
    };
  }, [primaryColor, secondaryColor, speed]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" aria-hidden="true" />
  );
}
