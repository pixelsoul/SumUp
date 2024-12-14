import { useState, useEffect } from "react"
import AddressInput from "./form/AddressInput"
import ArticleList from "@/app/components/ArtlcleList"
import ArticleSummary from "@/app/components/ArticleSummary"
import { Articles, Article } from "@/types/articles"
import toast from "react-hot-toast"
import { Separator } from "@/components/ui/separator"

type ApiResponse = {
    error?: string
    [key: string]: any
}

const ArticleSummarizer = () => {
    const [url, setUrl] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [articles, setArticles] = useState<Articles>()
    const [selectedArticle, setSelectedArticle] = useState<Article>()

    const handleSubmit = async () => {
        setError(null)
        setLoading(true)

        const toastId = toast.loading("Fetching Article...", {
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
            },
        })

        try {
            if (checkIfArticleExists(url)) {
                toast.dismiss(toastId)
                toast.error("Article already exists", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                })
                return
            }

            const res = await fetch("/api/extractor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            })

            if (!res.ok) {
                setError(res.statusText)
                toast.error("Error while fetching article", { id: toastId })
                throw new Error(res.statusText)
            }

            const data: ApiResponse = await res.json()

            if (data) {
                const newArticle = {
                    title: data.title,
                    description: data.description,
                    url: data.url,
                    md: data.md,
                    image: data.image,
                }

                setArticles((prevArticles) => {
                    if (prevArticles) {
                        return [...prevArticles, newArticle]
                    } else {
                        return [newArticle]
                    }
                })

                setSelectedArticle(newArticle)
                setError(null)
                toast.success("Article fetched successfully!", { id: toastId })
            }
        } catch (error) {
            setError("Error while fetching article")
            toast.error("Error while fetching article", { id: toastId })
        } finally {
            setLoading(false)
        }
    }

    const updateLocalStorage = (articles: Articles) => {
        localStorage.setItem("articles", JSON.stringify(articles))
    }

    // check if article already exists
    const checkIfArticleExists = (url: string) => {
        if (articles) {
            return articles.some((article) => article.url === url)
        }
        return false
    }

    useEffect(() => {
        if (articles) {
            setSelectedArticle(articles[articles.length - 1])
            updateLocalStorage(articles)
        }
    }, [articles])

    useEffect(() => {
        const storedArticles = localStorage.getItem("articles")
        if (storedArticles) {
            setArticles(JSON.parse(storedArticles))
        }
    }, [])

    return (
        <div className="flex flex-col gap-5">
            <section>
                <AddressInput
                    value={url}
                    setValue={setUrl}
                    placeholder="Enter a URL"
                    onSubmit={handleSubmit}
                />
            </section>
            {articles && articles.length > 0 && (
                <section>
                    <ArticleList
                        articles={articles}
                        selectedArticle={setSelectedArticle}
                        selected={selectedArticle}
                    />
                </section>
            )}
            <Separator />
            {selectedArticle && (
                <section>
                    <ArticleSummary article={selectedArticle} />
                </section>
            )}
        </div>
    )
}

export default ArticleSummarizer
