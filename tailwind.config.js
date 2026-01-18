/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#F5F7FA',
        dark: {
          bg: '#0F172A', // Deep slate blue
          surface: '#1E293B', // Slate 800
          surface2: '#334155', // Slate 700
          text: '#F1F5F9', // Slate 100
          text2: '#CBD5E1', // Slate 300
          text3: '#94A3B8', // Slate 400
          border: '#334155', // Slate 700
        },
      },
    },
  },
  plugins: [],
}

