import Toggle from "./DarkModeToggle"

const Hero = () => {
    return (
        <header className="w-full flex justify-center items-center flex-col">
            <nav className="flex justify-between items-center w-full mb-10 pt-3">
                {/* <img src={logo} alt="sumz_logo" className="w-28 object-contain" /> */}
                <h1 className="font-satoshi text-3xl font-bold">SumUp</h1>
                {/* <button
                    type="button"
                    onClick={() => window.open("https://github.com/pixelsoul/ai-summarizer")}
                    className="black_btn">
                    Github
                </button> */}
                <Toggle />
            </nav>
            <h1 className="text-6xl text-center font-extrabold">
                Summarize Articles with <br className="max-md:hidden" />{" "}
                <span className="orange_gradient">Artificial Intelligence</span>
            </h1>
            <h2 className="desc">
                Simplify your reading experience with AI-powered article summarization.
            </h2>
        </header>
    )
}

export default Hero
