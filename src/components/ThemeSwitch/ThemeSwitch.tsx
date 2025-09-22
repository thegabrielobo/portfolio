import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export const ThemeSwitch = () => {
    const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        // Get initial theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

        setCurrentTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                setCurrentTheme(newTheme);
                document.documentElement.setAttribute('data-theme', newTheme);
            }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, []);

    const toggleTheme = () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <button
            onClick={ toggleTheme }
            className="btn btn-ghost btn-circle"
            aria-label={ `Switch to ${ currentTheme === 'light' ? 'dark' : 'light' } mode` }
        >
            { currentTheme === 'light' ? (
                <FiMoon className="h-5 w-5" />
            ) : (
                <FiSun className="h-5 w-5" />
            ) }
        </button>
    );
};

export default ThemeSwitch; 
