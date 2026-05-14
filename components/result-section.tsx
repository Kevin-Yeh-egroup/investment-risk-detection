'use client'

import { motion } from 'framer-motion'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { Button } from '@/components/ui/button'
import { calculateScores, determineResultType, ResultType } from '@/lib/questions'
import { Bot, ClipboardList, NotebookPen, RefreshCcw, Sparkles, WalletCards } from 'lucide-react'

interface ResultSectionProps {
  answers: Record<number, number>
  onRestart: () => void
}

const dimensionLabels: Record<string, string> = {
  financial_security: '財務安全感',
  emotional_response: '情緒穩定度',
  investment_understanding: '投資理解',
  life_stress: '壓力承受',
  investment_anxiety: '焦慮管理',
}

const nextActions = [
  {
    title: '進行其他財務檢測',
    description: '從不同面向整理目前的財務狀態。',
    icon: ClipboardList,
  },
  {
    title: '問問AI',
    description: '把剛剛想到的問題，先用簡單方式問清楚。',
    icon: Bot,
  },
  {
    title: '免費線上財務諮詢',
    description: '需要有人一起討論時，可以預約諮詢。',
    icon: WalletCards,
  },
  {
    title: '開始記錄我的財務',
    description: '用記錄看見收入、支出與生活壓力的變化。',
    icon: NotebookPen,
  },
]

const resultIllustrations: Record<string, { src: string; alt: string }> = {
  emotional: {
    src: '/容易被市場情緒影響型.png',
    alt: '容易被市場情緒影響型插圖',
  },
  stressed: {
    src: '/壓力承受型.png',
    alt: '壓力承受型投資者插圖',
  },
  fomo: {
    src: '/跟風焦慮型.png',
    alt: '跟風焦慮型插圖',
  },
  stable: {
    src: '/穩定觀察型.png',
    alt: '穩定觀察型插圖',
  },
}

export function ResultSection({ answers, onRestart }: ResultSectionProps) {
  const scores = calculateScores(answers)
  const resultType = determineResultType(scores)
  const resultIllustration = resultIllustrations[resultType.id]

  const radarData = [
    { dimension: '財務安全感', value: scores.financial_security, fullMark: 100 },
    { dimension: '情緒穩定度', value: scores.emotional_response, fullMark: 100 },
    { dimension: '投資理解', value: scores.investment_understanding, fullMark: 100 },
    { dimension: '壓力承受', value: scores.life_stress, fullMark: 100 },
    { dimension: '焦慮管理', value: scores.investment_anxiety, fullMark: 100 },
  ]

  const overallScore = Math.round(
    (scores.financial_security + 
     scores.emotional_response + 
     scores.investment_understanding + 
     scores.life_stress + 
     scores.investment_anxiety) / 5
  )

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs text-primary tracking-widest uppercase mb-4 block">
            檢測結果
          </span>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            你現在承受的，
            <br />
            <span className="text-primary">可能不只是投資壓力。</span>
          </h1>
        </motion.div>

        {/* Result Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-card border border-border rounded-2xl p-8 md:p-10 mb-8"
        >
          <div className="text-center mb-8">
            {resultIllustration && (
              <div className="mx-auto mb-8 max-w-[360px] overflow-hidden rounded-[2rem] bg-secondary shadow-lg shadow-primary/10">
                <img
                  src={resultIllustration.src}
                  alt={resultIllustration.alt}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
            <span className="text-xs text-primary tracking-widest uppercase mb-3 block">
              你的投資狀態類型
            </span>
            <h2 className="text-2xl md:text-3xl font-light">{resultType.title}</h2>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8 text-center">
            {resultType.description}
          </p>

          <div className="space-y-4 mb-8">
            <h3 className="text-sm text-muted-foreground uppercase tracking-wider">主要特徵</h3>
            <ul className="space-y-3">
              {resultType.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                  <span className="text-foreground/90">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border pt-8">
            <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-4">建議</h3>
            <p className="text-foreground/90 leading-relaxed">{resultType.suggestion}</p>
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-lg font-medium mb-6 text-center">五維風險覺察分析</h2>
          <div className="h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis 
                  dataKey="dimension" 
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                  tickCount={5}
                />
                <Radar
                  name="你的分數"
                  dataKey="value"
                  stroke="var(--primary)"
                  fill="var(--primary)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">
            <span className="text-muted-foreground text-sm">整體穩定度</span>
            <p className="text-3xl font-light text-primary mt-1">{overallScore}%</p>
          </div>
        </motion.div>

        {/* Dimension Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-card border border-border rounded-2xl p-8 md:p-10 mb-8"
        >
          <h2 className="text-lg font-medium mb-6">各面向分數詳情</h2>
          <div className="space-y-6">
            {Object.entries(scores).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-foreground/80">
                    {dimensionLabels[key]}
                  </span>
                  <span className="text-sm font-medium text-primary">{value}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="rounded-[2rem] bg-card border border-border p-6 md:p-8 mb-8"
        >
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs text-primary tracking-widest uppercase mb-3">
              <Sparkles className="h-4 w-4" />
              下一步
            </span>
            <h2 className="text-2xl md:text-3xl font-light">
              了解風險後，你還可以
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {nextActions.map(({ title, description, icon: Icon }) => (
              <button
                key={title}
                type="button"
                className="group rounded-2xl bg-secondary/70 border border-transparent p-5 text-left transition-all hover:border-primary/40 hover:bg-secondary"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="block font-medium text-foreground mb-2">{title}</span>
                <span className="block text-sm leading-relaxed text-muted-foreground">
                  {description}
                </span>
              </button>
            ))}
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center pb-8"
        >
          <Button
            onClick={onRestart}
            variant="outline"
            className="border-border hover:bg-secondary"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            重新檢測
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
