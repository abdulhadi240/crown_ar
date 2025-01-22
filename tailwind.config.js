/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'media',
  content: {
    files: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",],
  },
  theme: {
    extend: {
      clipPath: {
        'bottom-curve': 'path("M0,0 C0,100 100,100 100,80 L100,100 L0,100 Z")',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#061839", // Primary color (you can change it as per your design)
        },
        secondary: {
          DEFAULT: "#fbba07", // Secondary color (you can change it as per your design)
        },
      },
    },
    
  },
  plugins: [
      require('tailwind-scrollbar-hide'),
      require("tailwindcss-animate")
  
  ]
};
