// Importing default colors from tailwind css object
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        invoiceTab: "#1E2139",
        paidButton: "#33D69F",
        pendingButton: "#FF8F00",
        draftButton: "#979797",
        editButton: "#252945",
        deleteButton: "#EC5757",
        purpleButton: "#7C5DFA",
        cardBgBlue: "#1E2139",
        formCardBg: "#141625",
      },
    },
  },
  plugins: [],
};
