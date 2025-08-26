module.exports = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./components/ui/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['var(--font-heading)', 'serif'],
                script: ['var(--font-script)', 'cursive'],
                body: ['var(--font-body)', 'sans-serif'],
            },
        },
    },
};