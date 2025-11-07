import { type Config } from "prettier";

const config: Config = {
  trailingComma: "none",
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/index.css"
};

export default config;
