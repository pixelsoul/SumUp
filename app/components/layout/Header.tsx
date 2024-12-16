"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import ThemeToggle from "../ThemeToggle"

const siteName = process.env.NEXT_PUBLIC_SITE_NAME

export default function Header() {
    return (
        <div className="container flex flex-row m-auto justify-between py-8 px-4">
            <h1 className="text-4xl font-bold">
                <Link
                    className="text-neutral-950 dark:text-neutral-50 hover:text-orange-600"
                    href={"/"}>
                    {siteName}
                </Link>
            </h1>
            <div className="flex items-center space-x-2">
                <ThemeToggle />
            </div>
        </div>
    )
}
