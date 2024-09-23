/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                satoshi: ["Satosho", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
}
