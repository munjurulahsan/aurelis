import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080807",
        "ink-soft": "#0b0a09",
        charcoal: "#151311",
        cream: "#f1eee7",
        "cream-dim": "#e6e0d4",
        bronze: "#9b8064",
        "bronze-dim": "#8a7255",
        wine: "#35191a",
        amber: "#ffb76c",
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1680px",
      },
      letterSpacing: {
        widest2: "0.2em",
        widest3: "0.24em",
      },
    },
  },
  plugins: [],
};

export default config;
