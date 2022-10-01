const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        colors: {
            primary: 'rgb(var(--color-primary) / <alpha-value>)',
        },
        extend: {
            fontFamily: {
                'sans': ['Proxima Nova', ...defaultTheme.fontFamily.sans],
            },
        }
    },
    plugins: [],
}