import { Article } from "@/types/articles"

interface Summary {
    article: Article | undefined
}

const ArticleSummary = ({ article }: Summary) => {
    const formatSummary = (summary: string) => {
        const lines = summary.split("\n").filter((line) => line.trim() !== "") // Remove empty lines
        return (
            <ul className="flex flex-col gap-3">
                {lines.map((line, index) => (
                    <li className="p-0" key={index}>
                        {line}
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <section className="flex flex-col gap-4 items-left p-3 md:p-8 bg-neutral-100 dark:bg-neutral-900 rounded-lg dark:border-neutral-600 border">
            <h2 className="md:text-2xl text-start font-bold">{article?.title}</h2>
            <p className="text-neutral-500 dark:text-neutral-500 text-start">
                {article?.description}
            </p>

            <div className="flex flex-col md:flex-row gap-4">
                <img
                    className="md:w-1/3 h-64 object-cover rounded-lg border"
                    src={`${article?.image}`}
                    alt=""
                />
                {article && <span>{formatSummary(article?.md)}</span>}
            </div>
        </section>
    )
}

export default ArticleSummary
