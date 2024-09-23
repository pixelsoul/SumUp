import { logo } from "../assets"

const Hero = () => {
    return (
        <header className="w-full flex justify-center items-center flex-col">
            <nav className="flex justify-between items-center w-full mb-10 pt-3">
                <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
                <button
                    type="button"
                    onClick={() => window.open("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")}
                    className="black_btn">
                    Github
                </button>
            </nav>
            <h1 className="head_text">
                Summarize Articles with <br className="max-md:hidden" />{" "}
                <span className="orange_gradient">Artificial Intelligence</span>
            </h1>
            <h2 className="desc">
                Simplify your reading experience with AI-powered article summarization. Get a
                concise summary of any article in seconds.
            </h2>
        </header>
    )
}

export default Hero