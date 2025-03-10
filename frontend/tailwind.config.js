/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quickSand: ["Quicksand", "sans-serif"]
      },
      textShadow: { 
        glow: "0px 0px 8px rgba(255, 255, 255, 0.8)", // ✨ ขาวเรืองแสง
        pinkGlow: "0px 0px 10px rgba(255, 105, 180, 0.8)", // 💖 ชมพู
        blueGlow: "0px 0px 10px rgba(100, 149, 237, 0.8)", // 💙 ฟ้า
      },
      colors: {
        neonPink: "#FF69B4", // 💖 สีชมพู Neon
        neonBlue: "#64A9ED", // 💙 สีฟ้า Neon
        neonGreen: "#39FF14", // 🍏 สีเขียว Neon
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
