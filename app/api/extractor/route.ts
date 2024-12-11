import { NextRequest, NextResponse } from "next/server"

const apiUrl: string | undefined = process.env.ARTICLE_EXTRACTOR_API_URL

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json()

        const params = new URLSearchParams({
            url: url,
            lang: "en",
            engine: "2",
        })

        const extractorApi = `${process.env.ARTICLE_EXTRACTOR_API_URL}?${params.toString()}`

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 })
        }

        const response = await fetch(extractorApi!, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
                "X-RapidAPI-Host": process.env.RAPIDAPI_HOST || "",
            },
            // body: JSON.stringify({ url: url, lang: "en", engine: "2" }),
        })

        if (!response.ok) {
            throw new Error("Failed to fetch data from API")
        }

        const data = await response.json()
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        console.error("Error in API:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

// import type { NextApiRequest, NextApiResponse } from "next"

// type ResponseData = {
//     message: string
// }

// export async function POST(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
//     res.status(200).json({ message: "Hello from Next.js!" })
// }
