/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        customColor: 'hsl(240deg 1.64% 11.96%)',
        customColor2: 'hsl(0deg 0% 21.96%)',
        customColor3: 'hsl(44.9deg 100% 71.96%)',
        customColor4: 'hsl(0deg 0% 84% / 70%)',
        customColor5: 'hsl(0deg 0% 62.35%)',
        navbarBg: 'hsla(240, 1%, 17%, 0.75)',
       customBg:'hsl(44.9deg 100% 65.95% / 30%)',

      },
    },
  },
  plugins: [],
}
