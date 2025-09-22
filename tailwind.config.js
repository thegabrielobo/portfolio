import daisyui from 'daisyui';

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        'animate-star-movement-bottom',
        'animate-star-movement-top',
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                'sf': ['SF Pro Display', 'sans-serif'],
                'ibm': ['IBM Plex Sans', 'sans-serif'],
            },
            translate: {
                '101': '101%',
            },
            keyframes: {
                marquee: {
                    'from': { transform: 'translateX(0%)' },
                    'to': { transform: 'translateX(-50%)' }
                },
                'star-movement-bottom': {
                    '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
                    '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
                },
                'star-movement-top': {
                    '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
                    '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
                },
            },
            animation: {
                marquee: 'marquee 15s linear infinite',
                'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
                'star-movement-top': 'star-movement-top linear infinite alternate',
            }
        },
    },
    plugins: [daisyui],
}; 
