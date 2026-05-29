# 全域測試 Agent OS 設計稿

建立日期：2026-05-29

## 目的

建立一套可套用到不同產品與服務的測試 Agent OS。它不是單一測試腳本，而是一個能依照測試主題召集不同 agent、建立領域知識、模擬目標使用者、用瀏覽器實際操作、多輪蒐集回饋並提出優化建議的工作流。

本設計稿目前是可審核提案，不會直接改全域規則、不會建立背景自動化，也不會讓 agent 自行更新永久記憶。升級成全域 skill、Agent OS workflow 或 automation 前，需要 Kevin 另外確認。

2026-05-29 更新：Kevin 已確認要把這套概念作為之後建立及訓練 agent 的標準。Shared Agent OS 的正式標準來源為 `C:\Users\Kevin\Documents\Codex\agent-os-home\codex-os\workflows\agent-creation-training-standard.md`；本檔保留為投資風險測驗專案的設計來源與測試案例。

## Done Means

這套系統完成時，應能做到：

1. 接到任一測試主題後，先判斷要召集哪些 agent。
2. 依主題建立最小可用的知識包與禁止事項。
3. 產生符合目標市場與場景的 persona matrix。
4. 用真實瀏覽器跑流程，而不只看原始碼。
5. 大量、多輪取得評價、建議與回饋。
6. 彙整問題優先級，提出可執行優化建議。
7. 修改後重跑測試，對比改善效果。
8. 把可重用學習整理成 proposal，由 Kevin 決定是否升級成全域知識。

## 核心原則

- 先路由，再測試：不同測試主題需要不同 agent 組合。
- 先學領域，再模擬：persona 不能只靠想像，要有知識包支持。
- 先真實操作，再評論：能用瀏覽器點擊就不要只做文案評論。
- 先大量觀察，再優化：不要被單一 persona 的意見牽著走。
- 先提案，再學習：持續學習必須可審核，不讓 agent 自動改全域規則。
- 高風險領域保守處理：金融、法律、醫療、心理、個資與外部發布需要 risk gate。

## 全域 Agent 角色

### 1. Testing Orchestrator

任務：讀取測試需求，判斷主題、測試目標、成功條件與要召集的 agent。

輸出：

- 測試任務 brief
- agent roster
- 測試層級
- 驗證計畫
- approval gates

### 2. Domain Knowledge Agent

任務：建立該主題的最小知識包。

知識包包含：

- 服務或產品定位
- 目標使用者
- 市場或文化脈絡
- 專業邊界
- 禁止聲稱
- 競品或替代服務
- 當前資訊來源與更新日期

### 3. Persona Simulation Agent

任務：根據知識包建立 persona matrix，模擬不同使用者完成流程並產生主觀回饋。

persona 必須包含：

- 基本背景
- 使用動機
- 焦慮或阻力
- 常用語言與平台
- 對服務的期待
- 可能退出原因
- 測試回答策略

### 4. Browser Operation Agent

任務：使用 Playwright 或同等工具實際操作瀏覽器。

能力：

- 開啟桌面與手機 viewport
- 點擊 CTA
- 填表或回答題目
- 檢查結果頁
- 檢查連結與導流
- 保存失敗截圖與 trace

### 5. UX And Readability Agent

任務：評估使用者是否看得懂、願不願意繼續、是否覺得被尊重。

評估面向：

- 第一屏理解度
- CTA 信任感
- 文案白話程度
- 題目長度與斷句
- 是否有責備感或審問感
- 手機閱讀負擔

### 6. Service Fit Agent

任務：評估測試結果是否自然銜接到指定服務，而不是跳到不相干或高壓轉換。

評估面向：

- 下一步是否符合使用者當下需求
- 是否像推銷
- 是否和服務定位一致
- 是否能轉到正確服務入口
- 是否有足夠但不過度的行動提示

### 7. Risk Guardian Agent

任務：檢查內容、流程與 agent 建議是否越界。

常見風險：

- 投資建議或商品推薦
- 法律、醫療、心理諮商式判斷
- 過度承諾效果
- 收集敏感資料
- 自動外部送出
- 自動部署或帳號權限變更

### 8. Learning Curator Agent

任務：把多輪測試結果整理成可審核的學習提案。

