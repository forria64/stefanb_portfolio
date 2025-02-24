// File: src/stefanb_portfolio_frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx,mdx}',
    './components/**/*.{js,jsx,mdx}',
    './app/**/*.{js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#0e0e0e',   
          secondary: '#151515', 
          tertiary: '#1a1a1a',  
          fourth: '#7e7e7e',    
        },
        accent: '#d76a4d',       
      },
      fontWeight: {
        DEFAULT: '100',
      },
    },
  },
  plugins: [],
};

