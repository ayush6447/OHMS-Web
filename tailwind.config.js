/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        ohms: {
          white: "#FFFFFF",
          green: "#80EF80",
          "green-hover": "#6FE56F",
          "green-dark": "#4CAF50",
          "green-light": "#B2F5B2",
          "green-glow": "rgba(128, 239, 128, 0.3)",
        }
      },
      fontFamily: {
        heading: ["'Syne'", "'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        'ohms-glow': '0 0 24px -2px rgba(128, 239, 128, 0.6)',
        'skeu-light': '8px 8px 20px rgba(0, 0, 0, 0.06), -8px -8px 20px rgba(255, 255, 255, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        'skeu-dark': '8px 8px 24px rgba(0, 0, 0, 0.8), -4px -4px 16px rgba(255, 255, 255, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'skeu-btn': '0 4px 14px rgba(128, 239, 128, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      },
    },
  },
  plugins: [],
}
