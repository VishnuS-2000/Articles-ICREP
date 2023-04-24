/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    screens:{
      'mobile' : '250px',
      'tablet' : '600px',
      'desktop' : '1280px',
      'print': { 'raw': 'print' },
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
      keyframes:{
        'image-exit':{
          '20%,100%':{
            'opacity':'0',
            'transform': 'translate(-520px, 0)'
          }},
          'image-enter':{
            '0%':{
              'opacity':0
            },
            '100%':{
              'opacity':'1',
          
            }
          }
    
     
      
    }
    }},
  plugins: []}
