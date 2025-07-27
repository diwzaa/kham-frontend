import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Khram - ค้นพบและสร้างสรรค์ลวดลายผ้าครามไทย',
  description: 'เข้าถึงคลังข้อมูลลวดลายผ้าครามดั้งเดิม และสร้างลายใหม่ด้วยเทคโนโลยี AI',
  keywords: 'ผ้าคราม, ลายผ้าไทย, AI, pattern, traditional, thai fabric',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-gray-50 font-thai`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}