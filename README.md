# FinanceTools
Financial decision tools for Indian tech professionals.
Built to give the real number, not just the headline number.

## Project Status
Phase 1 — In Development
Current: Foundation setup complete. Building Job Switch Salary Sanity Checker.

## Tech Stack
- Framework: Next.js (App Router, JavaScript)
- Styling: Tailwind CSS
- Hosting: Vercel (free tier)
- Repository: GitHub

## Local Development
npm run dev
Open http://localhost:3000

## Folder Structure
app/                    → Pages and routing. One folder per tool.
components/layout/      → Header and Footer used across all pages
components/ui/          → Reusable buttons, cards, input elements
utils/                  → Calculation logic. Pure functions, no UI here.
constants/              → Static data — city indexes, tax slabs, etc.
public/                 → Static assets

## Build Rules
- One tool = one folder under app/ = one real URL
- Calculation logic always in utils/ — never inside components
- Static data always in constants/ — never hardcoded in components
- Components handle display only — zero business logic inside them

## Git Commit Convention
feat: add job switch calculator input UI
fix: correct purchasing power formula
chore: update project document
style: mobile layout fix on calculator page

## Branch Strategy
main → always deployable, push only when tool is complete and tested
dev  → active development branch

## Tool Build Order
Phase 1:
  1.1 Job Switch Salary Sanity Checker ← CURRENT
  1.2 New vs Old Tax Regime Comparator
  1.3 Emergency Fund Calculator

Phase 2:
  2.1 FD Ladder Planner
  2.2 SIP vs FD vs RD Comparison
  2.3 Goal-based SIP Calculator

Phase 3:
  3.1 Credit Card Recommender
  3.2 Lounge Access Finder
  3.3 Reward Points Value Calculator

## Session Rules
- Always open PROJECT.md before starting a session
- Always update PROJECT.md Section 4 after finishing
- Never work on two tools simultaneously
- New ideas go to PROJECT.md Section 7 Parking Lot — not immediate action

## AI Workflow
- Claude: primary code generation and project context
- ChatGPT: second opinion on logic or approach
- You: product decisions, testing, final review

## Deployment
Hosted on Vercel. Every push to main auto-deploys.
Live URL: (update once connected to Vercel)
Domain: Pending — buy only after first tool is live and working