/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        bg: "#0096FF",
        bgLight: "#C3DAF9",
        bgxLight: "#E3ECf7",
        section: "#F1F1F4",
        blue: "#0096FF",
        button: "#0D6EFD",
        gn: "#27AE60",
        yellow: "#f39f32",
        orang: "#FFAA00",
      },
      colors: {
        text: "#556b86",
        heading: "#0D6EFD",
        blue: "#0096FF",
        gn: "#27AE60",
        yellow: "#f39f32",
        orang: "#FFAA00",
      },
      fontSize: {},
      height: {},
      width: {},
    },

    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
