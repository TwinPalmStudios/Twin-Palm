import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Twin Palm Studios - A New Era of Cinema",
  description: "Twin Palm Studios - A new era of cinema",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <MouseMoveEffect />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
