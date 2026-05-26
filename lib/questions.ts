export type ModuleId =
  | 'financial_security'
  | 'emotional_response'
  | 'investment_understanding'
  | 'life_stability'
  | 'investment_anxiety'

export interface Question {
  id: number
  module: ModuleId
  moduleLabel: string
  text: string
  type: 'scale' | 'choice'
  reversed?: boolean
  options?: { label: string; value: number }[]
}

export const moduleOrder: ModuleId[] = [
  'financial_security',
  'emotional_response',
  'investment_understanding',
  'life_stability',
  'investment_anxiety',
]

export const moduleLabels: Record<ModuleId, string> = {
  financial_security: '財務安全感',
  emotional_response: '市場波動反應',
  investment_understanding: '投資理解程度',
  life_stability: '生活安全結構',
  investment_anxiety: '金錢焦慮與動機',
}

export const moduleFeedback: Record<ModuleId, string> = {
  financial_security:
    '你已經完成生活用錢與投資資金的檢視。接下來會看看：台股或 ETF 下跌時，你通常會怎麼反應。',
  emotional_response:
    '你已經看見自己面對下跌與錯過機會時的反應。接下來會檢視：你是否真的知道自己買的是什麼。',
  investment_understanding:
    '你已經完成投資理解的快篩。接下來會把投資放回生活裡，看房租、房貸、保費或家庭責任會不會影響你的承受力。',
  life_stability:
    '你已經完成生活壓力的檢視。最後會看：你是照自己的節奏投資，還是容易被行情、朋友或社群推著走。',
  investment_anxiety:
    '五個指標都完成了。接下來會整理你的主要風險矛盾或承受落差，而不是只給一個保守或積極的標籤。',
}

