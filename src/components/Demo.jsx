import { useState, useEffect, useRef } from "react"
import autoAnimate from "@formkit/auto-animate"

import { copy, linkIcon, loader, tick } from "../assets"
import { useLazyGetSummaryQuery } from "../services/article"

const Demo = () => {
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    })
    const [allArticles, setAllArticles] = useState([])
    const [copied, setCopied] = useState("")

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"))

        if (articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { data } = await getSummary({
            articleUrl: article.url,
        })

        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary }
            const updatedAllArticles = [...allArticles, newArticle]

            setArticle(newArticle)
            setAllArticles(updatedAllArticles)

            localStorage.setItem("articles", JSON.stringify(updatedAllArticles))
        }
    }

    const handleCopy = (copyUrl) => {
        setCopied(copyUrl)
        navigator.clipboard.writeText(copyUrl)
        setTimeout(() => setCopied(false), 3000)
    }

    return (
        <section className="mt-16 w-full max-w-xl">
            <div className="flex flex-col w-full gap-2">
                <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
                    <img src={linkIcon} alt="link_icon" className="absolute left-0 my-2 ml-3 w-5" />
                    <input
                        type="url"
                        name="article_url"
                        placeholder="Enter a URL"
                        value={article.url}
                        onChange={(e) => setArticle({ ...article, url: e.target.value })}
                        required
                        className="url_input"
                    />
                    <button type="submit" className="submit_btn absolute right-0">
                        Go
                    </button>
                </form>

                {/* Browse History */}
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                    {allArticles
                        .map((item, index) => (
                            <div
                                key={`link-${index}`}
                                onClick={() => setArticle(item)}
                                className="link_card">
                                <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                                    <img
                                        src={copied === item.url ? tick : copy}
                                        alt={copied === item.url ? "tick_icon" : "copy_icon"}
                                        className="w-[40%] h-[40%] object-contain"
                                    />
                                </div>
                                <p className="flex-1 font-satoshi text-orange-600 font-medium text-sm truncate">
                                    {item.url}
                                </p>
                            </div>
                        ))
                        .reverse()}
                </div>

                {/* Results */}
                <div className="my-10 max-w-full flex justify-center items-center">
                    {isFetching ? (
                        <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
                    ) : error ? (
                        <p className="font-inter font-bold text-black text-center">
                            Well, that wasn&apos;t supposed to happen...
                            <br />
                            <span className="font-satoshi font-normal text-gray-700">
                                {error?.data?.error}
                            </span>
                        </p>
                    ) : (
                        article.summary && (
                            <div className="flex flex-col gap-3  rounded-lg">
                                <h2 className="font-satoshi font-bold text-zinc-600 text-xl">
                                    Article Summary
                                </h2>
                                <div className="rounded-xl border border-gray-400 bg-white/20  backdrop-blur p-4">
                                    <p className="font-inter font-medium text-sm text-zinc-800 leading-6">
                                        {article.summary}
                                    </p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    )
}

export default Demo
