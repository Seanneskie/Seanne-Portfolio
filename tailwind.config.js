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
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
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
