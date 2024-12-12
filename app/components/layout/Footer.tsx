const siteName = process.env.NEXT_PUBLIC_SITE_NAME

const Footer = () => {
    return (
        <footer className=" py-4 flex flex-col items-center justify-center mt-auto">
            <p>&copy; 2024 {siteName}</p>
        </footer>
    )
}

export default Footer
