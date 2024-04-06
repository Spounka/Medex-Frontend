/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                purple: {
                    DEFAULT: "#7f56da",
                },
                green: {
                    default: "#1e6b49",
                },
                remy: {
                    default: "#f5dcd4",
                },
                arsenic: {
                    default: "#3a3e49",
                },
                grey: {
                    storm: "#7a808c",
                },
            },
        },
    },
    prefix: 'tw-',
    plugins: [],
};
