'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  onStart: () => void
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-muted-foreground text-sm tracking-widest uppercase">
            投資風險覺察
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-3xl md:text-5xl font-light leading-tight mb-8 text-balance"
        >
          你現在的投資，
          <br />
          <span className="text-primary">真的承受得起嗎？</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-4 mb-12 text-muted-foreground text-lg leading-relaxed"
        >
          <p>很多人以為自己承受得起風險。</p>
          <p>但真正影響投資的，往往不是市場。</p>
          <p className="pt-4">而是：</p>
          <ul className="space-y-2 text-foreground/80">
            <li>對未來的不安</li>
            <li>害怕錯過</li>
            <li>生活壓力</li>
            <li>現實中的責任與支出</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-muted-foreground mb-2">這份檢測，想幫你看見：</p>
          <p className="text-xl md:text-2xl font-light">
            現在的你，
            <br />
            <span className="text-primary">真的承受得起這樣的投資波動嗎？</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="group px-8 py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
          >
            開始 15 題檢測
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          約需 3-5 分鐘完成
        </motion.p>
      </motion.div>
    </div>
  )
}
