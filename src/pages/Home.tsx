import { useEffect, useRef, useState } from 'react';

import { FiArrowUpCircle } from "react-icons/fi";
import { withBasicLayout } from '../layout/basicLayout';
import AboutMe from '../sections/AboutMe';
import Hero from '../sections/Hero';
import Portfolio from '../sections/Portfolio';
import Carousel from '../sections/Carousel';
import { Button } from '../components';

export type SectionsReferences = {
    [key: string]: {
        ref: React.RefObject<HTMLElement>;
        scrollTo: () => void;
    };
};

export const Home = () => {
    const [showButton, setShowButton] = useState(false);


    const heroRef = useRef<HTMLElement>(null);
    const aboutMeRef = useRef<HTMLElement>(null);
    const portfolioRef = useRef<HTMLElement>(null);

    const headerHeight = 96;

    const sectionsRef: SectionsReferences = {
        heroRef: {
            ref: heroRef,
            scrollTo: () => {
                const offset = (heroRef.current?.getBoundingClientRect().top ?? 0) - headerHeight;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth',
                });
            },
        },
        aboutMeRef: {
            ref: aboutMeRef,
            scrollTo: () => {
                const offset = (aboutMeRef.current?.getBoundingClientRect().top ?? 0) - headerHeight;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth',
                });
            },
        },
        portfolioRef: {
            ref: portfolioRef,
            scrollTo: () => {
                const offset = (portfolioRef.current?.getBoundingClientRect().top ?? 0) - headerHeight;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth',
                });
            },
        },
    };

    useEffect(() => {
        const checkScrollPosition = () => {
            if (window.scrollY > 90) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', checkScrollPosition);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', checkScrollPosition);
        };
    }, []);

    return (
        <div>
            <Hero
                reference={ heroRef }
                sectionsRef={ sectionsRef }
            />
            <Carousel />
            <AboutMe
                title={ 'title' }
                description={ ['description_1', 'description_2', 'description_3'] }
                reference={ aboutMeRef }
                sectionsRef={ sectionsRef }
                isLeft={ true }
            />
            <Portfolio reference={ portfolioRef } />

            { showButton && (
                <Button
                    isFloating={ true }
                    icon={ <FiArrowUpCircle className="h-8 w-8" /> }
                    onClick={ () => window.scrollTo({ top: 0, behavior: 'smooth' }) }
                />
            ) }
        </div>
    );
};

export default withBasicLayout(Home);
