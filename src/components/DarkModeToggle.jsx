import { useState, useEffect } from "react"
import { FaMoon, FaSun } from "react-icons/fa"

const Toggle = () => {
    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        localStorage.setItem("darkMode", darkMode ? "false" : "true")
    }

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode)
    }, [darkMode])

    useEffect(() => {
        const storedDarkMode = localStorage.getItem("darkMode")
        if (storedDarkMode === "true") {
            setDarkMode(true)
        } else if (storedDarkMode === "false") {
            setDarkMode(false)
        } else {
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setDarkMode(true)
            } else {
                setDarkMode(false)
            }
        }
    }, [])

    return (
        <div className={darkMode ? "dark" : ""}>
            <button onClick={toggleDarkMode}>{darkMode ? <FaSun /> : <FaMoon />}</button>
        </div>
    )
}

export default Toggle
