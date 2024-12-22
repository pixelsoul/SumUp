export type Article = {
    title: string
    description: string
    url: string
    md: string
    image?: string | undefined
    content?: string | undefined
}

export type Articles = Article[]
