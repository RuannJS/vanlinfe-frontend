module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js", // add this line
  ],
  theme: {
    colors: {
      primary: "#FFF7ED",
      secondary: "#FFCC8D",
      action: "FF8C38",
      lightblack: "#252525",
    },
    extend: {},
  },

  plugins: [require("flowbite/plugin")],
};
