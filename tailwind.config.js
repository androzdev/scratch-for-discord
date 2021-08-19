module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Ubuntu", "sans-serif"]
            },
            colors: {
                gray: {
                    50: "#f4f5f5",
                    100: "#eaeaeb",
                    200: "#cacbcc",
                    300: "#abacad",
                    400: "#6b6d70",
                    500: "#2c2f33",
                    600: "#282a2e",
                    700: "#212326",
                    800: "#1a1c1f",
                    900: "#161719"
                },
                green: {
                    50: "#f7fef9",
                    100: "#eefef3",
                    200: "#d5fce1",
                    300: "#bcfacf",
                    400: "#89f6ab",
                    500: "#57f287",
                    600: "#4eda7a",
                    700: "#41b665",
                    800: "#349151",
                    900: "#2b7742"
                },
                blurple: {
                    50: "#f7f7fe",
                    100: "#eef0fe",
                    200: "#d5d9fc",
                    300: "#bcc1fa",
                    400: "#8a93f6",
                    500: "#5865f2",
                    600: "#4f5bda",
                    700: "#424cb6",
                    800: "#353d91",
                    900: "#2b3177"
                },
                pink: {
                    50: "#fef6fa",
                    100: "#fdecf5",
                    200: "#fad1e7",
                    300: "#f7b5d8",
                    400: "#f17dbb",
                    500: "#eb459e",
                    600: "#d43e8e",
                    700: "#b03477",
                    800: "#8d295f",
                    900: "#73224d"
                },
                red: {
                    50: "#fef6f6",
                    100: "#fdecec",
                    200: "#fbd0d1",
                    300: "#f8b3b5",
                    400: "#f27b7d",
                    500: "#ed4245",
                    600: "#d53b3e",
                    700: "#b23234",
                    800: "#8e2829",
                    900: "#742022"
                },
                yellow: {
                    50: "#fffef7",
                    100: "#fffdef",
                    200: "#fff9d6",
                    300: "#fff5be",
                    400: "#feee8d",
                    500: "#fee75c",
                    600: "#e5d053",
                    700: "#bfad45",
                    800: "#988b37",
                    900: "#7c712d"
                }
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [require("@tailwindcss/forms")({ strategy: "class" })]
};
