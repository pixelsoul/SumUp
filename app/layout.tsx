import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Header from "@/app/components/layout/Header"
import Footer from "@/app/components/layout/Footer"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/app/components/ThemeProvider"
import toast, { Toaster } from "react-hot-toast"

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
})
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
})

const inter = Inter({
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "AI Summarizer",
    description: "Generated article summeries with AI",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased container flex flex-col m-auto px-2 bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-neutral-50`}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                    <Toaster />
                    <Header />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    )
}
