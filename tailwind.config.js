/** @type {import("tailwindcss").Config} */
export default {
    /*
    --theme-color-white: #f5f5fc;
    --theme-color-blue: #90d7ee;
    --theme-color-gold: #ffcf4b;
    --theme-color-purple: #754f9d;

    --theme-color-primary: var(--theme-color-darkblue);
    --theme-color-secondary: var(--theme-color-blue);
    --theme-color-tertiary: #f5dcd4;
    --theme-color-white: #ffffff;
    --theme-color-arsenic: #3a3e49;
    --theme-color-grey: #7a808c;
    --theme-color-white-powder: #fdfcfa;
    */

    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
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
            },
        },
    },
    prefix: "tw-",
    plugins: [],
};
