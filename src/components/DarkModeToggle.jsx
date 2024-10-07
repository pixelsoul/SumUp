import { useState, useEffect } from "react"
import { FaMoon, FaSun } from "react-icons/fa"

const Toggle = () => {
    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        localStorage.setItem("darkMode", !darkMode)
    }

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode)
    }, [darkMode])

    return (
        <div className={darkMode ? "dark" : ""}>
            <button onClick={toggleDarkMode}>{darkMode ? <FaSun /> : <FaMoon />}</button>
        </div>
    )
}

export default Toggle
