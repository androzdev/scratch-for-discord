module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false,
    theme: {
		extend: {
			fontFamily: {
				sans: ["Ubuntu", "sans-serif"],
			},
			colors: {
				night: "#121830"
			}
		}
    },
    variants: {
        extend: {}
    },
	plugins: [require("@tailwindcss/forms")({ strategy: "class" })]
};
