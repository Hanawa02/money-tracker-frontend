const GRAY_BASE_HS = "274, 5%";
const PRIMARY_BASE_HS = "274, 67%";
const RED_BASE_HS = "0, 67%";
const GREEN_BASE_HS = "126, 94%";

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "transparent": "transparent",
      "white": "#ffffff",
      "black": "#000000",
      "white-gray": `hsl(${GRAY_BASE_HS}, 98%)`,
      "lightest-gray": `hsl(${GRAY_BASE_HS}, 95%)`,
      "extra-light-gray": `hsl(${GRAY_BASE_HS}, 85%)`,
      "light-gray": `hsl(${GRAY_BASE_HS}, 75%)`,
      "gray": `hsl(${GRAY_BASE_HS}, 65%)`,
      "mid-gray": `hsl(${GRAY_BASE_HS}, 46%)`,
      "dark-gray": `hsl(${GRAY_BASE_HS}, 28%)`,
      "darkest-gray": `hsl(${GRAY_BASE_HS}, 12%)`,
      "black-gray": `hsl(${GRAY_BASE_HS}, 5%)`,

      "white-red": `hsl(${RED_BASE_HS}, 98%)`,
      "lightest-red": `hsl(${RED_BASE_HS}, 95%)`,
      "extra-light-red": `hsl(${RED_BASE_HS}, 85%)`,
      "light-red": `hsl(${RED_BASE_HS}, 70%)`,
      "red": `hsl(${RED_BASE_HS}, 57%)`,
      "mid-red": `hsl(${RED_BASE_HS}, 36%)`,
      "dark-red": `hsl(${RED_BASE_HS}, 28%)`,
      "darkest-red": `hsl(${RED_BASE_HS}, 15%)`,

      "white-primary": `hsl(${PRIMARY_BASE_HS}, 98%)`,
      "lightest-primary": `hsl(${PRIMARY_BASE_HS}, 95%)`,
      "extra-light-primary": `hsl(${PRIMARY_BASE_HS}, 85%)`,
      "light-primary": `hsl(${PRIMARY_BASE_HS}, 69%)`,
      "primary": `hsl(${PRIMARY_BASE_HS}, 53%)`,
      "mid-primary": `hsl(${PRIMARY_BASE_HS}, 40%)`,
      "dark-primary": `hsl(${PRIMARY_BASE_HS}, 28%)`,
      "darkest-primary": `hsl(${PRIMARY_BASE_HS}, 15%)`,
      "black-primary": `hsl(${PRIMARY_BASE_HS}, 8%)`,

      "white-green": `hsl(${GREEN_BASE_HS}, 98%)`,
      "lightest-green": `hsl(${GREEN_BASE_HS}, 95%)`,
      "extra-light-green": `hsl(${GREEN_BASE_HS}, 85%)`,
      "light-green": `hsl(${GREEN_BASE_HS}, 70%)`,
      "green": `hsl(${GREEN_BASE_HS}, 57%)`,
      "mid-green": `hsl(${GREEN_BASE_HS}, 36%)`,
      "dark-green": `hsl(${GREEN_BASE_HS}, 28%)`,
      "darkest-green": `hsl(${GREEN_BASE_HS}, 15%)`,
    },
    fontFamily: {
      montserrat: ["Montserrat", "ui-sans-serif", "system-ui"],
    },
    extend: {
      spacing: {
        icon: "1.34em",
      },
      minWidth: {
        32: "8rem",
      },
      boxShadow: {
        "card": `0px 1px 4px hsla(${GRAY_BASE_HS}, 0%, 0.25)`,
        "card-hover": `0px 1px 4px 2px hsla(${GRAY_BASE_HS}, 40%, 0.3)`,
      },
    },
  },
  plugins: [],
};
