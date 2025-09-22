import React, { useEffect, useState } from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    lightColor?: string;
    speed?: React.CSSProperties['animationDuration'];
    thickness?: number;
};

const StarBorder = <T extends React.ElementType = 'button'> ({
    as,
    className = '',
    color = 'white',
    lightColor = '#3b82f6',
    speed = '6s',
    thickness = 1,
    children,
    ...rest
}: StarBorderProps<T>) => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const Component = as || 'button';

    useEffect(() => {
        // Check initial theme
        const checkTheme = () => {
            const theme = document.documentElement.getAttribute('data-theme');
            setIsDarkMode(theme === 'dark');
        };

        checkTheme();

        // Listen for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => observer.disconnect();
    }, []);

    const currentColor = isDarkMode ? color : lightColor;
    const backgroundClasses = isDarkMode
        ? "bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white"
        : "bg-gradient-to-b from-white to-gray-100 border border-gray-200 text-gray-900";

    return (
        <Component
            className={ `relative inline-block overflow-hidden rounded-[20px] ${ className }` }
            { ...(rest as any) }
            style={ {
                padding: `${ thickness }px 0`,
                ...(rest as any).style
            } }
        >
            <div
                className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
                style={ {
                    background: `radial-gradient(circle, ${ currentColor }, transparent 10%)`,
                    animationDuration: speed
                } }
            ></div>
            <div
                className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
                style={ {
                    background: `radial-gradient(circle, ${ currentColor }, transparent 10%)`,
                    animationDuration: speed
                } }
            ></div>
            <div className={ `relative z-1 ${ backgroundClasses } text-center text-[16px] pt-[24px] pb-[16px] px-[26px] rounded-[20px]` }>
                { children }
            </div>
        </Component>
    );
};

export default StarBorder;
