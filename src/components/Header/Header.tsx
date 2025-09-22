import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import logo from '../../assets/img/logo.svg';

import { Dropdown, ThemeSwitch } from '../';
import { Link } from 'react-router-dom';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';

interface Props {
    withShadow?: boolean;
    isFat?: boolean;
    showScrollButton?: boolean;
    forceMenuOpenInMobile?: boolean;
    forceDDMOpenInMobile?: boolean;
    links?: HeaderLink[];
    ddmItems?: DDMItem[];
    hideGitHubLink?: boolean;
    alignRight?: boolean;
    hideHelp?: boolean;
    withSearchBar?: boolean;
    withRequestLink?: boolean;
    disableScrollEffect?: boolean;
}

interface HeaderLink {
    label: string;
    link?: string;
    isSelected?: boolean;
    desc?: string;
    icon?: JSX.Element;
}

interface DDMItem {
    icon?: JSX.Element;
    label: string;
    desc?: string;
    link?: string;
}

export const Header = ({
    withShadow = false,
    isFat = false,
    showScrollButton = false,
    forceMenuOpenInMobile = false,
    forceDDMOpenInMobile = false,
    links = [],
    ddmItems = [],
    hideGitHubLink = false,
    disableScrollEffect = false
}: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const { t } = useTranslation('header');

    const [navBackground, setNavBackground] = useState('bg-transparent');

    useEffect(() => {
        // If scroll effect is disabled, set transparent background and don't set up scroll listener
        if (disableScrollEffect) {
            setNavBackground('bg-transparent');
            return;
        }

        // Reset to transparent for home page
        setNavBackground('bg-transparent');

        let rafId: number;
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }

            rafId = requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                const show = currentScrollY > 10;

                // Only update if scroll position changed significantly
                if (Math.abs(currentScrollY - lastScrollY) > 5) {
                    if (show) {
                        setNavBackground('backdrop-blur-md bg-base-100/10');
                    } else {
                        setNavBackground('bg-transparent');
                    }

                    lastScrollY = currentScrollY;
                }

                // Detect active section based on scroll position
                const sections = ['hero', 'about-me', 'portfolio'];
                const headerHeight = 80;

                for (let i = sections.length - 1; i >= 0; i--) {
                    const section = sections[i];
                    const element = document.getElementById(section);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        if (rect.top <= headerHeight + 100) {
                            setActiveSection(section);
                            break;
                        }
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [disableScrollEffect]);

    const languages: DDMItem[] = [
        {
            label: 'en',
        },
        {
            label: 'es',
        },
    ];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        // Handle smooth scrolling for anchor links
        if (href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = 80; // Approximate header height
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // Handle external links
            window.location.href = href;
        }
    };

    return (
        <div className={ `navbar fixed top-0 z-50 transition-all duration-300 ease-in-out ${ navBackground === 'bg-transparent' ? 'bg-transparent' : 'backdrop-blur-md bg-base-100/10' } ${ withShadow ? 'shadow-lg' : '' } ${ isFat ? 'py-4' : '' }` }>
            {/* Logo positioned absolutely */ }
            <div className="absolute left-8 top-4 mix-blend-difference">
                <Link className="text-xl text-base-content hover:opacity-80 transition-opacity duration-200" to=".">
                    <svg width="48" height="48" viewBox="0 0 2000 2000" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12">
                        <g clipPath="url(#clip0_62_54)">
                            <path d="M2000 1000C2000 1197.78 1941.35 1391.12 1831.47 1555.57C1721.59 1720.02 1565.41 1848.19 1382.68 1923.88C1199.96 1999.57 998.891 2019.37 804.91 1980.79C610.929 1942.2 432.746 1846.96 292.893 1707.11C153.041 1567.25 57.7999 1389.07 19.2147 1195.09C-19.3705 1001.11 0.432836 800.043 76.1205 617.317C151.808 434.59 279.981 278.412 444.43 168.53C608.879 58.649 802.219 -2.35852e-06 1000 0V500C901.109 500 804.439 529.324 722.215 584.265C639.99 639.206 575.904 717.295 538.06 808.658C500.216 900.021 490.315 1000.55 509.607 1097.55C528.9 1194.54 576.52 1283.63 646.447 1353.55C716.373 1423.48 805.464 1471.1 902.455 1490.39C999.445 1509.69 1099.98 1499.78 1191.34 1461.94C1282.7 1424.1 1360.79 1360.01 1415.73 1277.79C1470.68 1195.56 1500 1098.89 1500 1000H2000Z" fill="currentColor" />
                            <path d="M1090.4 0.00012207H1587.57V435.028H2000V909.604H1090.4V0.00012207Z" fill="currentColor" />
                        </g>
                        <defs>
                            <clipPath id="clip0_62_54">
                                <rect width="2000" height="2000" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </Link>
            </div>

            <div className='navbar-start'>
                <div className='dropdown'>
                    <div tabIndex={ 0 } role="button" className="btn btn-ghost lg:hidden" onClick={ () => setIsMenuOpen(!isMenuOpen) }>
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    { (isMenuOpen || forceMenuOpenInMobile) && (
                        <ul tabIndex={ 0 } className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            { links?.map((link) => (
                                <li key={ link.label }>
                                    <a
                                        href={ link.link || '/' }
                                        onClick={ (e) => {
                                            handleLinkClick(e, link.link || '/');
                                            setIsMenuOpen(false);
                                        } }
                                        className={ link.isSelected ? 'active' : '' }
                                    >
                                        { link.label }
                                    </a>
                                </li>
                            )) }
                            <li className="lg:hidden">
                                <div className="flex items-center justify-between w-full">
                                    <span>Theme</span>
                                    <ThemeSwitch />
                                </div>
                            </li>
                        </ul>
                    ) }
                </div>
            </div>
            <div className='navbar-center hidden lg:flex'>
                <ul className={ `menu menu-horizontal gap-12 transition-opacity duration-300 ${ navBackground === 'bg-transparent' ? 'opacity-0' : 'opacity-100' }` }>
                    { links?.map((link) => {
                        const isActive = activeSection === link.link?.substring(1);
                        return (
                            <li key={ link.label }>
                                <a
                                    href={ link.link || '/' }
                                    onClick={ (e) => handleLinkClick(e, link.link || '/') }
                                    className={ `px-4 py-2 rounded-md transition-all duration-300 font-medium ${ isActive
                                        ? 'bg-primary text-primary-content shadow-lg'
                                        : 'hover:bg-base-200/50 hover:scale-105'
                                        }` }
                                >
                                    { link.label }
                                </a>
                            </li>
                        );
                    }) }
                </ul>
            </div>
            <div className='navbar-end'>
                { !hideGitHubLink && (
                    <a
                        href='https://github.com/Charlie85270/tail-kit'
                        className='btn btn-ghost btn-circle'
                    >
                        <span className='sr-only'>View github</span>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            fill='currentColor'
                            viewBox='0 0 1792 1792'
                        >
                            <path d='M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z' />
                        </svg>
                    </a>
                ) }
                <div className='hidden md:block ml-2 mix-blend-difference'>
                    <ThemeSwitch />
                    <LanguageSwitch items={ languages } />
                </div>
            </div>
        </div>
    );
};

export type { DDMItem, HeaderLink };
