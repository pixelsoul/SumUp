"use client"

import { useState, useEffect } from "react"
import { FaRegCopy } from "react-icons/fa"
import { FaCheck } from "react-icons/fa"
import { Articles, Article } from "@/types/articles"
import { RiDeleteBin6Line } from "react-icons/ri"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import CustomAlertDialog from "./AlertDialog"
import { motion, AnimatePresence, useAnimation } from "motion/react"

interface ArticlesInterface {
    articles: Articles | undefined
    selectedArticle: (article: Article) => void
    deletedArticle: (articles: Articles) => void
    selected: Article | undefined
}

const ArticleList = ({
    articles,
    selectedArticle,
    deletedArticle,
    selected,
}: ArticlesInterface) => {
    const [copied, setCopied] = useState<string>()

    const handleCopy = (copyUrl: string) => {
        setCopied(copyUrl)
        navigator.clipboard.writeText(copyUrl)
        setTimeout(() => setCopied(""), 3000)
        toast.success("Article URL copied to clipboard", {
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
            },
        })
    }

    const handleSelectedArticle = (item: Article) => {
        selectedArticle(item)
    }

    const handleDeleteArticle = (item: Article) => {
        if (articles) {
            const newArticles = articles.filter((article) => article.url !== item.url)
            deletedArticle(newArticles)
            toast("Deleted Article", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            })
        }
    }

    return (
        <div className="max-h-72 overflow-y-auto flex flex-col gap-1 py-2 px-2 rounded-lg border shadow-lg ">
            <AnimatePresence>
                {articles &&
                    articles.length > 0 &&
                    articles
                        .map((article, index) => (
                            <motion.div
                                key={`link-${index}`}
                                initial={{ y: -30, opacity: 0 }}
                                animate={{ y: 0, opacity: 100 }}
                                exit={{ y: -30, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut", delay: 0.1 }}
                                onClick={() => handleSelectedArticle(article)}
                                className={`p-3 flex flex-row bg-neutral-50 dark:bg-neutral-900 border gap-3 rounded-md cursor-pointer transition-colors duration-300 ${
                                    article.url === selected?.url
                                        ? "border-orange-500 bg-orange-100 dark:bg-orange-800"
                                        : "border-neutral-200 dark:border-neutral-700"
                                }`}>
                                <div className="w-[50px]">
                                    <Button
                                        className={`text-neutral-950 dark:text-neutral-50 w-[50px] h-[50px]  border border-neutral-400 dark:border-neutral-800 flex items-center justify-center rounded-full text-xl ${
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
                                    </Button>
                                </div>

                                <div className="flex flex-col gap-1 justify-center truncate w-full">
                                    <p className="text-sm truncate">{article.description}</p>
                                    <p className={`text-sm truncate`}>{article.url}</p>
                                </div>

                                <div className="flex flex-col justify-center">
                                    <CustomAlertDialog
                                        trigger={
                                            <Button
                                                name="Delete Button"
                                                className="text-neutral-950 dark:text-neutral-50 hover:dark:text-orange-300 p-3 bg-transparent hover:bg-transparent flex items-center justify-center rounded-full text-sm">
                                                <RiDeleteBin6Line />
                                            </Button>
                                        }
                                        title="Delete Article"
                                        content="Are you sure you want to delete this article?"
                                        action={() => handleDeleteArticle(article)}
                                    />
                                </div>
                            </motion.div>
                        ))
                        .reverse()}
            </AnimatePresence>
        </div>
    )
}

export default ArticleList