export const questions: Question[] = [
  // 指標一｜財務安全感
  {
    id: 1,
    module: 'financial_security',
    moduleLabel: moduleLabels.financial_security,
    text: '如果接下來 3 個月收入變少，\n我還是能繳房租或房貸，並維持基本生活。',
    type: 'scale',
  },
  {
    id: 2,
    module: 'financial_security',
    moduleLabel: moduleLabels.financial_security,
    text: '目前的緊急預備金，\n大約可以支撐多久的基本生活？',
    type: 'choice',
    options: [
      { label: '不到 1 個月', value: 1 },
      { label: '約 1-2 個月', value: 2 },
      { label: '約 3-5 個月', value: 3 },
      { label: '約 6-12 個月', value: 4 },
      { label: '超過 12 個月', value: 5 },
    ],
  },
  {
    id: 3,
    module: 'financial_security',
    moduleLabel: moduleLabels.financial_security,
    text: '我拿去買股票、ETF 或基金的錢，\n不是明年就要拿來繳房租、房貸、保費或學費的錢。',
    type: 'scale',
  },
  {
    id: 4,
    module: 'financial_security',
    moduleLabel: moduleLabels.financial_security,
    text: '如果你的投資帳面虧損 20%，\n最接近你現況的描述是：',
    type: 'choice',
    options: [
      { label: '會影響生活費或繳款', value: 1 },
      { label: '生活還能過，但會很緊張', value: 2 },
      { label: '會心痛，但不會影響基本生活', value: 3 },
      { label: '不影響生活，只需要重新檢查計畫', value: 4 },
      { label: '這是我原本就預留可承受的風險', value: 5 },
    ],
  },
  {
    id: 5,
    module: 'financial_security',
    moduleLabel: moduleLabels.financial_security,
    text: '即使台股連跌一陣子，\n我也不會因為房貸、房租、卡費或孝親費，\n被迫賣掉投資。',
    type: 'scale',
  },

  // 指標二｜市場波動反應
  {
    id: 6,
    module: 'emotional_response',
    moduleLabel: moduleLabels.emotional_response,
    text: '你在台股很熱的時候投入 50 萬買股票或 ETF。\n一週後帳面虧損 8 萬，\nLINE 群組有人說只是洗盤，也有人說要停損。\n\n你最可能：',
    type: 'choice',
    options: [
      { label: '先賣掉，至少不要再賠', value: 1 },
      { label: '一直看新聞和群組，想找理由安心', value: 2 },
      { label: '回頭看買進理由，再決定是否調整', value: 4 },
      { label: '覺得是正常波動，照原計畫執行', value: 5 },
    ],
  },
  {
    id: 7,
    module: 'emotional_response',
    moduleLabel: moduleLabels.emotional_response,
    text: '如果今天帳戶又變少，\n我晚上仍大致睡得著，白天也能正常工作或生活。',
    type: 'scale',
  },
  {
    id: 8,
    module: 'emotional_response',
    moduleLabel: moduleLabels.emotional_response,
    text: '朋友說他最近靠 AI 股、ETF 或當沖賺很多，\n而你還沒有進場。\n\n你比較可能：',
    type: 'choice',
    options: [
      { label: '很焦慮，怕自己錯過這波行情', value: 1 },
      { label: '立刻找標的，至少不要落後太多', value: 2 },
      { label: '先研究原因，再決定是否適合自己', value: 4 },
      { label: '能接受每個人的節奏不同', value: 5 },
    ],
  },
  {
    id: 9,
    module: 'emotional_response',
    moduleLabel: moduleLabels.emotional_response,
    text: '我不太會因為 YouTube、Threads、LINE 群組或新聞標題，\n突然改變原本的投資決定。',
    type: 'scale',
  },
  {
    id: 10,
    module: 'emotional_response',
    moduleLabel: moduleLabels.emotional_response,
    text: '你原本帳面獲利 30%，\n最近漲幅縮小到只剩 10%。\n\n你最可能：',
    type: 'choice',
    options: [
      { label: '非常懊惱，想立刻賣出保住剩下獲利', value: 1 },
      { label: '一直想早知道該賣，心情被影響', value: 2 },
      { label: '重新檢查是否仍符合原本判斷', value: 4 },
      { label: '接受獲利回吐是市場常態', value: 5 },
    ],
  },

  // 指標三｜投資理解程度
  {
    id: 11,
    module: 'investment_understanding',
    moduleLabel: moduleLabels.investment_understanding,
    text: '我買進一檔股票、ETF 或基金前，\n大致知道它為什麼可能賺錢，也知道它可能因為什麼虧損。',
    type: 'scale',
  },
  {
    id: 12,
    module: 'investment_understanding',
    moduleLabel: moduleLabels.investment_understanding,
    text: '看到有人說「這檔最近很會漲」時，\n我會先想到：漲得快，也可能跌得快。',
    type: 'scale',
  },
  {
    id: 13,
    module: 'investment_understanding',
    moduleLabel: moduleLabels.investment_understanding,
    text: '有人推薦一檔熱門股票或 ETF，\n你只知道「很多人都在買」，還不清楚它實際投資什麼。\n\n你比較可能：',
    type: 'choice',
    options: [
      { label: '先買一點，不然怕錯過', value: 1 },
      { label: '看幾篇文章或影片就決定', value: 2 },
      { label: '先確認它買什麼、風險是什麼、適不適合我', value: 4 },
      { label: '不理解就不買，寧可錯過', value: 5 },
    ],
  },
  {
    id: 14,
    module: 'investment_understanding',
    moduleLabel: moduleLabels.investment_understanding,
    text: '買進前，我通常知道這筆投資是想放幾天、幾個月，\n還是準備放好幾年。',
    type: 'scale',
  },
  {
    id: 15,
    module: 'investment_understanding',
    moduleLabel: moduleLabels.investment_understanding,
    text: '投資下跌時，\n我會先想清楚：是整個市場都在跌，\n還是我買的東西本身出了問題。',
    type: 'scale',
  },

  // 指標四｜生活安全結構
  {
    id: 16,
    module: 'life_stability',
    moduleLabel: moduleLabels.life_stability,
    text: '未來 1 到 3 年，\n我沒有很明確、很難延後的大筆支出，\n例如買房、結婚、生小孩、醫療或學費。',
    type: 'scale',
  },
  {
    id: 17,
    module: 'life_stability',
    moduleLabel: moduleLabels.life_stability,
    text: '如果突然失業、生病或家裡有狀況，\n我身邊還有人、存款或資源可以先撐一段時間。',
    type: 'scale',
  },
  {
    id: 18,
    module: 'life_stability',
    moduleLabel: moduleLabels.life_stability,
    text: '現在的家庭責任，\n例如房貸、孝親、照顧家人或小孩費用，\n讓我很難承受資產大幅下跌。',
    type: 'scale',
    reversed: true,
  },
  {
    id: 19,
    module: 'life_stability',
    moduleLabel: moduleLabels.life_stability,
    text: '如果台股或基金表現不好長達一年，\n我仍有空間不急著賣出原本打算長期放的投資。',
    type: 'scale',
  },
  {
    id: 20,
    module: 'life_stability',
    moduleLabel: moduleLabels.life_stability,
    text: '我現在不是非靠投資賺一筆，\n才有辦法解決生活壓力。',
    type: 'scale',
  },

  // 指標五｜金錢焦慮與投資動機
  {
    id: 21,
    module: 'investment_anxiety',
    moduleLabel: moduleLabels.investment_anxiety,
    text: '看到別人搭上行情賺錢，\n我沒有跟到也不會覺得自己很失敗。',
    type: 'scale',
  },
  {
    id: 22,
    module: 'investment_anxiety',
    moduleLabel: moduleLabels.investment_anxiety,
    text: '朋友、同事或社群貼出獲利截圖時，\n我仍能回到自己的目標與節奏。',
    type: 'scale',
  },
  {
    id: 23,
    module: 'investment_anxiety',
    moduleLabel: moduleLabels.investment_anxiety,
    text: '台股創高、新聞一直報、身邊很多人說「再不上車就來不及」。\n\n你通常會：',
    type: 'choice',
    options: [
      { label: '立刻進場，先卡位再說', value: 1 },
      { label: '邊焦慮邊找資料，很難停下來', value: 2 },
      { label: '暫停一下，確認這是不是焦慮在推動我', value: 4 },
      { label: '回到原本計畫，不急著追行情', value: 5 },
    ],
  },
  {
    id: 24,
    module: 'investment_anxiety',
    moduleLabel: moduleLabels.investment_anxiety,
    text: '我不會把投資當成翻轉人生、逃離焦慮，\n或證明自己沒有輸給別人的唯一方法。',
    type: 'scale',
  },
  {
    id: 25,
    module: 'investment_anxiety',
    moduleLabel: moduleLabels.investment_anxiety,
    text: '我曾經因為怕錯過、怕落後，\n匆忙買進股票、ETF、基金或加碼，\n後來覺得自己太衝動。',
    type: 'scale',
    reversed: true,
  },
]

