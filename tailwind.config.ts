import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        spa: {
          accent: "#2E4A3B",
          bg: "#F7F3EC",
          border: "#E0D6C6",
          "border-strong": "#8A7F6E",
          gold: "#B08D57",
          "gold-on": "#D4B483",
          "gold-text": "#7A5E33",
          cream: "#F7F3EC",
          placeholder: "#E7DFD2",
          "placeholder-text": "#8A7F6E",
          surface: "#FFFFFF",
          sand: "#EFE7DA",
          text: "#1E2621",
          muted: "#5C665F",
          error: "#B3261E",
          booked: "#ECE7DF",
          "booked-text": "#6B6358",
          skeleton: "#E7DFD2",
        },
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "24px",
      },
      maxWidth: {
        page: "1200px",
      },
      boxShadow: {
        bar: "0px -4px 16px 0px rgba(31, 38, 33, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
