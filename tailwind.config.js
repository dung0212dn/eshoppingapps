/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    plugins: [

    ],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',

        },
        colors: {
            'blue': '#1fb6ff',
            'pink': '#ff49db',
            'orange': '#ff7849',
            'green': '#13ce66',
            'gray-dark': '#868686',
            'gray': '#8492a6',
            'gray-light': '#d6d6d6',
            'dark-orange': '#d19c97',
            'white': '#fff',
            'blue-night': '#edf1ff',
            'bronze': '#cb8161',
            'gray-light-thin': '#e2e2e2',
            'black': '#000',
            'nude-light': '#fdfbf5',
            'red': '#ff0000',
            'gold-star': "#ffcd4c",
            'heavy-red': "#e94560",
            'blue-sky' : "#47b9f1"

        },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
            opensans: ['Open Sans', 'sans-serif'],
            allura: ['Allura', 'cursive'],
            greatvibes: ['Great Vibes', 'cursive'],
            josefin: ['Josefin Sans', 'sans-serif'],
            parata: ['Prata', 'serif'],
            garamond: ['Cormorant Garamond', 'serif'],
        },
        fontSize: {
            ssm: '0.7rem',
            sm: '0.85rem',
            base: '1rem',
            xl: '1.2rem',
            '2xl': '1.4rem',
            '3xl': '1.853rem',
            '4xl': '2.241rem',
            '5xl': '3.052rem',
        },
        letterSpacing: {
            tightest: '-.075em',
            tighter: '-.05em',
            tight: '-.025em',
            normal: '0',
            wide: '.025em',
            wider: '.05em',
            widest: '.1em',
            widest: '.25em',
        },

        extend: {
            spacing: {
                '84': '21rem',
                '88': '22rem',
                '92': '23rem',
                '116': '29rem',
                '120': '30rem',
                '124': '31rem',
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            }
        },
        container: {
            center: true,
        },


    },

}