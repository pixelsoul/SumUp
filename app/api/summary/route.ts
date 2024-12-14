import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const apiUrl = process.env.RAPIDAPI_URL_02

    console.log("API URL:", apiUrl)

    if (!apiUrl) {
        return NextResponse.json({ error: "API URL is not configured" }, { status: 500 })
    }

    type Options = {
        method: string
        headers: {
            "Content-Type": string
            "X-RapidAPI-Key": string
            "X-RapidAPI-Host": string
        }
        body: string
    }

    try {
        const { url } = await req.json()

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 })
        }

        const options: Options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
                "X-RapidAPI-Host": process.env.RAPIDAPI_HOST_02 || "",
            },
            body: JSON.stringify({
                url: url,
            }),
        }

        const response = await fetch(apiUrl, options)

        if (!response.ok) {
            throw new Error("Failed to fetch data from API")
        }

        const data = await response.json()
        console.log("Data from the API:", data)
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
