/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      primary: {
        pure: '#004B87',
        light: '#33A3FC',
        medium: '#0267B9',
        dark: '#002E53',
      },
      secondary: {
        pure: '#5AC3BE',
        light: '#5AC3BE',
        medium: '#428F8C',
        dark: '#2A5E5B',
      },
      highlight: {
        pure: '#F673AD',
        light: '#FDD9E9',
        medium: '#900945',
        dark: '#430420',
      },
      neutral: {
        low: {
          pure: '#000000',
          light: '#A3A3A3',
          medium: '#666666',
          dark: '#292929',
        },
        high: {
          pure: '#FFFFFF',
          light: '#F5F5F5',
          medium: '#E0E0E0',
          dark: '#CCCCCC',
        },
      },
      'little-boy-blue': '#6AA7D9',
    },
  },
  plugins: [],
}

