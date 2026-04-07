import Link from 'next/link'
import { SHOW_NEWSLETTER } from '@/constants/siteConfig'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-bold">
            ₹
          </div>
          <span className="text-lg font-bold text-slate-900">
            FinanceTools<span className="text-indigo-600">.in</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/job-switch-calculator" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Salary Checker
          </Link>
          <Link href="/tax-regime-comparator" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Tax Comparator
          </Link>
          <span className="text-sm text-slate-400 cursor-not-allowed">
            Emergency Fund
          </span>
        </nav>

        {SHOW_NEWSLETTER && (
          <button className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
            Newsletter
          </button>
        )}

      </div>
    </header>
  )
}