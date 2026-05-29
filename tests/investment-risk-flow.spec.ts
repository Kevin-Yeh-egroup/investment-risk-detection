import { expect, test } from '@playwright/test'

const serviceLinks = [
  {
    name: '前往好理家在財務健檢',
    href: 'https://www.familyfinhealth.com/dashboard/citizen',
  },
  {
    name: '用問問 AI 釐清問題',
    href: 'https://www.familyfinhealth.com/',
  },
  {
    name: '使用工具箱慢慢整理',
    href: 'https://www.familyfinhealth.com/toolbox/financial-calculator',
  },
  {
    name: '預約線上諮詢',
    href: 'https://www.familyfinhealth.com/online-consultation',
  },
]

test.describe('投資風險覺察測驗', () => {
  test.beforeEach(async ({ context }) => {
    await context.route('https://www.familyfinhealth.com/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html; charset=utf-8',
        body: '<!doctype html><title>好理家在</title><main>好理家在服務入口</main>',
      })
    })
  })

  test('can complete the 15-question flow and reach FamilyFin service handoff', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: /用 15 題/ })).toBeVisible()
    await expect(page.getByText('約 3-5 分鐘')).toBeVisible()
    await expect(page.getByText('不用輸入投資金額或個人資料')).toBeVisible()

    await page.getByRole('button', { name: '開始覺察測驗' }).click()

    for (let index = 0; index < 15; index += 1) {
      await expect(page.getByTestId('question-card')).toHaveAttribute(
        'data-question-index',
        String(index),
        { timeout: 5_000 },
      )

      await page.getByTestId('answer-option-4').click()

      if (index < 14) {
        await expect(page.getByTestId('question-card')).toHaveAttribute(
          'data-question-index',
          String(index + 1),
          { timeout: 5_000 },
        )
      }
    }

    await expect(page.getByText('檢測結果')).toBeVisible({ timeout: 5_000 })
    await expect(page.getByRole('heading', { name: /把結果帶回好理家在慢慢整理/ })).toBeVisible()
    await expect(page.getByText('五維風險覺察分析')).toBeVisible()
    await expect(page.getByText('不請 AI 推薦標的或配置')).toBeVisible()

    for (const { name, href } of serviceLinks) {
      await expect(page.getByRole('link', { name: new RegExp(name) })).toHaveAttribute('href', href)
    }

    const [consultationPage] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('link', { name: /預約線上諮詢/ }).click(),
    ])
    await expect(consultationPage).toHaveURL(/familyfinhealth\.com\/online-consultation/)
  })
})
