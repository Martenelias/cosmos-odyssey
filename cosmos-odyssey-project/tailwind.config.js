import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      fontSize: {
        xs: '10px',
        sm: '12px',
        base: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '40px',
        '3xl': '48px',
        '4xl': '56px',
        '5xl': '64px',
        '6xl': '72px',
      },
      fontFamily: {
        'source-sans-3': ['"Source Sans 3"', 'sans-serif'],
        'exo-2': ['"Exo 2"', 'sans-serif'],
        'orbitron': ['"Orbitron"', 'sans-serif'],
      },
      colors: {
        'primary': {
          500: '#7A0BC0',
          700: '#570888',
          900: '#330551',
        },
        'secondary': {
          500: '#FA58B6',
          700: '#B23E81',
          900: '#69254C',
        },
        'tertiary': {
          500: '#270082',
          700: '#1C005C',
          900: '#100037',
        },
        'backgroundLight': {
          200: '#F9F9FF',
          500: '#F2F2FF',
          700: '#ACACB5',
          900: '#66666B',
        },
        'backgroundDark': {
          500: '#1A1A40',
          700: '#12122D',
          900: '#0B0B1B',
        },
      },
    },
  },
  plugins: [
    flowbite.plugin()
  ],
};
