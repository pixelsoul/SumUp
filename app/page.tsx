"use client"

import { useEffect, useState } from "react"
import Hero from "@/app/components/Hero"
import ArticleSummarizer from "@/app/components/ArticleSummarizer"

export default function Home() {
    return (
        <div className="container items-center">
            <Hero />
            <div>
                <ArticleSummarizer />
            </div>
        </div>
    )
}
