import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Imad & Nour - Engagement Invitation",
  description:
    "Join us for our engagement celebration on January 17th, 2025 at 4:30 PM. An evening of love & celebration awaits!",
  openGraph: {
    title: "Imad & Nour - Engagement Invitation",
    description:
      "Join us for our engagement celebration on January 17th, 2025 at 4:30 PM. An evening of love & celebration awaits!",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-05%20at%201.01.32%20PM-TEpkdFzBho1yMHhqQsrL4yJSl1pOPA.jpeg",
        width: 1200,
        height: 630,
        alt: "Imad & Nour Engagement Celebration",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imad & Nour - Engagement Invitation",
    description:
      "Join us for our engagement celebration on January 17th, 2025 at 4:30 PM. An evening of love & celebration awaits!",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-05%20at%201.01.32%20PM-TEpkdFzBho1yMHhqQsrL4yJSl1pOPA.jpeg",
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Great+Vibes&family=Allura&display=swap"
          rel="stylesheet"
        />
        <meta name="v0-hide-button" content="true" />
        <meta property="og:title" content="Imad & Nour - Engagement Invitation" />
        <meta
          property="og:description"
          content="Join us for our engagement celebration on January 17th, 2025 at 4:30 PM. An evening of love & celebration awaits!"
        />
        <meta
          property="og:image"
          content="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-05%20at%201.01.32%20PM-TEpkdFzBho1yMHhqQsrL4yJSl1pOPA.jpeg"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Imad & Nour - Engagement Invitation" />
        <meta
          name="twitter:description"
          content="Join us for our engagement celebration on January 17th, 2025 at 4:30 PM. An evening of love & celebration awaits!"
        />
        <meta
          name="twitter:image"
          content="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-05%20at%201.01.32%20PM-TEpkdFzBho1yMHhqQsrL4yJSl1pOPA.jpeg"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
