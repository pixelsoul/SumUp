"use client"

import { Button } from "@/components/ui/button"

const siteName = process.env.NEXT_PUBLIC_SITE_NAME

const Footer = () => {
    return (
        <footer className=" py-4 flex flex-col items-center justify-center mt-auto">
            <p>&copy; 2024 {siteName}</p>
            <Button
                variant="ghost"
                type="button"
                onClick={() => window.open("https://github.com/pixelsoul/ai-summarizer")}
                className="black_btn">
                Github
            </Button>
        </footer>
    )
}

export default Footer
