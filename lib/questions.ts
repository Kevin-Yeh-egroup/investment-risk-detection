export interface Question {
  id: number
  module: string
  moduleLabel: string
  text: string
  type: 'scale' | 'choice'
  reversed?: boolean
  options?: { label: string; value: number }[]
}

export const questions: Question[] = [
  // 模組一｜財務安全感
  {
    id: 1,
    module: 'financial_security',
    moduleLabel: '財務安全感',
    text: '如果突然有一兩個月收入變少，\n我還能維持基本生活。',
    type: 'scale',
  },
  {
    id: 2,
    module: 'financial_security',
    moduleLabel: '財務安全感',
    text: '我現在有一些存款，\n遇到突發狀況時不至於太慌張。',
    type: 'scale',
  },
  {
    id: 3,
    module: 'financial_security',
    moduleLabel: '財務安全感',
    text: '就算投資賠錢，\n也不會直接影響現在的生活。',
    type: 'scale',
  },

  // 模組二｜投資情緒反應
  {
    id: 4,
    module: 'emotional_response',
    moduleLabel: '投資情緒反應',
    text: '如果你投資的股票，\n短時間跌了不少。\n\n你比較像：',
    type: 'choice',
    options: [
      { label: '很慌，會想趕快賣掉', value: 1 },
      { label: '會一直查資訊、看新聞', value: 2 },
      { label: '雖然會擔心，但還能冷靜', value: 4 },
      { label: '覺得市場本來就會有波動', value: 5 },
    ],
  },
  {
    id: 5,
    module: 'emotional_response',
    moduleLabel: '投資情緒反應',
    text: '當市場下跌時，\n我容易影響心情或睡眠。',
    type: 'scale',
    reversed: true,
  },
  {
    id: 6,
    module: 'emotional_response',
    moduleLabel: '投資情緒反應',
    text: '我不太會因為新聞或別人的說法，\n突然改變投資決定。',
    type: 'scale',
  },

  // 模組三｜投資理解程度
  {
    id: 7,
    module: 'investment_understanding',
    moduleLabel: '投資理解程度',
    text: '我大概知道自己投資的是什麼。',
    type: 'scale',
  },
  {
    id: 8,
    module: 'investment_understanding',
    moduleLabel: '投資理解程度',
    text: '我知道「賺比較快」\n通常也代表風險比較高。',
    type: 'scale',
  },
  {
    id: 9,
    module: 'investment_understanding',
    moduleLabel: '投資理解程度',
    text: '我不會只因為看到別人賺錢，\n就急著跟進。',
    type: 'scale',
  },

  // 模組四｜生活壓力狀態
  {
    id: 10,
    module: 'life_stress',
    moduleLabel: '生活壓力狀態',
    text: '現在的生活壓力，\n有時會讓我對未來感到不安。',
    type: 'scale',
    reversed: true,
  },
  {
    id: 11,
    module: 'life_stress',
    moduleLabel: '生活壓力狀態',
    text: '我的收入目前對家庭或生活很重要，\n不能有太大波動。',
    type: 'scale',
    reversed: true,
  },
  {
    id: 12,
    module: 'life_stress',
    moduleLabel: '生活壓力狀態',
    text: '就算突然發生一些意外或變化，\n我身邊還是有人或資源可以支持我。',
    type: 'scale',
  },

  // 模組五｜投資背後的焦慮
  {
    id: 13,
    module: 'investment_anxiety',
    moduleLabel: '投資背後的焦慮',
    text: '看到別人投資賺錢時，\n我有時會擔心自己錯過機會。',
    type: 'scale',
    reversed: true,
  },
  {
    id: 14,
    module: 'investment_anxiety',
    moduleLabel: '投資背後的焦慮',
    text: '我會希望透過投資，\n讓生活變得輕鬆一點。',
    type: 'scale',
  },
  {
    id: 15,
    module: 'investment_anxiety',
    moduleLabel: '投資背後的焦慮',
    text: '有時候我會覺得：\n現在不投資，好像會落後別人。',
    type: 'scale',
    reversed: true,
  },
]

export const scaleOptions = [
  { label: '非常不像我', value: 1 },
  { label: '不太像我', value: 2 },
  { label: '普通', value: 3 },
  { label: '有點像我', value: 4 },
  { label: '非常像我', value: 5 },
]

export interface ResultType {
  id: string
  title: string
  description: string
  features: string[]
  suggestion: string
}

