/** @type {import("tailwindcss").Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                purple: {
                    DEFAULT: "#7f56da",
                },
                green: {
                    DEFAULT: "#1e6b49",
                },
                remy: {
                    DEFAULT: "#f5dcd4",
                },
                arsenic: {
                    DEFAULT: "#3a3e49",
                },
                grey: {
                    storm: "#7a808c",
                },
            },
            fontFamily: {
                title: ["Montserrat", "sans-serif"],
            },
        },
    },
    prefix: "tw-",
    plugins: [],
};
