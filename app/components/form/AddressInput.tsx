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
}

const AddressInput = ({ value, setValue, placeholder, onSubmit }: AddressInputProps) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit() // Call the parent-provided onSubmit function
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
                className="url_input"
            />
            <button type="submit" className={`absolute right-0 px-3 ${inter}`}>
                Go
            </button>
        </form>
    )
}

export default AddressInput
