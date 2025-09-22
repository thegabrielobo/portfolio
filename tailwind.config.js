import daisyui from 'daisyui';

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                'sf': ['SF Pro Display', 'sans-serif'],
                'ibm': ['IBM Plex Sans', 'sans-serif'],
            },
        },
    },
    plugins: [daisyui],
}; 
