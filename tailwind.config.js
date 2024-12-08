/** @type {import('tailwindcss').Config} */
import fluid, { extract , screens , fontSize } from 'fluid-tailwind'

module.exports = {
  darkMode: 'media',
  content: {
    files: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",],
    extract
  },
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#152765", // Primary color (you can change it as per your design)
        },
        secondary: {
          DEFAULT: "#B12E33", // Secondary color (you can change it as per your design)
        },
      },
    },
    screens,
    
  },
  plugins: [
    fluid,  ]
};
