import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A3A2A',
          light: '#2D5A3D',
          dark: '#0F2518',
        },
        accent: {
          DEFAULT: '#C9963A',
          light: '#E8B85A',
          dark: '#A67A2E',
        },
        bg: {
          base: '#FAFAF7',
          section: '#F2F0EB',
          dark: '#1A3A2A',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#5A5A5A',
          muted: '#9A9A9A',
          inverse: '#FAFAF7',
        },
        border: {
          DEFAULT: '#E0DDD6',
          strong: '#C5C2BB',
        },
      },
      fontFamily: {
        heading: ['Noto Serif JP', 'Yu Mincho', 'Hiragino Mincho Pro', 'serif'],
        body: ['Noto Sans JP', 'Hiragino Kaku Gothic Pro', 'Meiryo', 'sans-serif'],
        number: ['Cormorant Garamond', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(26,26,26,0.06), 0 1px 2px rgba(26,26,26,0.04)',
        'md': '0 4px 16px rgba(26,26,26,0.08), 0 2px 6px rgba(26,26,26,0.05)',
        'lg': '0 10px 40px rgba(26,26,26,0.12), 0 4px 12px rgba(26,26,26,0.06)',
        'xl': '0 20px 60px rgba(26,26,26,0.16), 0 8px 24px rgba(26,26,26,0.08)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'typing': 'typing 2s steps(20) infinite',
        'blink': 'blink 0.75s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        typing: {
          '0%, 100%': { width: '0' },
          '50%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
