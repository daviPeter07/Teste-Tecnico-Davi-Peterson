import { createVuetify } from "vuetify";

export const vuetify = createVuetify({
  theme: {
    defaultTheme: "main",
    themes: {
      main: {
        dark: false,
        colors: {
          primary: "#f97316",
          secondary: "#111111",
          background: "#f8f8f8",
          surface: "#ffffff",
          error: "#dc2626",
        },
      },
    },
  },
});
