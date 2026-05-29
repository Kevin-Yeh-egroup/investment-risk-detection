'use client'

import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, BarChart3, CheckCircle2, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  onStart: () => void
}

const introPoints = [
  '不用輸入投資金額或個人資料',
  '不是判斷你適合買什麼商品',
  '用白話情境看見真正承受力',
]

const concernPrompts = [
  '大家都在賺，我是不是太晚了？',
  '如果跌下來，我會不會睡不著？',
  '房貸、保費、孝親還在，投資會不會壓到生活？',
]

const steps = [
  {
    title: '看到貼近日常的情境',
    description: '例如：台股下跌時會不會焦慮、房貸或保費會不會影響投資、是否容易因為朋友獲利而跟進。',
  },
  {
    title: '選出最接近你的答案',
    description: '不需要懂專業術語，也不用準備投資明細。只要依照你現在最可能的反應回答。',
  },
  {
    title: '整理你的投資風險輪廓',
    description: '結果會呈現主要風險矛盾或承受落差、三個承受指數與五個面向，幫你看見哪裡撐得住、哪裡有拉扯。',
  },
]

const resultCards = [
  {
    icon: BarChart3,
    title: '風險矛盾分析',
    description: '先看心理敢不敢、財務能不能、生活撐不撐得住，哪裡彼此打架。',
  },
  {
    icon: HeartHandshake,
    title: '三個承受指數',
    description: '用白話整理客觀承受力、心理穩定度與決策品質，讓結果更容易行動。',
  },
  {
    icon: ShieldCheck,
    title: '五維覺察雷達圖',
    description: '幫你看見財務、波動反應、投資理解、生活安全與金錢焦慮的差距。',
  },
]

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <div className="min-h-screen overflow-hidden px-6 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">好理家在</p>
              <p className="text-xs text-muted-foreground">投資風險覺察測驗</p>
            </div>
          </div>
          <span className="rounded-full bg-white/80 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm">
            約 3-5 分鐘｜看見主要提醒
          </span>
        </motion.header>

        <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex flex-wrap gap-3">
              {['投資風險', '生活壓力', '財務安全感'].map((label, index) => (
                <span
                  key={label}
                  className={`rounded-full px-4 py-2 text-sm font-medium shadow-sm ${
                    index === 0
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white text-secondary-foreground'
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">
              用 15 題，看見<span className="text-primary">你是否承受得起投資波動</span>
            </h1>

            <div className="mb-8 max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>不是考你會不會投資，也不是要你填一堆專業資料。</p>
              <p>這個小測驗會用台股、ETF、房貸、保費、社群消息等日常情境，陪你看見自己現在是否承受得住市場波動。</p>
            </div>

            <div className="mb-8 max-w-2xl rounded-3xl border border-primary/15 bg-white/80 p-5 shadow-sm">
              <p className="mb-4 text-sm font-semibold text-primary">
                如果你最近也出現過這些念頭，這份測驗會有幫助：
              </p>
              <div className="grid gap-3">
                {concernPrompts.map((prompt) => (
                  <div key={prompt} className="rounded-2xl bg-background px-4 py-3 text-sm text-foreground/85">
                    {prompt}
                  </div>
                ))}
              </div>
            </div>

            <ul className="mb-9 space-y-3">
              {introPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-foreground/85">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                onClick={onStart}
                size="lg"
                className="group rounded-full bg-primary px-8 py-6 text-lg text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
              >
                開始覺察測驗
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:text-primary"
              >
                先看測驗怎麼進行
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              目前測驗不用登入、不留資料；若未來想保存結果，再由你選擇是否建立帳號。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#ffd8c2]/70 blur-2xl" />
            <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-[#ffd7e5]/70 blur-2xl" />
            <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#ffd9b0] via-[#ffc8b7] to-[#f7a0a8] p-8 text-center shadow-2xl shadow-primary/20 md:p-10">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-white/80 text-4xl shadow-sm">
                🏠
              </div>
              <p className="mb-2 text-sm font-semibold tracking-widest text-white/85">把生活放進投資一起看</p>
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">先確認現在的位置</h2>
              <p className="mx-auto mb-8 max-w-sm leading-relaxed text-white/90">
                投資不是只有報酬率，也包含你能不能安心睡覺、生活是否留有緩衝，以及決策時是否被焦慮推著走。
              </p>
              <div className="mx-auto grid max-w-sm gap-3 text-left">
                {[
                  ['15 題', '白話情境與簡單選項'],
                  ['5 指標', '逐段整理你的風險輪廓'],
                  ['不推商品', '只協助你看懂現況'],
                ].map(([title, description]) => (
                  <div key={title} className="rounded-2xl bg-white/85 px-5 py-4 shadow-sm">
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="how-it-works" className="py-20 md:py-24">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-primary">這個測驗怎麼進行</p>
            <h2 className="text-3xl font-bold md:text-4xl">像有人陪你把投資現況整理一下</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] border border-border bg-white/85 p-6 shadow-sm"
              >
                <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-lg font-bold text-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{step.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="rounded-[2.5rem] bg-white/70 p-6 shadow-sm md:p-10">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold tracking-widest text-primary">你會看到什麼結果</p>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">結果是一份現況整理，不是投資建議</h2>
            <p className="leading-relaxed text-muted-foreground">
              測驗完成後，系統會把你的回答整理成容易理解的風險覺察輪廓，協助你看見壓力、情緒與財務安全感之間的關係。
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {resultCards.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-[1.75rem] bg-background p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">{title}</h3>
                <p className="leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-primary">先確認，再慢慢想接下來的事</p>
          <h2 className="mx-auto mb-6 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
            你不需要立刻改變什麼，只要先把現在看清楚。
          </h2>
          <Button
            onClick={onStart}
            size="lg"
            className="group rounded-full bg-[#d94a8c] px-8 py-6 text-lg text-white shadow-lg shadow-[#d94a8c]/20 hover:bg-[#c93d80]"
          >
            確認我的投資風險承受狀態
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="mt-5 text-sm text-muted-foreground">這是一個自我覺察工具，不構成任何投資或財務建議。</p>
        </section>
      </div>
    </div>
  )
}
