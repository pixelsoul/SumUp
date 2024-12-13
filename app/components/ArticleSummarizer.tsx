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

    const updateLocalStorage = (articles: Articles) => {
        localStorage.setItem("articles", JSON.stringify(articles))
    }

    const handleSubmit = async () => {
        setError(null)
        setLoading(true)

        try {
            if (checkIfArticleExists(url)) {
                toast("Article already exists", {
                    icon: "",
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
                throw new Error(res.statusText)
            }

            const data: ApiResponse = await res.json()

            if (data?.summary) {
                const newArticle = { url: url, summary: data.summary }
                setArticles((prevArticles) => {
                    if (prevArticles) {
                        return [...prevArticles, newArticle]
                    } else {
                        return [newArticle]
                    }
                })

                setSelectedArticle(newArticle)
                setError(null)
            }
        } catch (error) {
            setError("Error while fetching article")
            throw new Error("Error while fetching article")
        } finally {
            setLoading(false)
        }
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

    useEffect(() => {
        if (loading) {
            toast.promise(
                handleSubmit(),
                {
                    loading: "Loading...",
                    success: "Done!",
                    error: "Error while fetching article",
                },
                {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                }
            )
        }
    }, [loading])

    // useEffect(() => {
    //     if (error) {
    //         toast.error("Error while fetching article", {
    //             icon: "",
    //             style: {
    //                 borderRadius: "10px",
    //                 background: "#333",
    //                 color: "#fff",
    //             },
    //         })
    //     }
    // }, [error])

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
