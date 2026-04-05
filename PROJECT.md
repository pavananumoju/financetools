# PROJECT MASTER DOCUMENT
### Finance Tools Website — Indian Tech Professionals
**Last Updated:** April 2026
**Status:** Foundation Setup — In Progress

---

## 1. PROJECT VISION

A brand and platform built for Indian salaried tech professionals navigating a world being reshaped by AI. Two connected products under one identity:

**Product 1 — Tools Site:** A clean, fast, mobile-friendly website with genuinely useful financial decision tools — salary calculators, tax comparators, credit card recommenders. No clutter, no excessive ads. Tools that give one insight no other site gives. Monetized through affiliate links. Runs silently once built with minimal maintenance.

**Product 2 — Newsletter / Blog (Phase 4+):** A learning-in-public newsletter documenting the journey of building real things with AI. Not AI concepts explained generically — honest documentation of what was built, what was learned, what failed. One Indian developer's real experience. Authentically yours, impossible to copy.

**Target Audience:** Indian salaried tech professionals — developers, consultants, IT workers — thinking about job switches, investments, tax decisions, and how AI is changing their careers.

**Core Promise to Users:** Tools that give you the real number, not just the headline number. Every tool has one output no other site shows.

---

## 2. TECH STACK — DECIDED, DO NOT RE-DEBATE

| Layer | Decision | Reason |
|---|---|---|
| Frontend Framework | Next.js (App Router) | SEO-friendly, React-based, industry standard |
| Styling | Tailwind CSS | Fast, clean, no separate CSS files |
| Language | JavaScript | Not TypeScript — reduces complexity for solo builder |
| Hosting | Vercel (Free tier) | Zero config, auto-deploys from GitHub |
| Repository | GitHub (pavananumoju) | Version control, required for Vercel |
| Domain | Pending | Buy only after first tool is live |
| Database | None for Phase 1-3 | All calculators run in browser |
| IDE | VS Code + Claude.ai | Claude for generation, VS Code for editing |
| Future hosting | AWS t3.micro or DigitalOcean | Move here if Vercel limits are hit |

---

## 3. FULL PHASE PLAN

### PHASE 1 — Job & Salary Tools
*Closest to your lived experience. Lowest research burden. Start here.*

| # | Tool | Key Unique Output |
|---|---|---|
| 1.1 | **Job Switch Salary Sanity Checker** ← CURRENT | Purchasing power gain after city cost adjustment |
| 1.2 | New vs Old Tax Regime Comparator | Break-even salary where new regime stops being better |
| 1.3 | Emergency Fund Calculator for Job Switchers | Exact months of runway needed before switching |

### PHASE 2 — Investment Tools
*Evergreen content, good affiliate potential, low maintenance.*

| # | Tool | Key Unique Output |
|---|---|---|
| 2.1 | FD Ladder Planner | Optimal FD split for liquidity + returns |
| 2.2 | SIP vs FD vs RD Post-Tax Comparison | Post-tax, inflation-adjusted real returns |
| 2.3 | Goal-based SIP Calculator | Monthly investment needed to reach ₹X in Y years |

### PHASE 3 — Credit & Spending Tools
*Highest monetization potential. Requires card data research upfront.*

| # | Tool | Key Unique Output |
|---|---|---|
| 3.1 | Credit Card Recommender by Spend Pattern | Effective cashback rate on YOUR actual spend mix |
| 3.2 | Lounge Access Finder | Cards giving lounge access at your home airport |
| 3.3 | Reward Points Value Calculator | Actual rupee value of points per card |

### PHASE 4 — Newsletter / Blog
*Start only after Phase 1 tools are live and getting traffic.*

- Format: Learning-in-public. What you built with AI, what you learned, what surprised you.
- Frequency: Once or twice a month. No pressure for weekly.
- Each issue links back to a relevant tool on the site.

---

## 4. CURRENT STATUS

```
Phase:  1 — Foundation Setup
Step:   Next.js project initialized. Folder structure being set up.
Last:   Created financetools project at /projects/Hustle/Project_financetools/financetools
Next:   Push to GitHub → Connect Vercel → Start Tool 1.1 Step 1
```

*Update this every session in 2-3 lines. Nothing more.*

---

## 5. DECISIONS MADE — LOG

*These are settled. Do not re-debate unless there is a strong reason.*

- ✅ Tools-first website chosen over pure newsletter or content site
- ✅ Next.js chosen — App Router, JavaScript only
- ✅ Tailwind CSS for styling
- ✅ Vercel for hosting — move to AWS/DigitalOcean later if needed
- ✅ No database in Phase 1-3 — all browser-based calculators
- ✅ Domain purchase deferred — buy only after first tool is live
- ✅ Phase 1 starts with Job Switch Salary Sanity Checker
- ✅ Monetization via affiliate links — Zerodha, Groww, Ditto, BankBazaar
- ✅ Each tool must have one unique output no other Indian finance site shows
- ✅ AI workflow — Claude primary, ChatGPT second opinion, you decide
- ✅ VS Code + Claude.ai chosen over Cursor (switch to Cursor later if needed)
- ✅ .com domain preferred — buy on Porkbun or Namecheap, avoid GoDaddy
- ✅ One tool = one folder under app/ = one real URL
- ✅ Calculation logic always in utils/ — never inside components
- ✅ Static data always in constants/ — never hardcoded in components
- ✅ Git branch strategy: main (deployable) + dev (working)
- ✅ Commit convention: feat / fix / chore / style prefixes

---

## 6. NEXT 3 ACTIONS

*Complete these in order. Do not jump ahead.*

