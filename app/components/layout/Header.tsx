"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import ThemeToggle from "../ThemeToggle"

const siteName = process.env.NEXT_PUBLIC_SITE_NAME

export default function Header() {
    return (
        <div className="flex flex-row w-full justify-between py-2 px-4">
            <h1 className="text-2xl font-bold">
                <Link
                    className="text-neutral-950 dark:text-neutral-50 hover:text-orange-600"
                    href={"/"}>
                    {siteName}
                </Link>
            </h1>
            <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Button
                    variant="ghost"
                    type="button"
                    onClick={() => window.open("https://github.com/pixelsoul/ai-summarizer")}
                    className="black_btn">
                    Github
                </Button>
            </div>
        </div>
    )
}
