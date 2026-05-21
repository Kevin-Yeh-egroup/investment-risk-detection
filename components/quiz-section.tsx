'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { QuestionCard } from './question-card'
import { ProgressBar } from './progress-bar'
import { moduleFeedback, moduleOrder, questions } from '@/lib/questions'

interface QuizSectionProps {
  onComplete: (answers: Record<number, number>) => void
  onBack: () => void
}

export function QuizSection({ onComplete, onBack }: QuizSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [feedback, setFeedback] = useState<string | null>(null)
  const [isAdvancing, setIsAdvancing] = useState(false)

  const handleAnswer = useCallback((value: number) => {
    if (isAdvancing) return

    const currentQuestion = questions[currentIndex]
    const questionId = currentQuestion.id
    const nextAnswers = { ...answers, [questionId]: value }
    const nextIndex = currentIndex + 1
    const nextQuestion = questions[nextIndex]
    const shouldShowFeedback = nextQuestion && nextQuestion.module !== currentQuestion.module

    setAnswers(nextAnswers)
    setIsAdvancing(true)

    if (shouldShowFeedback) {
      setFeedback(moduleFeedback[currentQuestion.module])
    }
    
    // Keep a brief pause so the selected option still feels acknowledged.
    setTimeout(() => {
      setFeedback(null)
      setIsAdvancing(false)

      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex)
      } else {
        onComplete(nextAnswers)
      }
    }, shouldShowFeedback ? 1800 : 140)
  }, [answers, currentIndex, isAdvancing, onComplete])

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }, [currentIndex])

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex])

  const handleSubmit = useCallback(() => {
    onComplete(answers)
  }, [answers, onComplete])

  const currentAnswer = answers[questions[currentIndex].id]
  const currentQuestion = questions[currentIndex]
  const currentModuleIndex = moduleOrder.indexOf(currentQuestion.module)
  const isLastQuestion = currentIndex === questions.length - 1
  const allAnswered = Object.keys(answers).length === questions.length
  const isPausedForFeedback = feedback !== null || isAdvancing

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">返回首頁</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <ProgressBar
          current={currentIndex}
          total={questions.length}
          currentIndicator={currentQuestion.moduleLabel}
          indicatorPosition={currentModuleIndex + 1}
          indicatorTotal={moduleOrder.length}
        />
      </motion.div>

      <div className="flex-1 flex items-center justify-center py-4">
        {feedback ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="w-full max-w-lg rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center shadow-sm"
          >
            {/* Animated checkmark circle */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/25">
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 28, delay: 0.1 }}
              >
                <Check className="h-8 w-8 text-primary-foreground" strokeWidth={2.5} />
              </motion.div>
            </div>
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs text-primary tracking-widest uppercase mb-3 block font-medium"
            >
              已完成一項指標
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-light leading-relaxed text-foreground"
            >
              {feedback}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex items-center justify-center gap-1.5 text-xs text-primary/60"
            >
              <span>接下來</span>
              <ArrowRight className="h-3 w-3" />
            </motion.div>
          </motion.div>
        ) : (
          <QuestionCard
            questionIndex={currentIndex}
            answer={currentAnswer}
            onAnswer={handleAnswer}
          />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex justify-between items-center max-w-lg mx-auto w-full"
      >
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentIndex === 0 || isPausedForFeedback}
          className="text-muted-foreground hover:text-foreground disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          上一題
        </Button>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={!allAnswered || isPausedForFeedback}
            className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            查看結果
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={handleNext}
            disabled={currentAnswer === undefined || isPausedForFeedback}
            className="text-muted-foreground hover:text-foreground disabled:opacity-30"
          >
            下一題
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </motion.div>
    </div>
  )
}
