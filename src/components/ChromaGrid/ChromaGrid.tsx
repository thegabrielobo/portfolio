import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export interface ChromaItem {
    image: string;
    title: string;
    handle?: string;
    location?: string;
    borderColor?: string;
    gradient?: string;
    url?: string;
}

export interface ChromaGridProps {
    items?: ChromaItem[];
    className?: string;
    radius?: number;
    damping?: number;
    fadeOut?: number;
    ease?: string;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
    items,
    className = '',
    radius = 300,
    damping = 0.45,
    fadeOut = 0.6,
    ease = 'power3.out'
}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const fadeRef = useRef<HTMLDivElement>(null);
    const setX = useRef<SetterFn | null>(null);
    const setY = useRef<SetterFn | null>(null);
    const pos = useRef({ x: 0, y: 0 });
    const [isDark, setIsDark] = useState(true);

    const demo: ChromaItem[] = [
        {
            image: 'https://i.pravatar.cc/300?img=8',
            title: 'Alex Rivera',
            handle: '@alexrivera',
            borderColor: '#4F46E5',
            gradient: 'linear-gradient(145deg,#4F46E5,#000)',
            url: 'https://github.com/'
        },
        {
            image: 'https://i.pravatar.cc/300?img=11',
            title: 'Jordan Chen',
            handle: '@jordanchen',
            borderColor: '#10B981',
            gradient: 'linear-gradient(210deg,#10B981,#000)',
            url: 'https://linkedin.com/in/'
        },
        {
            image: 'https://i.pravatar.cc/300?img=3',
            title: 'Morgan Blake',
            handle: '@morganblake',
            borderColor: '#F59E0B',
            gradient: 'linear-gradient(165deg,#F59E0B,#000)',
            url: 'https://dribbble.com/'
        },
        {
            image: 'https://i.pravatar.cc/300?img=16',
            title: 'Casey Park',
            handle: '@caseypark',
            borderColor: '#EF4444',
            gradient: 'linear-gradient(195deg,#EF4444,#000)',
            url: 'https://kaggle.com/'
        },
        {
            image: 'https://i.pravatar.cc/300?img=25',
            title: 'Sam Kim',
            handle: '@thesamkim',
            borderColor: '#8B5CF6',
            gradient: 'linear-gradient(225deg,#8B5CF6,#000)',
            url: 'https://github.com/'
        },
        {
            image: 'https://i.pravatar.cc/300?img=60',
            title: 'Tyler Rodriguez',
            handle: '@tylerrod',
            borderColor: '#06B6D4',
            gradient: 'linear-gradient(135deg,#06B6D4,#000)',
            url: 'https://aws.amazon.com/'
        }
    ];

    const data = items?.length ? items : demo;

    // Theme detection
    useEffect(() => {
        const checkTheme = () => {
            const theme = document.documentElement.getAttribute('data-theme');
            setIsDark(theme === 'dark');
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

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
        setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;
        const { width, height } = el.getBoundingClientRect();
        pos.current = { x: width / 2, y: height / 2 };
        setX.current(pos.current.x);
        setY.current(pos.current.y);
    }, []);

    const moveTo = (x: number, y: number) => {
        gsap.to(pos.current, {
            x,
            y,
            duration: damping,
            ease,
            onUpdate: () => {
                setX.current?.(pos.current.x);
                setY.current?.(pos.current.y);
            },
            overwrite: true
        });
    };

    const handleMove = (e: React.PointerEvent) => {
        const r = rootRef.current!.getBoundingClientRect();
        moveTo(e.clientX - r.left, e.clientY - r.top);
        gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
    };

    const handleLeave = () => {
        gsap.to(fadeRef.current, {
            opacity: 1,
            duration: fadeOut,
            overwrite: true
        });
    };

    const handleCardClick = (url?: string) => {
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
        const c = e.currentTarget as HTMLElement;
        const rect = c.getBoundingClientRect();
        c.style.setProperty('--mouse-x', `${ e.clientX - rect.left }px`);
        c.style.setProperty('--mouse-y', `${ e.clientY - rect.top }px`);
    };

    return (
        <div
            ref={ rootRef }
            onPointerMove={ handleMove }
            onPointerLeave={ handleLeave }
            className={ `relative w-full h-full flex flex-wrap justify-start items-start gap-3 ${ className }` }
            style={
                {
                    '--r': `${ radius }px`,
                    '--x': '50%',
                    '--y': '50%'
                } as React.CSSProperties
            }
        >
            { data.map((c, i) => (
                <article
                    key={ i }
                    onMouseMove={ handleCardMove }
                    onClick={ () => handleCardClick(c.url) }
                    className="group relative flex flex-col w-[250px] rounded-[20px] overflow-hidden transition-colors duration-300 cursor-pointer"
                    style={
                        {
                            border: `2px solid ${ c.borderColor || 'transparent' }`,
                            background: c.gradient,
                            '--spotlight-color': 'rgba(255,255,255,0.3)'
                        } as React.CSSProperties
                    }
                >
                    <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
                        style={ {
                            background:
                                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
                        } }
                    />
                    <div className="relative z-10 flex-1 p-[10px] box-border">
                        <img src={ c.image } alt={ c.title } loading="lazy" className="w-full h-full object-cover rounded-[10px]" />
                    </div>
                    <footer
                        className="relative z-10 p-3 font-sans"
                        style={ { color: isDark ? 'white' : c.borderColor } }
                    >
                        <h3 className="m-0 text-[1.05rem] font-semibold mb-1">{ c.title }</h3>
                        <p className="m-0 text-[0.85rem] opacity-85">{ c.handle }</p>
                    </footer>
                </article>
            )) }
            <div
                className="absolute inset-0 pointer-events-none z-30"
                style={ {
                    backdropFilter: isDark ? 'grayscale(1) brightness(0.78)' : 'grayscale(0.3) brightness(1.1)',
                    WebkitBackdropFilter: isDark ? 'grayscale(1) brightness(0.78)' : 'grayscale(0.3) brightness(1.1)',
                    background: isDark ? 'rgba(0,0,0,0.001)' : 'rgba(255,255,255,0.001)',
                    maskImage: isDark
                        ? 'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
                        : 'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(255,255,255,0.20) 30%,rgba(255,255,255,0.40)45%,rgba(255,255,255,0.60)60%,rgba(255,255,255,0.80)75%,rgba(255,255,255,0.95)88%,white 100%)',
                    WebkitMaskImage: isDark
                        ? 'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
                        : 'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(255,255,255,0.20) 30%,rgba(255,255,255,0.40)45%,rgba(255,255,255,0.60)60%,rgba(255,255,255,0.80)75%,rgba(255,255,255,0.95)88%,white 100%)'
                } }
            />
            <div
                ref={ fadeRef }
                className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
                style={ {
                    backdropFilter: isDark ? 'grayscale(1) brightness(0.78)' : 'grayscale(0.3) brightness(1.1)',
                    WebkitBackdropFilter: isDark ? 'grayscale(1) brightness(0.78)' : 'grayscale(0.3) brightness(1.1)',
                    background: isDark ? 'rgba(0,0,0,0.001)' : 'rgba(255,255,255,0.001)',
                    maskImage: isDark
                        ? 'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)'
                        : 'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(0,0,0,0.10)30%,rgba(0,0,0,0.20)45%,rgba(0,0,0,0.30)60%,rgba(0,0,0,0.40)75%,rgba(0,0,0,0.50)88%,transparent 100%)',
                    WebkitMaskImage: isDark
                        ? 'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)'
                        : 'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(0,0,0,0.10)30%,rgba(0,0,0,0.20)45%,rgba(0,0,0,0.30)60%,rgba(0,0,0,0.40)75%,rgba(0,0,0,0.50)88%,transparent 100%)',
                    opacity: 1
                } }
            />
        </div>
    );
};

export default ChromaGrid;
