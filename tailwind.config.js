/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bg2: "var(--bg2)",
        card: "var(--card)",
        tx: "var(--tx)",
        mut: "var(--mut)",
        b1: "var(--b1)",
        b2: "var(--b2)",
        v: "var(--v)",
        wa: "#25d366",
      },
      borderColor: { DEFAULT: "var(--bd)", bd: "var(--bd)" },
      fontFamily: {
        display: ["var(--font-sora)", "Inter", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
