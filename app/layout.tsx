import type { Metadata } from "next"
import "./globals.css"
import Header from "@/app/components/layout/Header"
import Footer from "@/app/components/layout/Footer"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/app/components/ThemeProvider"
import { Toaster } from "react-hot-toast"

const inter = Inter({
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "SumUp",
    description: "Generated article summeries with AI",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className="antialiased flex flex-col  px-4 md:px-2 bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-neutral-50">
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                    <Toaster />
                    <Header />
                    <main className={`container m-auto min-h-screen`}>{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    )
}
