import type { Metadata } from "next";
import { ViewTransitions } from 'next-view-transitions'
import localFont from 'next/font/local'
import { Inter as FontSans} from "next/font/google";

import { cn } from "@/lib/utils";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/toaster"
import { landingConfig } from "@/config/landing";
import { MainNav } from "@/components/main-nav";
import { siteConfig } from "@/config/site";
import "./globals.css";

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "steinhardt21",
      url: "https://github.com/steinhardt21",
    },
  ],
  creator: "steinhardt21",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@steinhardt21",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  // manifest: `${siteConfig.url}/site.webmanifest`,
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={cn(fontHeading.variable, fontSans.variable,'bg-background font-sans antialiased min-h-screen flex flex-col space-y-6')}>
          <header className="container z-40 bg-background">
            <div className="flex h-20 items-center justify-between py-6">
              <MainNav items={landingConfig.mainNav} />
            </div>
          </header>
          <main id="mainContent" tabIndex={-1} className='container flex-1'>{children}</main>
          <Toaster />
          <SiteFooter />
        </body>
      </html>
    </ViewTransitions>
  );
}
