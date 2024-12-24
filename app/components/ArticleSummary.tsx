import { Article } from "@/types/articles"

interface Summary {
    article: Article | undefined
}

const ArticleSummary = ({ article }: Summary) => {
    // format text and remove html tags and replace them with markdown
    const formatText = (text: string) => {
        // return text.replace(/<[^>]*>?/gm, " ")
        return text
    }

    const createMarkup = (html: string) => {
        return { __html: html }
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
                {article && <span>{article?.md}</span>}
            </div>

            <div className="flex flex-row gap-4">
                <a
                    href={article?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline">
                    Source
                </a>
            </div>

            <article>
                {article?.content && (
                    <details>
                        <summary className="hover:underline cursor-pointer mb-4">Read more</summary>
                        <div dangerouslySetInnerHTML={createMarkup(formatText(article?.content))} />
                    </details>
                )}
            </article>
        </section>
    )
}

export default ArticleSummary
