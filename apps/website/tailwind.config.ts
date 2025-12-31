import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/library/react/**/*.{js,ts,jsx,tsx}",
  ],
};

export default config;
