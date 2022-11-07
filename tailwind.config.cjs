/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'black-scene' : '#f4f5fe',
        'black-nav' : '#ecedf6',
        'top-card' : '#2F955E',
        'bottom-card' : '#91D468',
        'wheat' : '#f5deb3'
      },
      gridTemplateColumns:{
        'home' : '70% 28%',
        'card' : '23% auto 22%',
        'template' : '45% auto',
        '1/4' : ' 18% 80%',
        '2/3' : '38% 60%'
      },
      gridTemplateRows:{
        '60-40': '60% 38%',
        '4/1': '73% 27%',
        '1/9': '8% 90%',

      },
      height:{
        '34': '8.5rem',
        '70vh': '70vh',
        '90vh': '90vh',
        '97vh': '97vh',
      },
      minHeight: {
        '34': '7.5rem',
      },
      maxHeight: {
        '97vh' :'97vh'
      }
    
    },
  },
  plugins: [],  
}