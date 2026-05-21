'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { questions, scaleOptions } from '@/lib/questions'
import { cn } from '@/lib/utils'

interface QuestionCardProps {
  questionIndex: number
  answer: number | undefined
  onAnswer: (value: number) => void
}

function OptionButton({
  label,
  value,
  selected,
  onSelect,
}: {
  label: string
  value: number
  selected: boolean
  onSelect: () => void
}) {
  return (
    <motion.button
      onClick={onSelect}
      animate={selected ? { scale: [1, 0.97, 1.01, 1] } : { scale: 1 }}
      transition={selected ? { duration: 0.22, ease: 'easeOut' } : {}}
      className={cn(
        'w-full p-4 rounded-xl text-left transition-all duration-200 border',
        selected
          ? 'bg-primary/20 border-primary text-foreground'
          : 'bg-secondary/50 border-transparent hover:bg-secondary hover:border-border text-muted-foreground hover:text-foreground'
      )}
    >
      <span className="flex items-center gap-4">
        {/* Radio / Checkmark */}
        <span
          className={cn(
            'relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200',
            selected ? 'border-primary bg-primary' : 'border-muted-foreground/40'
          )}
        >
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.span
                key="check"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                className="flex items-center justify-center"
              >
                <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
              </motion.span>
            ) : (
              <motion.span
                key="dot"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="h-1.5 w-1.5 rounded-full bg-muted-foreground/0"
              />
            )}
          </AnimatePresence>
        </span>
        <span className="text-base">{label}</span>
      </span>
    </motion.button>
  )
}

export function QuestionCard({ questionIndex, answer, onAnswer }: QuestionCardProps) {
  const question = questions[questionIndex]

  const options =
    question.type === 'scale'
      ? scaleOptions
      : (question.options ?? [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-lg mx-auto"
      >
        <div className="mb-4">
          <span className="text-xs text-primary tracking-wider uppercase">
            {question.moduleLabel}
          </span>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
          <p className="text-xl md:text-2xl font-light leading-relaxed whitespace-pre-line text-foreground mb-10">
            {question.text}
          </p>

          <div className="space-y-3">
            {options.map((option) => (
              <OptionButton
                key={option.value}
                label={option.label}
                value={option.value}
                selected={answer === option.value}
                onSelect={() => onAnswer(option.value)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
