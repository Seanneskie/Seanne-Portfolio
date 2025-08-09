module.exports = {
  content: ['./**/*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        obsidian: 'var(--obsidian)',
        charcoal: 'var(--charcoal)',
        coal: 'var(--coal)',
        onyx: 'var(--onyx)',
        sable: 'var(--sable)',
        text: 'var(--text)',
        'text-dark': 'var(--text-dark)',
        'text-hover': 'var(--text-hover)',
        primary: '#007bff',
        secondary: '#6c757d',
        'nav-active': '#495057',
        'table-dark': '#454d55',
        'selected-row': '#d4edda',
        'selected-text': '#155724',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      width: {
        '5p': '5%',
        '10p': '10%',
        '15p': '15%',
        '20p': '20%',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-down': 'fade-down 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
