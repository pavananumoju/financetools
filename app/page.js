import Link from 'next/link'
import { Calculator, TrendingUp, CreditCard, ShieldCheck, ArrowRight, Mail, Briefcase } from 'lucide-react'
import { SHOW_NEWSLETTER } from '@/constants/siteConfig'

const tools = [
  {
    title: 'Salary Sanity Checker',
    description: 'Compare purchasing power across Indian cities before switching jobs.',
    uniqueInsight: 'Shows your real hike after city cost adjustment',
    href: '/job-switch-calculator',
    tag: 'Live',
    tagColor: 'bg-indigo-100 text-indigo-700',
    iconBg: 'bg-indigo-50 group-hover:bg-indigo-100',
    icon: <Calculator size={20} className="text-indigo-600" />,
    active: true,
  },
  {
    title: 'New vs Old Tax Regime',
    description: 'Find exactly how much tax you save — slab-by-slab — and which regime wins for your salary and deductions.',
    uniqueInsight: 'Shows the exact break-even point + monthly savings',
    href: '/tax-regime-comparator',
    tag: 'Live',
    tagColor: 'bg-indigo-100 text-indigo-700',
    iconBg: 'bg-indigo-50 group-hover:bg-indigo-100',
    icon: <TrendingUp size={20} className="text-indigo-600" />,
    active: true,
  },
  {
    title: 'Job Offer True Value Calculator',
    description: 'Strip any offer down to guaranteed monthly in-hand — separating fixed pay, variable risk, and one-time bonuses.',
    uniqueInsight: 'Shows your real recurring gain, not the CTC headline',
    href: null,
    tag: 'Coming Soon',
    tagColor: 'bg-slate-100 text-slate-500',
    iconBg: 'bg-slate-50',
    icon: <Briefcase size={20} className="text-slate-400" />,
    active: false,
  },
  {
    title: 'Emergency Fund Calc',
    description: 'Months of runway you need before safely making the switch.',
    uniqueInsight: 'Shows your safe switch date',
    href: null,
    tag: 'Coming Soon',
    tagColor: 'bg-slate-100 text-slate-500',
    iconBg: 'bg-slate-50',
    icon: <ShieldCheck size={20} className="text-slate-400" />,
    active: false,
  },
  {
    title: 'Credit Card Recommender',
    description: 'Find the best card based on your actual monthly spend mix.',
    uniqueInsight: 'Shows effective cashback rate on your spend',
    href: null,
    tag: 'Coming Soon',
    tagColor: 'bg-slate-100 text-slate-500',
    iconBg: 'bg-slate-50',
    icon: <CreditCard size={20} className="text-slate-400" />,
    active: false,
  },
]

export default function HomePage() {
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.14),_transparent_50%)]" />
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
              Built for Indian tech professionals
            </div>
            <h1 className="text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
              The real number,<br />
              not the <span className="text-indigo-600">headline</span> number.
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-xl">
              Financial decision tools that show what other calculators hide — purchasing power, real hikes, break-even salaries. No clutter, no ads.
            </p>
            <div className="flex gap-3">
              <Link
                href="/job-switch-calculator"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
              >
                Try Salary Checker
              </Link>
              {SHOW_NEWSLETTER && (
                <button className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-600 transition-colors">
                  Join Newsletter
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="bg-white py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Financial Tools</h2>
            <p className="mt-1 text-sm text-slate-500">Each tool shows one insight no other Indian finance site shows.</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className={`group relative flex min-h-[250px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all ${
                  tool.active
                    ? 'cursor-pointer hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md'
                    : 'opacity-70'
                }`}
              >
                {/* Icon */}
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${tool.iconBg}`}>
                  {tool.icon}
                </div>

                {/* Tag */}
                <span className={`self-start rounded-full px-2.5 py-0.5 text-xs font-semibold mb-3 ${tool.tagColor}`}>
                  {tool.tag}
                </span>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 mb-2">{tool.title}</h3>

                {/* Description — flex-grow pins footer to bottom */}
                <p className="text-sm text-slate-500 leading-relaxed flex-grow">{tool.description}</p>

                {/* Footer — always pinned to bottom */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className={`text-xs font-medium ${tool.active ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {tool.uniqueInsight}
                  </p>
                  {tool.active && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Open Tool <ArrowRight size={13} />
                    </div>
                  )}
                </div>

                {/* Invisible full-card link for active tools */}
                {tool.active && (
                  <Link href={tool.href} className="absolute inset-0 rounded-2xl" aria-label={tool.title} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA intentionally parked until newsletter phase */}
      {SHOW_NEWSLETTER && (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                  <Mail size={13} />
                  Newsletter
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Learning in Public</h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Documenting the journey of building real things with AI. Honest experiences, what I learned, and what failed. No generic AI hype.
                </p>
              </div>
              <div className="w-full max-w-sm">
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                  <button className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
                    Subscribe — it's free
                  </button>
                </div>
                <p className="mt-3 text-xs text-slate-400">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </section>
      )}

    </main>
  )
}