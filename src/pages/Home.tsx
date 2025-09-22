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
        // Use intersection observer to show button when Portfolio section is visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShowButton(true);
                    } else {
                        setShowButton(false);
                    }
                });
            },
            { threshold: 0.1 } // Show when 10% of the section is visible
        );

        // Observe the Portfolio section
        const portfolioElement = portfolioRef.current;
        if (portfolioElement) {
            observer.observe(portfolioElement);
        }

        return () => {
            if (portfolioElement) {
                observer.unobserve(portfolioElement);
            }
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

            {/* Floating scroll-to-top button - appears when About Me is visible */ }
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
