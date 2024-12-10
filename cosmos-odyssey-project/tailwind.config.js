import flowbite from 'flowbite-react/tailwind';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
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
          500: '#61A1BA',
          700: '#457284',
          900: '#29444E',
        },
        'secondary': {
          500: '#0A4A71',
          700: '#073550',
          900: '#041F2F',
        },
        'tertiary': {
          50: '#EFEFF1',
          200: '#B5B4C0',
          500: '#5F5B76',
          700: '#434154',
          900: '#282632',
        },
        'background': {
          500: '#020D13',
          700: '#01090D',
          900: '#010508',
        },
      },
    },
  },
  plugins: [
    flowbite.plugin()
  ],
};
