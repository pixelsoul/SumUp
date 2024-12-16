"use client"

import Link from "next/link"
import { Separator } from "@/components/ui/separator"

const siteName = process.env.NEXT_PUBLIC_SITE_NAME

const Footer = () => {
    return (
        <footer className=" py-4 flex flex-row gap-4 items-center justify-center mt-auto">
            <p>&copy; 2024 {siteName}</p>
            <Separator orientation="vertical" className="h-4" />
            <p>
                Developed By:{" "}
                <Link href="https://pixelsoul.com" target="_blank">
                    pixelsoul.com
                </Link>
            </p>
        </footer>
    )
}

export default Footer
