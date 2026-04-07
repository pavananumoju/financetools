import Link from 'next/link'
import { SHOW_NEWSLETTER } from '@/constants/siteConfig'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className={`grid grid-cols-1 gap-8 ${SHOW_NEWSLETTER ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white text-xs font-bold">
                ₹
              </div>
              <span className="text-base font-bold text-slate-900">
                FinanceTools<span className="text-indigo-600">.in</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Helping Indian tech professionals make smarter financial decisions. No clutter, no ads.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/job-switch-calculator" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                  Salary Sanity Checker
                </Link>
              </li>
              <li>
                <Link href="/tax-regime-comparator" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                  Tax Regime Comparator
                </Link>
              </li>
              <li>
                <Link href="/emergency-fund-calculator" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                  Emergency Fund Runway Planner
                </Link>
              </li>
              <li>
                <Link href="/job-offer-true-value-calculator" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                  Job Offer True Value Calculator
                </Link>
              </li>
              <li>
                <Link href="/fd-ladder-planner" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                  FD Ladder Planner
                </Link>
              </li>
            </ul>
          </div>

          {SHOW_NEWSLETTER && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><span className="text-sm text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors">Newsletter</span></li>
                <li><span className="text-sm text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors">Twitter / X</span></li>
                <li><span className="text-sm text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors">LinkedIn</span></li>
              </ul>
            </div>
          )}

        </div>

        <div className="mt-10 border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} FinanceTools.in — Built for Indian Techies.
        </div>
      </div>
    </footer>
  )
}