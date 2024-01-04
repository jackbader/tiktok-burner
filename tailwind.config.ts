import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        green: {
          "50": "#f4f7f7",
          "100": "#e2ebeb",
          "200": "#c8d9d9",
          "300": "#a2bebd",
          "400": "#749b9c",
          "500": "#598081",
          "600": "#527375",
          "700": "#425a5c",
          "800": "#3c4c4e",
          "900": "#354244",
          "950": "#202b2c",
        },
      },
    },
  },
};
