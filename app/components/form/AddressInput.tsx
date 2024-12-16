import { FormEvent } from "react"
import { IoLink } from "react-icons/io5"
import { Inter } from "next/font/google"

const inter = Inter({
    subsets: ["latin"],
})

interface AddressInputProps {
    value: string
    setValue: (value: string) => void
    placeholder?: string
    onSubmit: () => void
    loading?: boolean
}

const AddressInput = ({ value, setValue, placeholder, onSubmit, loading }: AddressInputProps) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit()
    }

    return (
        <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
            <IoLink className="absolute left-0 my-2 ml-3 w-5" />
            <input
                type="url"
                name="article_url"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder || "Enter a URL"}
                autoComplete="off"
                required
                disabled={loading}
                className="block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-neutral-700 py-2.5 pl-10 pr-12 text-sm shadow-lg font-medium focus:border-neutral-400 focus:dark:border-neutral-500 focus:outline-none focus:ring-0"
            />
            <button
                type="submit"
                className={`absolute right-0 px-4 text-sm uppercase bg-neutral-200 dark:bg-neutral-800 h-full rounded-r-md hover:bg-neutral-300 dark:hover:bg-neutral-600 focus:outline-none focus:ring-0 ${
                    loading ? "cursor-not-allowed" : ""
                } font-${inter}`}>
                Go
            </button>
        </form>
    )
}

export default AddressInput
