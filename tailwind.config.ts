import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B15EFF',
        secondary: '#9032E8',
        'secondary-opacity': 'rgba(177, 94, 255, 0.1)',
      },
      height: {
        navBar: '56px',
        'navBar-calc': 'calc(100vh - 56px)',
      },
      padding: {
        navBar: '56px',
      },
      boxShadow: {
        drop: '0px -4px 4px rgba(0, 0, 0, 0.04)',
      },
      zIndex: {
        header: '10',
        player: '10',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
    },
  },
  plugins: [],
}
export default config
