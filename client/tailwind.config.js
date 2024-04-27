/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "768px",
      "2sm": { max: "768px" },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("@tailwindcss/line-clamp"),
    // ...
  ],
};
