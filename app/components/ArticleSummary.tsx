import { Article } from "@/types/articles"

interface Summary {
    article: Article | undefined
    error?: string | null
    loading?: boolean
}

const ArticleSummary = ({ article, error = null, loading = false }: Summary) => {
    const formatSummary = (summary: string) => {
        const lines = summary.split("\n").filter((line) => line.trim() !== "") // Remove empty lines
        return (
            <ul className="flex flex-col gap-3">
                {lines.map((line, index) => (
                    <li className="p-3 rounded-lg border" key={index}>
                        {line}
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <section className="flex flex-col items-left p-3 md:p-8 bg-neutral-100 dark:bg-neutral-900 rounded-lg dark:border-neutral-600 border">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : article?.summary ? (
                <div className="">
                    <h2 className="text-2xl font-bold mb-4">Summary</h2>
                    <div>{formatSummary(article.summary)}</div>
                </div>
            ) : null}
        </section>
    )
}

export default ArticleSummary
