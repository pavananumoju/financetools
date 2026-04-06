import { Geist } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: 'FinanceTools.in — Built for Indian Tech Professionals',
  description: 'Financial decision tools that show you the real number, not just the headline number.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-slate-100 text-slate-900 antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}