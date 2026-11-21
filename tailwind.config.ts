import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        "offering-ink": "#102e42",
        "offering-body": "#314e60",
        "offering-muted": "#506572",
        "offering-blue": "#006cad",
        "offering-line": "#ccdbe2",
        "offering-tint": "#f4f7f8",
        "offering-gold": "#ae8051",
      },
    },
  },
  plugins: [],
};

export default config;

