- [ ] **Action 1:** Push project to GitHub — create repo financetools, push initial commit from dev branch
- [ ] **Action 2:** Connect GitHub repo to Vercel — get the vercel.app live URL
- [ ] **Action 3:** Start Tool 1.1 Step 1 — create app/job-switch-calculator/page.js, verify it loads

---

## 7. PARKING LOT

*Good ideas captured here. Not doing these now. Revisit later.*

- Domain names — RupeeSense, SalaryLens, ClearRupee, SmartCTC, TaxDekho
- Newsletter platform — Ghost, Beehiiv, or custom-built
- n8n workflow for LinkedIn auto-posting — Phase 4+
- User accounts / saved calculations — Phase 3+ if demand exists
- Mobile app — very far future
- AI-powered personalized recommendations — Phase 3+
- Programmatic SEO pages — e.g. "salary calculator Hyderabad to Bengaluru"
- Credit card affiliate direct tie-ups — after Phase 3
- Sponsored placements — only after meaningful traffic
- Switch to Cursor IDE — when codebase grows and Cursor subscription is justified

---

## 8. MONETIZATION PLAN

*Nothing to action in Phase 1. Just be aware of the path.*

| Phase | Action |
|---|---|
| Phase 1-2 live | Apply for Zerodha, Groww, Ditto affiliates |
| Phase 2-3 live | Add affiliate links within relevant tool pages |
| Phase 3 live | Apply for credit card affiliates via BankBazaar |
| Phase 4+ | Newsletter sponsorships |
| Long term | Sponsored placements, digital products, paid tiers |

**Realistic income expectation (honest):**
- Month 1–6: ₹0 — building and Google indexing phase
- Month 6–12: ₹2,000–₹8,000/month if tools are ranking
- Year 2+: ₹15,000–₹50,000/month as tools compound and conversions grow

---

## 9. TOOL BUILD TEMPLATE

*Follow this exact sequence for every single tool. No skipping steps.*

**STEP 1 — Page Setup**
- Create new page file (e.g. app/job-switch-calculator/page.js)
- Add basic layout — page title and one-line description of what the tool does
- Verify the page loads at the correct URL before touching any logic

**STEP 2 — Input UI**
- Add all input fields (salary, city, company type, etc.)
- Add labels, placeholder text, and helper text where needed
- Add the Calculate button
- No logic yet — just the visual form working correctly

**STEP 3 — Calculation Logic**
- Write the calculation function in a /utils folder as a separate file
- Test logic with hardcoded numbers first — verify it is correct independently
- Only connect to UI inputs after the logic is confirmed working

**STEP 4 — Output Display**
- Show results section below the form after calculation
- Make the unique output (the one no other site shows) visually prominent
- Use plain language — rupees not percentages where possible, real numbers not jargon

**STEP 5 — Validation**
- Handle empty inputs — show a clear, friendly error message
- Handle impossible values (negative salary, zero expenses)
- Never let the tool show NaN, undefined, or blank to the user

**STEP 6 — Basic UX Polish**
- Check spacing and readability on desktop
- Test on mobile view — most users will be on phone
- Verify the page loads fast with no unnecessary assets

**STEP 7 — Definition of Done**

A tool is COMPLETE and ready to deploy only when ALL of these are true:
- [ ] All inputs work correctly and are validated
- [ ] Output numbers are accurate (manually verified with known test values)
- [ ] The unique insight output is clearly visible and prominent
- [ ] No errors in browser developer tools console
- [ ] Mobile view is usable without horizontal scrolling
- [ ] Page loads in under 3 seconds

**STEP 8 — Ship It**
- Push code to GitHub (main branch)
- Vercel auto-deploys within 1-2 minutes
- Open the live URL and test once more on the deployed version
- Update Section 4 (Current Status) in this document
- Update Section 6 (Next 3 Actions) with what comes next

---

## 10. FOLDER STRUCTURE

```
financetools/
├── app/
│   ├── layout.js                     <- Root layout, header + footer
│   ├── page.js                       <- Homepage / Dashboard
│   └── job-switch-calculator/
│       └── page.js                   <- Tool 1.1
├── components/
│   ├── layout/
│   │   ├── Header.js
│   │   └── Footer.js
│   └── ui/
│       ├── Button.js
│       └── Card.js
├── utils/
│   └── jobSwitchCalculator.js        <- Pure calculation logic
├── constants/
│   └── cityIndex.js                  <- Cost of living data
├── public/
├── .env.local                        <- Never commit this
├── .env.example                      <- Commit this as template
├── PROJECT.md                        <- This file
└── README.md
```

---

## 11. SESSION RULES

- Always open PROJECT.md before starting a session
- Always update Section 4 after finishing
- Never work on two tools simultaneously
- New ideas go to Section 7 Parking Lot — not immediate action
- At start of every Claude session — paste PROJECT.md and say "continuing from where I left off"
- After every session — ask Claude to update PROJECT.md and replace the file

---

## 12. HOW TO USE THIS DOCUMENT

1. Save this file as PROJECT.md in the root of your financetools project folder
2. Keep it open whenever you are working on the project
3. At the start of every Claude session — paste this entire document and say "here is my project document, continuing from where I left off"
4. After every working session — ask Claude "update my project document with today's decisions and progress" and replace this file with the updated version
5. When confused about what to do next — read Section 6 (Next 3 Actions). That is always your answer
6. When a new idea comes up — add it to Section 7 (Parking Lot). Do not act on it immediately
7. When starting any new tool — go to Section 9 (Tool Build Template) and follow Step 1 first, nothing else

---

*This document was created based on planning discussions in April 2026.*
*Update the Last Updated date every time this document is revised.*