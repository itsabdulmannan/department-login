/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#353372",
        secondary: "#f29349",
        fadeBg: "#f7f7f7",
      },
      colors: {
        primaryText: "#353372",
        secondaryText: "#f29349",
        darkText: "#212529",
      },
      boxShadow: {
        custom: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      container: {
        center: true,
        padding: "20px 30px", 
      },

    },
  },
  plugins: [],
};
