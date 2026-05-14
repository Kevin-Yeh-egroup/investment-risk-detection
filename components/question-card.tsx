'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { questions, scaleOptions } from '@/lib/questions'
import { cn } from '@/lib/utils'

interface QuestionCardProps {
  questionIndex: number
  answer: number | undefined
  onAnswer: (value: number) => void
}

export function QuestionCard({ questionIndex, answer, onAnswer }: QuestionCardProps) {
  const question = questions[questionIndex]

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

          {question.type === 'scale' ? (
            <div className="space-y-3">
              {scaleOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onAnswer(option.value)}
                  className={cn(
                    'w-full p-4 rounded-xl text-left transition-all duration-200 border',
                    answer === option.value
                      ? 'bg-primary/20 border-primary text-foreground'
                      : 'bg-secondary/50 border-transparent hover:bg-secondary hover:border-border text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={cn(
                        'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                        answer === option.value
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/40'
                      )}
                    >
                      {answer === option.value && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-primary-foreground rounded-full"
                        />
                      )}
                    </span>
                    <span className="text-base">{option.label}</span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {question.options?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onAnswer(option.value)}
                  className={cn(
                    'w-full p-4 rounded-xl text-left transition-all duration-200 border',
                    answer === option.value
                      ? 'bg-primary/20 border-primary text-foreground'
                      : 'bg-secondary/50 border-transparent hover:bg-secondary hover:border-border text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={cn(
                        'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                        answer === option.value
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/40'
                      )}
                    >
                      {answer === option.value && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-primary-foreground rounded-full"
                        />
                      )}
                    </span>
                    <span className="text-base">{option.label}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
