'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-muted-foreground">
          第 {current + 1} 題，共 {total} 題
        </span>
        <span className="text-sm text-primary font-medium">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
