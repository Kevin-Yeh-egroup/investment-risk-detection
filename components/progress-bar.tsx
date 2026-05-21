'use client'

import { motion } from 'framer-motion'
import { moduleOrder, moduleLabels, ModuleId } from '@/lib/questions'

interface ProgressBarProps {
  current: number
  total: number
  currentIndicator: string
  indicatorPosition: number
  indicatorTotal: number
}

const shortLabels: Record<ModuleId, string> = {
  financial_security: '財務',
  emotional_response: '波動',
  investment_understanding: '理解',
  life_stability: '生活',
  investment_anxiety: '動機',
}

export function ProgressBar({
  current,
  total,
  indicatorPosition,
}: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-[1.75rem] border border-primary/15 bg-white/80 p-5 shadow-sm backdrop-blur">
        {/* Header row */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              投資風險覺察測驗
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              第 {current + 1} 題，共 {total} 題
            </p>
          </div>
          <div className="shrink-0 rounded-2xl bg-primary px-4 py-3 text-right text-primary-foreground shadow-sm shadow-primary/20">
            <span className="block text-2xl font-light leading-none">{Math.round(progress)}%</span>
            <span className="mt-1 block text-xs opacity-80">完成度</span>
          </div>
        </div>

        {/* Segment dots */}
        <div className="mb-4 flex items-start justify-between">
          {moduleOrder.map((module, i) => {
            const idx = i + 1
            const isDone = idx < indicatorPosition
            const isCurrent = idx === indicatorPosition
            return (
              <div key={module} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="relative flex w-full items-center">
                  {/* connector line left */}
                  {i > 0 && (
                    <div
                      className={`h-0.5 flex-1 transition-colors duration-500 ${
                        isDone || isCurrent ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  )}
                  {/* dot */}
                  <motion.div
                    initial={false}
                    animate={
                      isDone
                        ? { scale: 1, backgroundColor: 'var(--primary)' }
                        : isCurrent
                        ? { scale: 1.25 }
                        : { scale: 1 }
                    }
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    className={`h-2.5 w-2.5 shrink-0 rounded-full border-2 transition-colors duration-300 ${
                      isDone
                        ? 'border-primary bg-primary'
                        : isCurrent
                        ? 'border-primary bg-primary/30'
                        : 'border-border bg-background'
                    }`}
                  />
                  {/* connector line right */}
                  {i < moduleOrder.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 transition-colors duration-500 ${
                        isDone ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors duration-300 ${
                    isDone || isCurrent ? 'text-primary' : 'text-muted-foreground/60'
                  }`}
                >
                  {shortLabels[module]}
                </span>
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  )
}
