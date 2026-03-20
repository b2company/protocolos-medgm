import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // MedGM Brand Colors
        medgm: {
          clean: '#F5F5F5',
          gold: '#D6B991',
          'dark-gray': '#2B2B2B',
          black: '#151515',
          // Grayscale
          gray: {
            1: '#F8F8F8',
            2: '#E8E8E8',
            3: '#D1D1D1',
            4: '#B0B0B0',
            5: '#5C5C5C',
            6: '#3F3F3F',
            7: '#1F1F1F',
            8: '#0A0A0A',
          }
        }
      },
      fontFamily: {
        sans: ['var(--font-gilroy)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #D6B991 0%, #C4A67A 50%, #B29463 100%)',
        'gradient-dark': 'linear-gradient(135deg, #151515 0%, #2B2B2B 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, #D6B991 0px, transparent 50%), radial-gradient(at 80% 0%, #B29463 0px, transparent 50%), radial-gradient(at 0% 50%, #E8DCCF 0px, transparent 50%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'premium': '0 20px 60px -15px rgba(214, 185, 145, 0.4)',
        'elevation-1': '0 2px 8px rgba(0,0,0,0.08)',
        'elevation-2': '0 4px 16px rgba(0,0,0,0.12)',
        'elevation-3': '0 8px 32px rgba(0,0,0,0.16)',
        'elevation-4': '0 16px 48px rgba(0,0,0,0.20)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
