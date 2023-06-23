/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        // bg: "#0096FF",
        bg: "#006FC9",
        bgSection: "#006FC9",
        darkBlue: "#0176d3",
        bgDark: "#3B96DD",
        bgLight: "#C3DAF9",
        light: "#eeedec",
        bgxLight: "#E3EFFF",
        card: "#F3F3F3",
        button: "#0D6EFD",
        menuButton: "#0176d3",
        buttonBlue: "#0088ff",
        userProfileBg: "#0088ff",
        userProHover: "#F1F1F4",
        buttonBg: "#1B6EC2",
        bgxxLight: "#f3f3f3",
        section: "#F1F1F4",
        sidebarHeading: "#489AEE",
        statusBar: "#489AEE",
        sidebarBg: "#fff",
        formColor: "#fff",
        gn: "#27AE60",
        yellow: "#f39f32",
        orang: "#FFAA00",
        modal: "#C8C8C8",
        menuBg: "#fff",
        formHeading: "#006FC9",
        formTitle: "#006FC9",
        dropPointer: "#fff",
        bgDropDown: "#fff",
        bb: "#7AB8EB",
        portal: "#7F7F7F",
      },
      colors: {
        text: "#556b86",
        headingBlue: "#0088ff",
        buttonHover: "#0267c1",
        blueLight: "#0096FF",
        darkBlue: "#0176d3",
        gn: "#27AE60",
        cLight: "#C3DAF9",
        yellow: "#f39f32",
        orang: "#FFAA00",
        menu: "#286DB5",
        menuText: "#0176d3",
        menuHeading: "#282828",
        label: "#0D0D0D",
        heading: "#fff",
        sideColor: "#282828",
        statusBar: "#fff",
        navColor: "#FFFFFF",
        col: "#006FC9",
        formHeadingColor: "#ffffff",
        dropDown: "#282828",
      },
      boxShadow: {
        "3xl": "0 8px 25px -10px rgba(0, 0, 0, 1)",
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
      xxl: "1400px",
      xxxl: "1600px",
    },
    gridTemplateColumns: {
      sidebar: "300px auto",
    },
    gridTemplateRows: {
      header: "40px auto",
    },
  },
  plugins: [],
};
