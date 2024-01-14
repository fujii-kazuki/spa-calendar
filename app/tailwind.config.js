/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{js,jsx}'],
  content: [],
  theme: {
    fontFamily: {
      'ZenKurenaido': ['ZenKurenaido']
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem'
      }
    }
  },
  plugins: [],
}

