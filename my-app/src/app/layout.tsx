import type { Viewport } from 'next'
import { Yomogi } from 'next/font/google'
import './globals.css'

const yomogi = Yomogi({ weight: '400', subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${yomogi.className} bg-white text-zinc-700`}>
        {children}
      </body>
    </html>
  )
}
