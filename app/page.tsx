'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HeroSection } from '@/components/hero-section'
import { QuizSection } from '@/components/quiz-section'
import { ResultSection } from '@/components/result-section'

type AppState = 'hero' | 'quiz' | 'result'

export default function Home() {
  const [appState, setAppState] = useState<AppState>('hero')
  const [answers, setAnswers] = useState<Record<number, number>>({})

  const handleStart = () => {
    setAppState('quiz')
  }

  const handleComplete = (newAnswers: Record<number, number>) => {
    setAnswers(newAnswers)
    setAppState('result')
  }

  const handleRestart = () => {
    setAnswers({})
    setAppState('quiz')
  }

  const handleBackToHero = () => {
    setAppState('hero')
  }

  return (
    <main className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {appState === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HeroSection onStart={handleStart} />
          </motion.div>
        )}

        {appState === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <QuizSection onComplete={handleComplete} onBack={handleBackToHero} />
          </motion.div>
        )}

        {appState === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ResultSection answers={answers} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
