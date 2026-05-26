'use client'

import { motion } from 'framer-motion'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/components/ui/use-mobile'
import {
  analyzeContradictions,
  calculateRiskIndexes,
  calculateScores,
  determineResultType,
  moduleLabels,
  moduleOrder,
} from '@/lib/questions'
import { AlertTriangle, Bot, ClipboardList, NotebookPen, RefreshCcw, Sparkles, WalletCards } from 'lucide-react'

/* ─── Circular gauge ──────────────────────────────────────────────── */
function CircularGauge({ value, size = 88 }: { value: number; size?: number }) {
  const r = (size - 12) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - value / 100)
  const cx = size / 2
  const cy = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="var(--secondary)"
        strokeWidth={10}
      />
      <motion.circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
    </svg>
  )
}
/* ─────────────────────────────────────────────────────────────────── */

interface ResultSectionProps {
  answers: Record<number, number>
  onRestart: () => void
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

const indexCards = [
  {
    key: 'objectiveCapacity',
    title: '客觀承受力',
    description: '財務緩衝與生活安全結構是否足夠。',
  },
  {
    key: 'psychologicalStability',
    title: '心理穩定度',
    description: '市場波動與錯過機會時能否穩住判斷。',
  },
  {
    key: 'decisionQuality',
    title: '決策品質',
    description: '是否理解自己買什麼、為什麼買、何時該調整。',
  },
] as const

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

const radarDimensionLabels: Record<(typeof moduleOrder)[number], string> = {
  financial_security: '財務安全',
  emotional_response: '市場波動',
  investment_understanding: '投資理解',
  life_stability: '生活結構',
  investment_anxiety: '焦慮動機',
}

export function ResultSection({ answers, onRestart }: ResultSectionProps) {
  const isMobile = useIsMobile()
  const scores = calculateScores(answers)
  const indexes = calculateRiskIndexes(scores)
  const contradiction = analyzeContradictions(scores)
  const resultType = determineResultType(scores)
  const resultIllustration = resultIllustrations[resultType.id]
  const hasClearContradiction = !['aligned_rational', 'mixed_awareness'].includes(contradiction.id)
  const resultLabel = hasClearContradiction ? '你的主要風險落差' : '你的主要觀察結果'
  const resultBadge = contradiction.id === 'aligned_rational'
    ? '觀察結果：大致對齊'
    : contradiction.id === 'mixed_awareness'
      ? '觀察結果：輕度拉扯'
      : `提醒程度：${contradiction.severity}`
  const plainExplanation = contradiction.id === 'aligned_rational'
    ? '這次結果顯示風險大致對齊：你想承擔的投資風險，和目前財務、心理、生活條件大致能互相支撐。'
    : contradiction.id === 'mixed_awareness'
      ? '這次沒有單一很突出的落差；比較像是幾個面向都有一點拉扯，可以先從最低分的地方補強。'
      : '這裡的風險落差，指的是你想承擔的投資風險，和財務、心理或生活實際能承受的條件之間有距離。'

  const radarData = moduleOrder.map((module) => ({
    dimension: radarDimensionLabels[module],
    value: scores[module],
    fullMark: 100,
  }))

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
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
            你真正要看的，
            <br />
            <span className="text-primary">是風險有沒有對齊。</span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            不是判斷你保守或積極，而是看你想承擔的投資風險，和財務、心理、生活條件是否對得上。
          </p>
        </motion.div>

        {/* Risk Contradiction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`relative overflow-hidden rounded-2xl border mb-8 ${
            contradiction.severity === '高'
              ? 'border-orange-200 bg-orange-50/60'
              : contradiction.severity === '中'
              ? 'border-primary/25 bg-primary/5'
              : 'border-border bg-card'
          }`}
        >
          {/* Left severity band */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${
              contradiction.severity === '高'
                ? 'bg-orange-400'
                : contradiction.severity === '中'
                ? 'bg-primary/60'
                : 'bg-muted-foreground/40'
            }`}
          />
          <div className="p-8 md:p-10 pl-10 md:pl-12">
          <div className="text-center mb-8">
            <span
              className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${
                contradiction.severity === '高'
                  ? 'bg-orange-100 text-orange-500'
                  : 'bg-primary/10 text-primary'
              }`}
            >
              <AlertTriangle className="h-7 w-7" />
            </span>
            <span className="text-xs text-primary tracking-widest uppercase mb-3 block">
              {resultLabel}
            </span>
            <h2 className="text-2xl md:text-3xl font-light">{contradiction.title}</h2>
            <span
              className={`mt-4 inline-flex rounded-full px-4 py-2 text-xs font-medium ${
                contradiction.severity === '高'
                  ? 'bg-orange-100 text-orange-600'
                  : contradiction.severity === '中'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              {resultBadge}
            </span>
          </div>

          <p className="mx-auto mb-5 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            {plainExplanation}
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8 text-center">
            {contradiction.summary}
          </p>

          <div className="space-y-4 mb-8">
            <h3 className="text-sm text-muted-foreground uppercase tracking-wider">觀察到的訊號</h3>
            <ul className="space-y-3">
              {contradiction.signals.map((signal, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                  <span className="text-foreground/90">{signal}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 border-t border-border/60 pt-8 md:grid-cols-2">
            <div>
              <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-4">為什麼重要</h3>
              <p className="text-foreground/90 leading-relaxed">{contradiction.whyItMatters}</p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-4">現在可以先做</h3>
              <p className="text-foreground/90 leading-relaxed">{contradiction.suggestion}</p>
            </div>
          </div>
          </div>{/* /inner padding wrapper */}
        </motion.div>

        {/* Index Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="grid gap-4 md:grid-cols-3 mb-8"
        >
          {indexCards.map((card) => (
            <div key={card.key} className="rounded-2xl border border-border bg-card p-6 flex flex-col items-center text-center">
              <div className="relative mb-3">
                <CircularGauge value={indexes[card.key]} size={88} />
                <span className="absolute inset-0 flex items-center justify-center text-xl font-light text-primary">
                  {indexes[card.key]}%
                </span>
              </div>
              <p className="font-medium text-foreground mb-1">{card.title}</p>
              <p className="text-xs leading-relaxed text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-lg font-medium mb-6 text-center">五維風險覺察分析</h2>
          <div className="h-[320px] overflow-visible md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? '68%' : '70%'}
                data={radarData}
                margin={isMobile ? { top: 28, right: 24, bottom: 28, left: 24 } : { top: 20, right: 24, bottom: 20, left: 24 }}
              >
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis 
                  dataKey="dimension" 
                  tick={{ fill: 'var(--muted-foreground)', fontSize: isMobile ? 11 : 12 }}
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
          <p className="text-center mt-4 text-sm leading-relaxed text-muted-foreground">
            分數越高代表該面向越穩定；重點不是高低排名，而是看不同面向是否彼此對齊。
          </p>
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
            {moduleOrder.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-foreground/80">
                    {moduleLabels[key]}
                  </span>
                  <span className="text-sm font-medium text-primary">{scores[key]}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${scores[key]}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Supporting Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="bg-card border border-border rounded-2xl p-8 md:p-10 mb-8"
        >
          <div className="text-center mb-8">
            {resultIllustration && (
              <div className="mx-auto mb-8 max-w-[300px] overflow-hidden rounded-[2rem] bg-secondary shadow-lg shadow-primary/10">
                <img
                  src={resultIllustration.src}
                  alt={resultIllustration.alt}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
            <span className="text-xs text-primary tracking-widest uppercase mb-3 block">
              輔助狀態描述
            </span>
            <h2 className="text-2xl md:text-3xl font-light">{resultType.title}</h2>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8 text-center">
            {resultType.description}
          </p>

          <div className="space-y-4 mb-8">
            <h3 className="text-sm text-muted-foreground uppercase tracking-wider">可能特徵</h3>
            <ul className="space-y-3">
              {resultType.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border pt-8">
            <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-4">補充建議</h3>
            <p className="text-foreground/90 leading-relaxed">{resultType.suggestion}</p>
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
