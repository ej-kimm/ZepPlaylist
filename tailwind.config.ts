import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      desktop: '720px',
      'desktop-xl': '1100px',
    },
    extend: {
      colors: {
        primary: '#B15EFF',
        secondary: '#9032E8',
        'secondary-opacity': 'rgba(177, 94, 255, 0.1)',
      },
      height: {
        navBar: '56px',
        'navBar-calc': 'calc(100vh - 56px)',
        'navBar-desktop': '66px',
        'navBar-desktop-calc': 'calc(100vh - 66px - 66px)',
        player: '60px',
        'player-desktop': '72px',
      },
      padding: {
        navBar: '56px',
        'navBar-desktop': '66px',
        player: '60px',
        'player-desktop': '72px',
      },
      spacing: {
        navBar: '56px',
      },
      boxShadow: {
        drop: '0px -4px 4px rgba(0, 0, 0, 0.04)',
      },
      zIndex: {
        header: '10',
        player: '10',
        'player-modal': '20',
        volume: '30',
        sidebar: '30',
        'bottom-sheet': '40',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      animation: {
        'custom-pulse': 'skeleton-loading 1.5s infinite ease-in-out',
      },
      keyframes: {
        'skeleton-loading': {
          '0%': { backgroundColor: '#e0e0e0' },
          '50%': { backgroundColor: '#f0f0f0' },
          '100%': { backgroundColor: '#e0e0e0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
