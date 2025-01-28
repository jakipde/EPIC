const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    themes: [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",
    ],
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
        "./resources/**/*.{html,js,jsx,ts,tsx}",
        "./node_modules/flowbite/**/*.js",
    ],

    theme: {
        extend: {
            colors: {
                'scrollbar': '#003bf1',
            },
            fontFamily: {
                sans: ['figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('daisyui'),
        require('tailwind-scrollbar'),
    ],

    daisyui: {
        themes: true, // Use all themes, including aqua
        darkTheme: 'retro', // Set the dark theme to 'aqua'
        base: true,
        styled: true,
        utils: true,
        prefix: '',
        logs: true,
        themeRoot: ':root',
    },
}

