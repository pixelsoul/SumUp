"use client"

import { useState, useEffect } from "react"
import { FaRegCopy } from "react-icons/fa"
import { FaCheck } from "react-icons/fa"
import { Articles, Article } from "@/types/articles"

interface ArticlesInterface {
    articles: Articles | undefined
    selectedArticle: (article: Article) => void
    selected: Article | undefined
}

const ArticleList = ({ articles, selectedArticle, selected }: ArticlesInterface) => {
    const [copied, setCopied] = useState<string>()

    const handleCopy = (copyUrl: string) => {
        setCopied(copyUrl)
        navigator.clipboard.writeText(copyUrl)
        setTimeout(() => setCopied(""), 3000)
    }

    const handleSelectedArticle = (item: Article) => {
        selectedArticle(item)
    }

    return (
        <div className="max-h-72 overflow-y-auto flex flex-col gap-1 py-2 px-2 rounded-lg border shadow-lg">
            {articles &&
                articles.length > 0 &&
                articles
                    .map((article, index) => (
                        <div
                            key={`link-${index}`}
                            onClick={() => handleSelectedArticle(article)}
                            className={`p-3 flex flex-row bg-neutral-50 dark:bg-neutral-900 border gap-3 rounded-md cursor-pointer ${
                                article.url === selected?.url
                                    ? "border-orange-500 bg-orange-100 dark:bg-orange-800"
                                    : "border-neutral-200 dark:border-neutral-700"
                            }`}>
                            <div className="w-[50px]">
                                <div
                                    className={`text-neutral-950 dark:text-neutral-50 w-[50px] h-[50px]  border border-neutral-300 dark:border-neutral-700 flex items-center justify-center rounded-full text-xl ${
                                        copied === article.url
                                            ? "!bg-orange-500"
                                            : "bg-neutral-200 dark:bg-neutral-950"
                                    }`}
                                    onClick={() => handleCopy(article.url)}>
                                    {copied === article.url ? (
                                        <FaCheck className=" object-contain" />
                                    ) : (
                                        <FaRegCopy className=" object-contain" />
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 justify-center truncate">
                                <p className="text-sm truncate">{article.description}</p>
                                <p className={`text-sm truncate`}>{article.url}</p>
                            </div>
                        </div>
                    ))
                    .reverse()}
        </div>
    )
}

export default ArticleList
