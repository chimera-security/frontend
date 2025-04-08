/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#7B61FF',
            light: '#9a83ff',
            dark: '#6549db'
          },
          dark: {
            DEFAULT: '#0e0e0e',
            light: '#1a1a1a',
            lighter: '#2a2a2a'
          }
        },
        animation: {
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'float': 'float 6s ease-in-out infinite',
          'spin-slow': 'spin 8s linear infinite',
          'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite'
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          }
        },
      },
    },
    plugins: [],
  }