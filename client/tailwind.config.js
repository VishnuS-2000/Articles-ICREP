/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'mobile' : '250px',
      'tablet' : '600px',
      'desktop' : '1280px'
    },
    extend: {
      'colors':{
        'primary':'#14274E',
        'secondary':'#292929',
        'tertiary':'#394867',
        'quarternary':'#757575',
        'line':'#E6E6E6'
        
      },
      fontFamily:{
        'poppins':`'Poppins', sans-serif`
      },
    }},
  plugins: []}
