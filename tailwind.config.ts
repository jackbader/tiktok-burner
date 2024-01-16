import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        green: {
          "50": "#fff8ec",
          "100": "#fff0d3",
          "200": "#ffdca5",
          "300": "#ffc26d",
          "400": "#ff9d32",
          "500": "#ff7f0a",
          "600": "#ff6600",
          "700": "#cc4902",
          "800": "#a1390b",
          "900": "#82310c",
          "950": "#461604",
        },
      },
    },
  },
};
