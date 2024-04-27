/** @type {import("tailwindcss").Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#008ECC",
                },
                secondary: {},
                tertiary: {},

                white: {
                    quartz: "#f5f5fc",
                    DEFAULT: "#f5f5fc",
                },
                blue: {
                    "sky-blue": "#90d7ee",
                    DEFAULT: "#90d7ee",
                },
                gold: {
                    DEFAULT: "#ffcf4b",
                },
                purple: {
                    DEFAULT: "#754f9d",
                    studio: "#754f9d",
                    medium: "#7f56da",
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
                algreya: ["Alegreya Sans", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
                tajawal: ["Tajawal", "sans-serif"],
                cairo: ["Cairo", "sans-serif"],
            },
        },
    },
    prefix: "tw-",
    plugins: [],
};
