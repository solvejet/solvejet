// src/components/ui/placeholder-image.tsx
import React from 'react'

interface PlaceholderImageProps {
  width: number
  height: number
  text?: string
  className?: string
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width,
  height,
  text = `${width}×${height}`,
  className,
}) => {
  return (
    <div
      className={`bg-muted flex items-center justify-center ${className}`}
      style={{
        width,
        height,
      }}
    >
      <span className="text-muted-foreground text-sm">{text}</span>
    </div>
  )
}