它只能提出：

- 哪些觀察可重用
- 哪些規則應留在 project-local
- 哪些可以升級全域
- 哪些仍需要更多證據

它不能自行：

- 改全域 skill
- 改 Agent OS registry
- 建立 automation
- 寫入永久記憶

## 依主題召集 Agent 規則

| 測試主題 | 必召 agent | 可選 agent | 主要證據 |
| --- | --- | --- | --- |
| 問卷 / 測驗 | Testing Orchestrator, Domain Knowledge, Persona Simulation, Browser Operation, UX And Readability, Risk Guardian | Service Fit, Learning Curator | 完整作答、結果頁、persona 回饋 |
| Landing page | Testing Orchestrator, Persona Simulation, Browser Operation, UX And Readability, Service Fit | Domain Knowledge, Risk Guardian | 第一屏、CTA、手機截圖、轉換路徑 |
| AI 助手 / Chatbot | Testing Orchestrator, Domain Knowledge, Persona Simulation, Browser Operation, Risk Guardian | UX And Readability, Learning Curator | 對話品質、拒答邊界、任務完成率 |
| 表單 / 報名流程 | Testing Orchestrator, Browser Operation, UX And Readability, Risk Guardian | Persona Simulation | 表單完成率、錯誤訊息、資料風險 |
| 電商 / 付款流程 | Testing Orchestrator, Browser Operation, UX And Readability, Risk Guardian | Persona Simulation, Service Fit | 購物流程、付款前 approval gate |
| 後台 / 工作系統 | Testing Orchestrator, Browser Operation, UX And Readability | Domain Knowledge, Risk Guardian | 任務完成時間、錯誤率、資訊密度 |
| 教育內容 / 課程 | Testing Orchestrator, Domain Knowledge, Persona Simulation, UX And Readability | Browser Operation, Learning Curator | 理解度、學習動機、內容順序 |

## 測試層級

### Level 0: Source Review

只讀程式碼、文案、規格或設計稿。

適用：瀏覽器不可用、需求初稿、快速風險檢查。

### Level 1: Single Browser Flow

用真實瀏覽器跑一條標準流程。

適用：確認功能是否可完成。

### Level 2: Persona Batch Test

用多個 persona 跑多次流程，產出分數與回饋。

適用：問卷、服務導流、AI assistant、landing page。

### Level 3: Optimization Loop

測試 -> 彙整 -> 修改 -> 重測 -> 比較改善效果。

適用：正式上線前優化。

### Level 4: Monitored Regression

定期或每次重要變更後自動跑，產生報告。

適用：多次手動驗證已證明價值後，且 Kevin 同意建立 automation。

## Knowledge Pack 格式

```text
Topic:
Service/Product:
Target market:
Primary users:
User environment:
Domain facts:
Current sources:
Source freshness:
Brand/service positioning:
Allowed claims:
Forbidden claims:
High-risk boundaries:
Success criteria:
Failure modes:
Review owner:
Last updated:
```

## Persona Matrix 格式

```text
Persona name:
Location/context:
Age/life stage:
Financial or life pressure:
Digital habits:
Motivation:
Anxiety/objection:
Language style:
Likely behavior:
Answer strategy:
Exit trigger:
Expected next step:
```

## Browser Test Contract

每個測試主題都要定義：

- entry URL
- primary path
- required clicks
- required form inputs or answer strategy
- expected result state
- service handoff expectations
- mobile viewport
- desktop viewport
- blocked external actions
- evidence artifact

## Feedback Report 格式

```text
Test subject:
Test level:
Agents used:
Personas tested:
Browser proof:
Pass/fail:

Scores:
- Operation fluency:
- Readability:
- Trust:
- Result usefulness:
- Service fit:
- Risk safety:

Top findings:
1.
2.
3.

Representative user reactions:
- Persona:
  Reaction:
  Evidence:

Optimization recommendations:
- Must fix:
- Should fix:
- Could try:

Learning proposal:
- Keep project-local:
- Candidate global rule:
- Needs more evidence:

Approval needed:
Next test round:
```

## 多輪測試流程

