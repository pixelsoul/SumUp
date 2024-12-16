import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const apiUrl = process.env.RAPIDAPI_URL_01

    if (!apiUrl) {
        return NextResponse.json({ error: "API URL is not configured" }, { status: 500 })
    }

    try {
        const { url } = await req.json()

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 })
        }

        const params = new URLSearchParams({
            url: url,
        })

        const extractorApi = `${apiUrl}?${params.toString()}`

        const response = await fetch(extractorApi, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
                "X-RapidAPI-Host": process.env.RAPIDAPI_HOST_01 || "",
            },
        })

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch data from API" },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        console.error("Error in API:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
