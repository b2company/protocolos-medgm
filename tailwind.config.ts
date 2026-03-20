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
    },
  },
  plugins: [],
} satisfies Config;