1. Define: Testing Orchestrator 定義主題、目標與測試層級。
2. Learn: Domain Knowledge Agent 建立知識包。
3. Simulate: Persona Simulation Agent 建立 8 到 12 個 persona。
4. Operate: Browser Operation Agent 用真瀏覽器跑流程。
5. Judge: UX、Service Fit、Risk Guardian 共同評分。
6. Aggregate: Orchestrator 彙整分數、共通問題與矛盾回饋。
7. Optimize: 主 agent 做最小有效修改。
8. Re-test: 同一批 persona 重跑，對比前後分數。
9. Learn safely: Learning Curator 產出學習提案。
10. Approve: Kevin 決定是否升級到全域規則、project-local 或 no-op。

## 持續學習機制

持續學習分成三層：

### Project-local Learning

適用：只對單一 repo 或單一產品有效。

儲存位置建議：

- `docs/*-testing-agent.md`
- `docs/*-knowledge-pack.md`
- `docs/*-persona-matrix.md`
- `tests/*`

### Global Candidate Learning

適用：跨 2 到 3 個任務都重複出現，且沒有明顯風險。

儲存為提案，不直接生效。

### Approved Global Learning

只有在 Kevin 明確確認後，才可升級為：

- shared Agent OS workflow
- global Codex skill
- reusable template
- automation
- durable memory

## Approval Gates

必須先問 Kevin：

- 安裝新套件
- 修改全域 Agent OS
- 建立或更新 global skill
- 建立 automation
- 外部發布、部署、寄信或送表單
- 收集真人資料
- 涉及帳號、權限、付款
- 涉及高風險專業建議

不需要先問：

- 建立 project-local 設計稿
- 跑本機測試
- 產出測試報告
- 提出學習提案

## 和目前投資風險測驗的落地關係

目前這個 repo 已具備 Level 1 的真瀏覽器測試基礎：

- `docs/browser-e2e-testing-agent.md`
- `playwright.config.ts`
- `tests/investment-risk-flow.spec.ts`
- `npm run test:e2e`

下一步若要升級成 Level 2，需新增：

- 台灣使用者 persona matrix
- 多 persona 答題策略
- 批次測試報告輸出
- 優化前後對比格式

## Implementation Roadmap

### Phase 1: Project Proof

在投資風險測驗 repo 建立完整 Level 2 測試：

- 8 到 12 個台灣使用者 persona
- 多 persona 回答策略
- 自動產出測試摘要
- 主 agent 彙整優化建議

### Phase 2: Reusable Template

把本次經驗整理成可複製模板：

- knowledge pack template
- persona matrix template
- browser test contract
- feedback report template

### Phase 3: Shared Agent OS Proposal

將經過 2 到 3 次專案驗證的模式，提案升級到 shared Agent OS。

### Phase 4: Optional Automation

只有在重複手動跑有明確價值後，才考慮定期測試或 CI 報告。

## Expansion Review Card

- Asset name: 全域測試 Agent OS 設計稿
- Asset type: Project proof and global workflow design source
- Reason for adding or changing: Kevin 希望測試 agent 可依不同主題召集不同 agent，能持續學習、優化並與時俱進。
- Owner agent: Testing Orchestrator, with Governance Auditor and Risk Guardian review
- Trigger: 任何需要多 agent 測試、persona 模擬、真瀏覽器操作與多輪優化的任務。
- Inputs: 測試主題、服務定位、使用者市場、可操作 URL、程式碼或設計稿、既有測試。
- Allowed actions: 建立知識包、模擬 persona、跑本機瀏覽器測試、產出回饋、提出優化建議。
- Blocked actions: 未經確認不得改全域規則、建立 automation、外部發布、收集真人資料、提供高風險專業建議。
- Approval gate: 升級 shared Agent OS、global skill、automation 或 durable memory 前需要 Kevin 確認。
- Verification: 先在投資風險測驗 repo 用 Level 2 persona batch test 驗證，再用第二個不同主題專案驗證。
- Source of truth: 本檔案。
- Review cadence: 完成兩個專案實測後回顧一次。
- No-op rule: 若只是單次小改文案，不啟動全套系統，只用 Level 0 或 Level 1。
- Decision: 已由 Kevin 確認升級為 shared Agent OS 標準；正式全域來源見 `workflows/agent-creation-training-standard.md`。
