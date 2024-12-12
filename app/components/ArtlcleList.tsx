import { useState } from "react"
import { FaRegCopy } from "react-icons/fa"
import { FaCheck } from "react-icons/fa"
import { Articles, Article } from "@/types/articles"

interface ArticlesInterface {
    articles: Articles | undefined
    selectedArticle: (article: Article) => void
}

const ArticleList = ({ articles, selectedArticle }: ArticlesInterface) => {
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
                            className="p-3 flex flex-row justify-center items-center bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 gap-3 rounded-md cursor-pointer">
                            <div
                                datatype=""
                                className="text-neutral-950 dark:text-neutral-50 px-0 py-3 bg-neutral-200 dark:bg-neutral-950 flex items-center justify-center rounded-full text-4xl"
                                onClick={() => handleCopy(article.url)}>
                                {copied === article.url ? (
                                    <FaCheck className="w-[40%] h-[40%] object-contain" />
                                ) : (
                                    <FaRegCopy className="w-[40%] h-[40%] object-contain" />
                                )}
                            </div>
                            <p className="flex-1 font-medium text-sm truncate">{article.url}</p>
                        </div>
                    ))
                    .reverse()}
        </div>
    )
}

export default ArticleList
