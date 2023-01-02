const GRAY_BASE_HS = "274, 5%";
const PRIMARY_BASE_HS = "126, 70%";
const RED_BASE_HS = "0, 67%";

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "transparent": "transparent",
      "inherit": "inherit",
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
      "mid-red": `hsl(${RED_BASE_HS}, 40%)`,
      "dark-red": `hsl(${RED_BASE_HS}, 28%)`,
      "darkest-red": `hsl(${RED_BASE_HS}, 15%)`,

      "white-primary": `hsl(${PRIMARY_BASE_HS}, 98%)`,
      "lightest-primary": `hsl(${PRIMARY_BASE_HS}, 95%)`,
      "extra-light-primary": `hsl(${PRIMARY_BASE_HS}, 85%)`,
      "light-primary": `hsl(${PRIMARY_BASE_HS}, 60%)`,
      "primary": `hsl(${PRIMARY_BASE_HS}, 40%)`,
      "mid-primary": `hsl(${PRIMARY_BASE_HS}, 30%)`,
      "dark-primary": `hsl(${PRIMARY_BASE_HS}, 20%)`,
      "darkest-primary": `hsl(${PRIMARY_BASE_HS}, 10%)`,
      "black-primary": `hsl(${PRIMARY_BASE_HS}, 5%)`,

    },
    fontFamily: {
      montserrat: ["Montserrat", "ui-sans-serif", "system-ui"],
    },
    extend: {
      spacing: {
        17: "4.25rem",
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