export const resultTypes: ResultType[] = [
  {
    id: 'emotional',
    title: '容易被市場情緒影響型',
    description: '你不是不能投資。但市場波動，比較容易影響你的情緒、壓力與判斷。有時也可能因為害怕錯過，讓自己更緊張。',
    features: [
      '市場下跌時容易焦慮',
      '會頻繁查看投資資訊',
      '情緒容易跟著市場起伏',
    ],
    suggestion: '建議先建立穩定的情緒調節機制，可以考慮從較低風險的投資開始，逐步建立對市場波動的適應力。',
  },
  {
    id: 'stressed',
    title: '壓力承受型投資者',
    description: '現在的你，生活裡可能已經有不少壓力。因此，投資不只是投資，也可能是想讓未來更安心。但當生活與投資壓力同時出現時，會比較辛苦。',
    features: [
      '生活已有一定壓力負擔',
      '希望透過投資改善現況',
      '承受風險的空間較有限',
    ],
    suggestion: '建議先確保生活基本開銷有足夠緩衝，再考慮投資。急用錢時的投資決定往往不是最好的決定。',
  },
  {
    id: 'fomo',
    title: '跟風焦慮型',
    description: '你不一定是真的想投資。更多時候可能是害怕落後、擔心錯過、被市場氣氛影響。因此比較容易衝動進場、一直看資訊、情緒跟著市場波動。',
    features: [
      '容易受到他人影響',
      '擔心錯過投資機會',
      '決策較容易衝動',
    ],
    suggestion: '建議先靜下心來思考自己真正的投資目標是什麼，不要因為別人賺錢就急著進場。投資是長期的事。',
  },
  {
    id: 'stable',
    title: '穩定觀察型',
    description: '你比較能理解市場本來就有波動、投資不會一直上漲、自己真正能承受多少。因此，比較不容易被短期情緒影響。',
    features: [
      '對市場波動有較好的理解',
      '能保持相對冷靜的心態',
      '決策較為理性客觀',
    ],
    suggestion: '你已經具備較好的投資心態基礎，可以根據自己的財務狀況，規劃適合的投資配置。',
  },
]

export function calculateScores(answers: Record<number, number>) {
  const modules = {
    financial_security: { total: 0, count: 0 },
    emotional_response: { total: 0, count: 0 },
    investment_understanding: { total: 0, count: 0 },
    life_stress: { total: 0, count: 0 },
    investment_anxiety: { total: 0, count: 0 },
  }

  questions.forEach((q) => {
    const answer = answers[q.id]
    if (answer !== undefined) {
      const score = q.reversed ? 6 - answer : answer
      modules[q.module as keyof typeof modules].total += score
      modules[q.module as keyof typeof modules].count += 1
    }
  })

  return {
    financial_security: modules.financial_security.count > 0 
      ? Math.round((modules.financial_security.total / (modules.financial_security.count * 5)) * 100) 
      : 0,
    emotional_response: modules.emotional_response.count > 0 
      ? Math.round((modules.emotional_response.total / (modules.emotional_response.count * 5)) * 100) 
      : 0,
    investment_understanding: modules.investment_understanding.count > 0 
      ? Math.round((modules.investment_understanding.total / (modules.investment_understanding.count * 5)) * 100) 
      : 0,
    life_stress: modules.life_stress.count > 0 
      ? Math.round((modules.life_stress.total / (modules.life_stress.count * 5)) * 100) 
      : 0,
    investment_anxiety: modules.investment_anxiety.count > 0 
      ? Math.round((modules.investment_anxiety.total / (modules.investment_anxiety.count * 5)) * 100) 
      : 0,
  }
}

export function determineResultType(scores: ReturnType<typeof calculateScores>): ResultType {
  const { financial_security, emotional_response, investment_understanding, life_stress, investment_anxiety } = scores
  
  // 計算總體穩定度
  const overallStability = (financial_security + emotional_response + investment_understanding + life_stress + investment_anxiety) / 5
  
  // 根據各維度分數判斷類型
  if (overallStability >= 70) {
    return resultTypes.find(r => r.id === 'stable')!
  }
  
  if (investment_anxiety < 50 && emotional_response < 50) {
    return resultTypes.find(r => r.id === 'fomo')!
  }
  
  if (life_stress < 50 && financial_security < 50) {
    return resultTypes.find(r => r.id === 'stressed')!
  }
  
  return resultTypes.find(r => r.id === 'emotional')!
}
