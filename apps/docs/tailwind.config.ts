import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui-react/src/**/*.{js,ts,jsx,tsx}",
  ],
};

export default config;
