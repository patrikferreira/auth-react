import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "lightColor": "#ffff",
        "accent": "#e2a871"
      },
      boxShadow: {
        'customShadow': '0px 0px 2px 0px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
