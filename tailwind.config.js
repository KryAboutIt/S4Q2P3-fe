export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f28e44",
        "primary-dark": "#e67e34",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};
