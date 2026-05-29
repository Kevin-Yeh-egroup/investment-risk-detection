import { expect, test } from '@playwright/test'
import { analyzeContradictions } from '../lib/questions'

const scores = (
  financial_security: number,
  emotional_response: number,
  investment_understanding: number,
  life_stability: number,
  investment_anxiety: number,
) => ({
  financial_security,
  emotional_response,
  investment_understanding,
  life_stability,
  investment_anxiety,
})

test.describe('result scoring boundaries', () => {
  test('treats one 60 score among high scores as a stable observation area', () => {
    const result = analyzeContradictions(scores(80, 93, 87, 93, 60))

    expect(result.id).toBe('stable_with_observation')
    expect(result.title).toBe('整體狀態穩定，但有一個面向值得觀察')
    expect(result.signals).toContain('金錢焦慮與動機 60%')
    expect(result.signals).toContain('目前沒有看到明顯風險矛盾')
  })

  test('treats all 75 scores as stable', () => {
    expect(analyzeContradictions(scores(75, 75, 75, 75, 75)).id).toBe('aligned_rational')
  })

  test('treats all 65 scores as generally stable instead of a contradiction', () => {
    expect(analyzeContradictions(scores(65, 65, 65, 65, 65)).id).toBe('generally_stable')
  })

  test('treats a single 55 score as one attention area', () => {
    expect(analyzeContradictions(scores(90, 90, 90, 90, 55)).id).toBe('single_attention_area')
  })

  test('treats two 56 scores as light tension', () => {
    expect(analyzeContradictions(scores(90, 90, 90, 56, 56)).id).toBe('light_tension')
  })

  test('treats one score below 55 as a clear capacity gap when no specific contradiction matches', () => {
    expect(analyzeContradictions(scores(80, 90, 90, 90, 54)).id).toBe('clear_capacity_gap')
  })

  test('still detects finance capacity weaker than market confidence', () => {
    expect(analyzeContradictions(scores(50, 80, 80, 80, 80)).id).toBe('bold_psychology_weak_finance')
  })

  test('still detects anxiety-driven investing when emotion and anxiety are both low', () => {
    expect(analyzeContradictions(scores(80, 50, 80, 80, 50)).id).toBe('anxiety_driven')
  })
})
