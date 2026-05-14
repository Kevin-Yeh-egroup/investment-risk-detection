'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { QuestionCard } from './question-card'
import { ProgressBar } from './progress-bar'
import { questions, calculateScores, determineResultType } from '@/lib/questions'

interface QuizSectionProps {
  onComplete: (answers: Record<number, number>) => void
  onBack: () => void
}

export function QuizSection({ onComplete, onBack }: QuizSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})

  const handleAnswer = useCallback((value: number) => {
    const questionId = questions[currentIndex].id
    const nextAnswers = { ...answers, [questionId]: value }
    setAnswers(nextAnswers)
    
    // Keep a brief pause so the selected option still feels acknowledged.
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        onComplete(nextAnswers)
      }
    }, 140)
  }, [answers, currentIndex, onComplete])

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
  const isLastQuestion = currentIndex === questions.length - 1
  const allAnswered = Object.keys(answers).length === questions.length

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
        <ProgressBar current={currentIndex} total={questions.length} />
      </motion.div>

      <div className="flex-1 flex items-center justify-center py-4">
        <QuestionCard
          questionIndex={currentIndex}
          answer={currentAnswer}
          onAnswer={handleAnswer}
        />
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
          disabled={currentIndex === 0}
          className="text-muted-foreground hover:text-foreground disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          上一題
        </Button>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            查看結果
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={handleNext}
            disabled={currentAnswer === undefined}
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
