export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#f28e44",
        "primary-hover": "#e67e34",

        "dark-primary": "#E6613E",
        "dark-primary-hover": "#ff7654",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};
