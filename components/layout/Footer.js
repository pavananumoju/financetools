import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
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
              <li><span className="text-sm text-slate-400">Tax Regime Comparator</span></li>
              <li><span className="text-sm text-slate-400">Emergency Fund Calc</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><span className="text-sm text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors">Newsletter</span></li>
              <li><span className="text-sm text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors">Twitter / X</span></li>
              <li><span className="text-sm text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors">LinkedIn</span></li>
            </ul>
          </div>

        </div>

        <div className="mt-10 border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} FinanceTools.in — Built for Indian Techies.
        </div>
      </div>
    </footer>
  )
}