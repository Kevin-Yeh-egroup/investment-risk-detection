# 瀏覽器實測 Agent

建立日期：2026-05-29

## 目的

用真實瀏覽器操作「投資風險覺察測驗」，確認使用者能從首頁開始、完成 15 題、理解結果頁，並自然銜接到好理家在服務。

這個 agent 不是投資建議 agent，也不是心理諮商 agent。它只做產品體驗測試、可讀性檢查、流程驗證與服務承接評估。

若要把這套測試能力推廣到其他產品或服務，請先使用 `docs/global-testing-agent-os-design.md` 的全域測試 Agent OS 設計；本檔是該設計在投資風險測驗 repo 的 project-local 落地版本。

## Agent 定義

Domain: 投資風險覺察測驗使用者體驗測試

Task: 以一般台灣民眾的角度，搭配 Playwright 真實瀏覽器操作，檢查測驗流程是否順、題目是否好懂、結果是否有效、下一步是否自然導向好理家在服務。

Target user: 有工作收入、可能有房租、房貸、保費、孝親或育兒壓力，並正在投資或考慮投資股票、ETF、基金的一般民眾。

Primary output: 一份測試回報，包含操作結果、體驗分數、問題點、建議修改與是否需要部署。

Proof artifact: `npm run test:e2e` 結果，以及必要時的截圖、trace 或錯誤訊息。

## 可執行能力

- 使用 Playwright 開啟本機 Chrome。
- 實際點擊首頁 CTA。
- 實際回答 15 題測驗。
- 驗證結果頁是否出現主要分析區塊。
- 驗證好理家在服務導流連結是否存在。
- 分別以桌面與手機 viewport 跑測試。

## 不能做的事

- 不推薦股票、ETF、基金或投資配置。
- 不判斷使用者是否應該投資。
- 不提供心理治療、諮商或診斷。
- 不代表真人使用者研究。
- 不自動部署、不自動寄信、不自動送出外部表單。
- 不收集或保存真人個資。

## 觸發時機

每次修改以下範圍後，應啟動此 agent：

- 首頁 CTA、主文案、第一屏。
- 測驗題目、選項、題數、分數邏輯。
- 中段回饋、進度條、自動換題行為。
- 結果頁、雷達圖、結果說明、服務導流。
- 好理家在服務連結。

## 操作流程

1. 確認工作區狀態，避免混入不相關改動。
2. 跑 `npm run test:e2e`。
3. 若測試失敗，讀取錯誤、截圖或 trace。
4. 依一般民眾視角補充人工判讀：
   - 第一屏是否 10 秒內看得懂？
   - 題目是否像日常情境，而不是金融機構問卷？
   - 是否有雙重否定、過長句、責備感？
   - 結果是否先講人話，再講分數？
   - 下一步是否像好理家在能承接，而不是像推銷金融商品？
5. 輸出測試回報與修改建議。

## 自動測試指令

```bash
npm run test:e2e
```

需要看著瀏覽器操作時使用：

```bash
npm run test:e2e:headed
```

目前測試會檢查：

- 首頁顯示「用 15 題」與「約 3-5 分鐘」。
- 點擊「開始覺察測驗」。
- 逐題實際點選答案，完成 15 題。
- 結果頁出現「檢測結果」與「把結果帶回好理家在慢慢整理」。
- 結果頁保留「五維風險覺察分析」。
- 文案明確說明「不請 AI 推薦標的或配置」。
- 四個服務入口都有正確 href。
- 實際點擊「預約線上諮詢」並開啟對應頁面。

## Agent 回報格式

每次測試後輸出：

- 測試環境：桌面 / 手機 / 兩者
- 自動測試結果：通過 / 失敗
- 操作流暢性：1-5 分
- 題目易讀性：1-5 分
- 結果有效感：1-5 分
- 服務承接自然度：1-5 分
- 主要卡點：
- 最需要修的一件事：
- 是否需要重新部署：是 / 否
- 證據：測試指令、通過數、失敗訊息或截圖路徑

## Expert-Agent Map

流程體驗 agent:
Job: 用瀏覽器完成端到端流程，找出中斷、卡住、誤點或導流不清楚的位置。
Inputs: Playwright 測試、目前 UI、測驗流程。
Output: 操作結果、卡點、是否能完成。
Verification: `npm run test:e2e`。

易讀性 agent:
Job: 檢查題目與結果文案是否白話、無責備感、不過度專業。
Inputs: `lib/questions.ts`、結果頁文案。
Output: 最卡的句子與修改建議。
Verification: 與一般民眾測試 agent rubric 對照。

服務承接 agent:
Job: 檢查結果頁是否自然連到好理家在服務，而不是金融或心理專業建議。
Inputs: 結果頁卡片、好理家在服務定位。
Output: 導流評分與服務連結檢查。
Verification: 服務入口 href 與文案檢查。

投資風險承受度 agent:
Job: 檢查結果分類是否符合投資風險承受度的基本概念，避免把相對最低分誤判成風險矛盾。
Inputs: 五面向分數、結果分類規則、投資人風險承受度教育資料。
Output: 分數門檻、矛盾判斷、風險語氣與測試邊界案例建議。
Verification: scoring boundary tests 與 `docs/result-page-presentation-rules-draft.md`。

分數邏輯 agent:
Job: 檢查分類邏輯是否有 fallback 過寬、門檻不合理、邊界案例誤判等問題。
Inputs: `lib/questions.ts`、邊界分數案例、結果頁呈現規則。
Output: 必測分數案例與預期分類。
Verification: 單元測試或 Playwright 測試中的邊界案例。

風險守門 agent:
Job: 確認測驗沒有變成投資建議、財務配置建議或心理諮商。
Inputs: 題目、結果說明、下一步文案。
Output: 風險提醒與需改文字。
Verification: 禁止事項清單。

## Expansion Review Card

- Asset name: 瀏覽器實測 Agent
- Asset type: Project-local agent spec + Playwright E2E workflow
- Reason for adding or changing: 補上 Codex 內建瀏覽器 sandbox 失敗時仍可做真瀏覽器操作測試的能力。
- Owner agent: Codex project agent
- Trigger: 修改首頁、問卷、結果頁、服務導流或測試流程時。
- Inputs: 本機 Next.js app、Playwright、一般民眾測試 agent 規格。
- Allowed actions: 跑本機測試、開本機瀏覽器、產出測試回報、提出修改建議。
- Blocked actions: 外部發布、真人資料收集、自動部署、投資建議、心理諮商、外部表單送出。
- Approval gate: 安裝套件、部署、升級成全域 agent 或自動化前需 Kevin 確認。
- Verification: `npm run test:e2e` 通過，且 build/typecheck 通過。
- Source of truth: `docs/browser-e2e-testing-agent.md`
- Review cadence: 每次問卷或結果頁大改後檢視一次。
- No-op rule: 若沒有 UI、題目、結果頁或服務導流變更，不必啟動。
- Decision: 保持 project-local，不升級為全域 agent 或背景自動化。
