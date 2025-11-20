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
        dark: {
          bg: '#000000',
          card: '#0a0a0a',
          cardHover: '#1a1a1a',
          border: '#333333',
          text: '#ffffff',
          textMuted: '#cccccc',
        },
        crypto: {
          primary: '#FF6B35',
          primaryHover: '#FF4500',
          secondary: '#FFA500',
          accent: '#FF8C00',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-crypto': 'linear-gradient(135deg, #FF4500 0%, #FFA500 100%)',
      },
    },
  },
  plugins: [],
}
export default config
