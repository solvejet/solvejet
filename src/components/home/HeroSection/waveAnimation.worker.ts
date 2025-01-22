// src/components/home/HeroSection/waveAnimation.worker.ts
let count = 0

self.onmessage = (e) => {
  const { positions, scales, config } = e.data
  count += 0.1

  let i = 0
  for (let ix = 0; ix < config.amountX; ix++) {
    for (let iy = 0; iy < config.amountY; iy++) {
      positions[i * 3 + 1] =
        Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50

      scales[i] =
        (Math.sin((ix + count) * 0.3) + 1) * 8 +
        (Math.sin((iy + count) * 0.5) + 1) * 8

      i++
    }
  }

  self.postMessage({ positions, scales })
}

export {}
