/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'Josefin': ['"Josefin Sans"', 'sans-serif'],
    },
    extend: {
      colors:{
        'black-scene' : '#f4f5fe',
        'black-nav' : '#ecedf6',
        'top-card' : '#2F955E',
        'bottom-card' : '#91D468',
        'wheat' : '#f5deb3',
        'purple' : '#6B7BFC',
        'state-Activo' : '#8AC3A4',
        'state-Desactivado' : '#E1495B'
      },
      gridTemplateColumns:{
        'home' : '70% 28%',
        'card' : '23% auto 22%',
        'template' : '45% auto',
        'settings' : '28% 70%',
        '1/4' : ' 18% 80%',
        '2/3' : '38% 60%',
        '5/2/2' : '60% 18% 19%',
        '2/5/2' : '18% 58% 18%',
      },
      gridTemplateRows:{
        '60-40': '60% 36%',
        '4/1': '73% 27%',
        '1/9': '8% 90%',
      },
      width:{
        '108' : '30rem'
      },
      height:{
        '34': '8.5rem',
        '105': '8.5rem',
        '108' :'30rem',
        '100' :'25rem',
        '70vh': '70vh',
        '90vh': '90vh',
        '97vh': '97vh',
      },
      minHeight: {
        '8': '2rem',
        '34': '7.5rem',
        '98': '26rem'
      },
      maxHeight: {
        '108' :'30rem',
        '97vh' :'97vh'
      }
    
    },
  },
  plugins: [],  
}