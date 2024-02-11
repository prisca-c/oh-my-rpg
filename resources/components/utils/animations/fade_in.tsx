import React from 'react'
import { motion } from 'framer-motion'

type FadeInProps = {
  children: React.ReactNode
  className?: string
  duration?: number
  delay?: number
  scale?: {
    start: number
    end: number
  }
  opacity?: {
    start: number
    end: number
  }
  slide?: {
    x?: {
      start: number
      end: number
    }
    y?: {
      start: number
      end: number
    }
  }
}

export const FadeIn = ({
  children,
  className = '',
  duration = 1,
  delay = 0,
  scale = { start: 1, end: 1 },
  opacity = { start: 0, end: 1 },
  slide,
}: FadeInProps) => {
  const x = slide?.x ? slide.x : { start: 0, end: 0 }
  const y = slide?.y ? slide.y : { start: 0, end: 0 }

  return (
    <motion.div
      initial={{ opacity: opacity.start, scale: scale.start, x: x.start, y: y.start }}
      animate={{ opacity: opacity.end, scale: scale.end, x: x.end, y: y.end }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