export const scaleOptions = [
  { label: '完全不是我', value: 1 },
  { label: '不太符合我', value: 2 },
  { label: '有一點符合', value: 3 },
  { label: '蠻符合我', value: 4 },
  { label: '很符合現在的我', value: 5 },
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

export interface RiskIndexes {
  objectiveCapacity: number
  psychologicalStability: number
  decisionQuality: number
}

export interface RiskContradiction {
  id: string
  title: string
  severity: '高' | '中' | '低'
  summary: string
  whyItMatters: string
  suggestion: string
  signals: string[]
}

const emptyModuleScores = () => ({
  financial_security: { total: 0, count: 0 },
  emotional_response: { total: 0, count: 0 },
  investment_understanding: { total: 0, count: 0 },
  life_stability: { total: 0, count: 0 },
  investment_anxiety: { total: 0, count: 0 },
})

export function calculateScores(answers: Record<number, number>) {
  const modules = emptyModuleScores()

  questions.forEach((q) => {
    const answer = answers[q.id]
    if (answer !== undefined) {
      const score = q.reversed ? 6 - answer : answer
      modules[q.module].total += score
      modules[q.module].count += 1
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
    life_stability: modules.life_stability.count > 0 
      ? Math.round((modules.life_stability.total / (modules.life_stability.count * 5)) * 100) 
      : 0,
    investment_anxiety: modules.investment_anxiety.count > 0 
      ? Math.round((modules.investment_anxiety.total / (modules.investment_anxiety.count * 5)) * 100) 
      : 0,
  }
}

export function determineResultType(scores: ReturnType<typeof calculateScores>): ResultType {
  const { financial_security, emotional_response, investment_understanding, life_stability, investment_anxiety } = scores
  
  // 計算總體穩定度
  const overallStability = (financial_security + emotional_response + investment_understanding + life_stability + investment_anxiety) / 5
  
  // 根據各維度分數判斷類型
  if (overallStability >= 70) {
    return resultTypes.find(r => r.id === 'stable')!
  }
  
  if (investment_anxiety < 50 && emotional_response < 50) {
    return resultTypes.find(r => r.id === 'fomo')!
  }
  
  if (life_stability < 50 && financial_security < 50) {
    return resultTypes.find(r => r.id === 'stressed')!
  }
  
  return resultTypes.find(r => r.id === 'emotional')!
}

export function calculateRiskIndexes(scores: ReturnType<typeof calculateScores>): RiskIndexes {
  return {
    objectiveCapacity: Math.round((scores.financial_security + scores.life_stability) / 2),
    psychologicalStability: Math.round((scores.emotional_response + scores.investment_anxiety) / 2),
    decisionQuality: scores.investment_understanding,
  }
}

export function analyzeContradictions(scores: ReturnType<typeof calculateScores>): RiskContradiction {
  const indexes = calculateRiskIndexes(scores)

  if (scores.financial_security < 55 && scores.emotional_response >= 60) {
    return {
      id: 'bold_psychology_weak_finance',
      title: '心理敢承受，但財務緩衝偏薄',
      severity: '高',
      summary: '你面對市場波動時不一定會立刻慌，但目前的財務安全空間可能沒有跟上投資膽量。',
      whyItMatters: '這種狀態最容易在股市熱絡時提高部位；一旦生活支出、收入或市場同時出現變化，就可能被迫在不想賣的時候賣出。',
      suggestion: '先設定「不能投入投資的錢」與緊急預備金底線，再決定投資部位。你需要先補強客觀承受力，而不是只靠心理撐住。',
      signals: [
        `財務安全感 ${scores.financial_security}%`,
        `市場波動反應 ${scores.emotional_response}%`,
        `客觀承受力 ${indexes.objectiveCapacity}%`,
      ],
    }
  }

  if (scores.emotional_response < 55 && scores.investment_anxiety < 55) {
    return {
      id: 'anxiety_driven',
      title: '容易被行情與比較感推著走',
      severity: '高',
      summary: '市場下跌、別人獲利或錯過機會，都可能快速影響你的判斷與行動。',
      whyItMatters: '這不代表你不能投資，而是你需要先分辨：現在是策略在帶路，還是焦慮在催促你進場。',
      suggestion: '建議先建立「冷靜期」規則，例如重大投資決定至少隔一天、寫下買進理由與可承受虧損，再執行交易。',
      signals: [
        `市場波動反應 ${scores.emotional_response}%`,
        `金錢焦慮管理 ${scores.investment_anxiety}%`,
        `心理穩定度 ${indexes.psychologicalStability}%`,
      ],
    }
  }

  if (scores.investment_understanding < 55 && indexes.psychologicalStability >= 55) {
    return {
      id: 'confidence_before_understanding',
      title: '心態相對穩，但理解可能還不夠完整',
      severity: '中',
      summary: '你不一定容易恐慌，但投資判斷若缺少商品理解與風險邏輯，穩定心態也可能撐錯方向。',
      whyItMatters: '市場上漲時，冷靜的人也可能因為資訊不足而長期持有不適合自己的標的。',
      suggestion: '在加碼前，先補上三件事：買進理由、可能虧損原因、什麼情況代表判斷錯了。',
      signals: [
        `投資理解程度 ${scores.investment_understanding}%`,
        `心理穩定度 ${indexes.psychologicalStability}%`,
      ],
    }
  }

  if (scores.life_stability < 55 && scores.investment_anxiety < 60) {
    return {
      id: 'life_pressure_investing',
      title: '生活壓力可能正在放大投資壓力',
      severity: '中',
      summary: '目前生活責任、未來支出或支持系統，可能讓你很難長期承受市場低迷。',
      whyItMatters: '很多人真正撐不住的不是股市下跌本身，而是股市下跌剛好遇上生活事件。',
      suggestion: '先把未來一年可能用到的錢與投資資金分開，並保留足夠現金流，讓投資不成為生活壓力的放大器。',
      signals: [
        `生活安全結構 ${scores.life_stability}%`,
        `金錢焦慮管理 ${scores.investment_anxiety}%`,
      ],
    }
  }

  if (
    scores.financial_security >= 65 &&
    scores.emotional_response >= 65 &&
    scores.investment_understanding >= 65 &&
    scores.life_stability >= 65 &&
    scores.investment_anxiety >= 65
  ) {
    return {
      id: 'aligned_rational',
      title: '目前承受狀態相對穩定',
      severity: '低',
      summary: '你的投資心態、財務緩衝與生活責任目前能互相支撐，沒有看到特別明顯的拉扯。',
      whyItMatters: '這代表你比較適合用長期規劃來管理投資，但生活條件、收入或家庭責任改變時，仍要重新確認部位是否合適。',
      suggestion: '可以先訂好投資比例與檢查時間，例如每半年或每年看一次；如果股票、ETF 或現金比例偏離原本安排太多，再調回來。',
      signals: [
        `客觀承受力 ${indexes.objectiveCapacity}%`,
        `心理穩定度 ${indexes.psychologicalStability}%`,
        `決策品質 ${indexes.decisionQuality}%`,
      ],
    }
  }

  return {
    id: 'mixed_awareness',
    title: '目前有些輕度拉扯，可先補強最低分面向',
    severity: '中',
    summary: '你的風險輪廓不是單一型態，幾個面向都有一點拉扯；先看分數最低的地方就好。',
    whyItMatters: '投資風險通常不是只來自一個弱點，而是財務、情緒、理解與生活壓力在特定時刻交疊。',
    suggestion: '先從分數最低的面向開始補強；當最低分提高後，再重新檢視投資部位是否適合目前的承受力。',
    signals: [
      `最低面向 ${Math.min(...Object.values(scores))}%`,
      `客觀承受力 ${indexes.objectiveCapacity}%`,
      `心理穩定度 ${indexes.psychologicalStability}%`,
    ],
  }
}
