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
          "50": "#eefbf6",
          "100": "#d7f4e7",
          "200": "#b2e8d2",
          "300": "#66cdaa",
          "400": "#4bbc99",
          "500": "#29a080",
          "600": "#1a8167",
          "700": "#156755",
          "800": "#135244",
          "900": "#104439",
          "950": "#082621",
        },
      },
    },
  },
};
