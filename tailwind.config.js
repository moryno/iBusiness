/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        bg: "#032d60",
        bgLight: "#C3DAF9",
        light: "#eeedec",
        bgxLight: "#E3EFFF",
        button: "#0D6EFD",
        bgxxLight: "#f3f3f3",
        section: "#F1F1F4",
        sidebarHeading: "#fff",
        sidebarBg: "#eeedec",
        formColor: "#fff",
        gn: "#27AE60",
        yellow: "#f39f32",
        orang: "#FFAA00",
        modal: "#C8C8C8",
        menuBg: "#fff",
      },
      colors: {
        text: "#556b86",
        heading: "#0D6EFD",
        blueLight: "#0096FF",
        darkBlue: "#0176d3",
        gn: "#27AE60",
        cLight: "#C3DAF9",
        yellow: "#f39f32",
        orang: "#FFAA00",
        menu: "#286DB5",
        menuText: "#282828",
        sidebarHeading: "#282828",
        sideColor: "#282828",
        navColor: "#FFFFFF",
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
      sidebar: "300px auto",
    },
    gridTemplateRows: {
      header: "50px auto",
    },
  },
  plugins: [],
};
