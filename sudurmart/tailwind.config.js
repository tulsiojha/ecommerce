/** @format */

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
    },
    zIndex: {
      0: 0,
      1: 1,
      5: 5,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      60: 60,
      70: 70,
      80: 80,
      90: 90,
      100: 100,
      200: 200,
      1000: 1000,
      2000: 2000,
      3000: 3000,
      auto: "auto",
    },
    scale: {
      '0': '0',
      '10': '0.1',
      '25': '.25',
      '50': '.5',
      '75': '.75',
      '80': '0.8',
      '90': '.9',
      '95': '.95',
      '100': '1',
      '105': '1.05',
      '110': '1.1',
      '125': '1.25',
      '150': '1.5',
      '200': '2',
    },
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      transform: ['active'],
      scale: ['active'],
    },
    // scrollbar: ["rounded"],
  },
  plugins: [
    require("daisyui"),
    // require("tailwind-scrollbar"),
    // require("@tailwindcss/line-clamp"),
  ],
};
