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
        'card' : '#E1FAD2'
      },
      gridTemplateColumns:{
        'home' : '70% 28%',
        'card' : '23% auto 22%',
      },
      gridTemplateRows:{
        '60-40': '60% 38%;',
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