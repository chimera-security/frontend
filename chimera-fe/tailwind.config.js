/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 3s infinite',
        'spin': 'spin 1s linear infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'growFromLeft': 'growFromLeft 2s forwards',
        'float': 'float 10s linear infinite',
        'pulseSlow': 'pulseSlow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
    },
  },
  plugins: [],
}
