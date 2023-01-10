const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            colors: {
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
            },
            fontFamily: {
                'sans': ['Century Gothic', ...defaultTheme.fontFamily.sans],
                'serif': ['Proxima Nova', ...defaultTheme.fontFamily.sans],
            },
            spacing: {
                '240%': '240%',
                '200%': '200%',
                '170%': '170%',
                '140%': '140%',
                '160%': '160%',
                '150%': '150%',
                '100%': '100%',
                '90%': '90%',
                '80%': '80%',
                '70%': '70%',
                '60%': '60%',
                '50%': '50%',
                '45%': '45%',
                '40%': '40%',
                '35%': '35%',
                '30%': '30%',
                '25%': '25%',
                '20%': '20%',
                '10%': '10%',
            },
        }
    },
    plugins: [
        require('@headlessui/tailwindcss')],
    corePlugins: {
        preflight: false,
    }
}
