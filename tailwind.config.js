// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ensure 'class' is enabled for dark mode
  darkMode: "class", // <--- THIS IS CRUCIAL FOR DARK MODE TOGGLE

  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure all your component files are included here
  ],
  theme: {
    extend: {
      // Add your custom animations here if they are not global CSS
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "bounce-slow": {
          "0%, 100%": {
            transform: "translateY(-5%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".5" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "bounce-slow": "bounce-slow 3s infinite",
        "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin-slow 10s linear infinite",
      },
    },
  },
  plugins: [],
};
