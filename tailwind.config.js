/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        bg: "#489AEE",
        bgLight: "#C3DAF9",
        bgxLight: "#E3EFFF",
        section: "#F1F1F4",
        heading: "#3889DD",
        button: "#286DB5",
        gn: "#27AE60",
        yellow: "#f39f32",
        orang: "#FFAA00",
      },
      colors: {
        text: "#556b86",
        heading: "#0D6EFD",
        blueLight: "#0096FF",
        gn: "#27AE60",
        cLight: "#C3DAF9",
        yellow: "#f39f32",
        orang: "#FFAA00",
        menu: "#5C95C5",
        sideMenu: "#FFFFFF",
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
    gridTemplateColumns: {
      sidebar: "300px auto", // 👈 for sidebar layout. adds grid-cols-sidebar class
    },
    gridTemplateRows: {
      header: "50px auto", // 👈 for the navbar layout. adds grid-rows-header class
    },
  },
  plugins: [],
};
