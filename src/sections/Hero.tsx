import { Button } from '../components/Button/Button';
import { useTranslation } from 'react-i18next';
import { RefObject, useEffect, useState } from 'react';
import { SectionsReferences } from '../pages/Home';
import Beams from '../blocks/Backgrounds/Beams/Beams';
import Iridescence from '../blocks/Backgrounds/Iridescence/Iridescence';
import RotatingText from '../blocks/TextAnimations/RotatingText/RotatingText';

interface Props {
    reference: RefObject<HTMLElement>;
    sectionsRef: SectionsReferences;
}

const Hero: React.FC<Props> = (props) => {
    const { t } = useTranslation('home');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            const theme = document.documentElement.getAttribute('data-theme');
            setIsDarkMode(theme === 'dark');
        };

        // Check initial theme
        checkTheme();

        // Listen for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => observer.disconnect();
    }, []);

    const titles: string[] = [
        `${ t('title_1') }`,
        `${ t('title_2') }`,
        `${ t('title_3') }`,
        `${ t('title_4') }`,
        `${ t('title_5') }`,
        `${ t('title_6') }`,
    ];

    // Function to style IBM characters with IBM Plex font
    const getIBMCharacterStyle = (char: string, index: number, text: string) => {
        // Check if this character is part of "IBM" in the text
        const ibmIndex = text.indexOf('IBM');
        if (ibmIndex !== -1 && index >= ibmIndex && index < ibmIndex + 3) {
            return 'ibm-brand';
        }
        return '';
    };

    return (
        <section
            id="hero"
            ref={ props.reference }
            className="flex relative z-20 items-center justify-center overflow-hidden h-screen"
        >
            <div className="container flex flex-col items-center justify-center relative py-16 text-center">
                <div className="w-full flex flex-col relative z-20 pointer-events-none">
                    <h1 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-8xl 2xl:text-9xl flex flex-col leading-none text-base-content drop-shadow-lg">
                        Gabriel Lobo
                    </h1>
                    <div className='font-semibold mt-2 text-xl sm:text-2xl md:text-2xl lg:text-3xl text-base-content flex justify-center'>
                        <RotatingText
                            texts={ titles }
                            auto={ true }
                            loop={ true }
                            rotationInterval={ 3000 }
                            splitBy="characters"
                            staggerDuration={ 0.03 }
                            staggerFrom="first"
                            transition={ {
                                type: "spring",
                                damping: 25,
                                stiffness: 300
                            } }
                            mainClassName="text-base-content flex justify-center"
                            elementLevelClassName="text-base-content"
                            getCharacterClassName={ getIBMCharacterStyle }
                        />
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 w-full h-full z-10">
                { isDarkMode ? (
                    <Beams
                        beamWidth={ 2 }
                        beamHeight={ 15 }
                        beamNumber={ 12 }
                        lightColor={ "#ffffff" }
                        speed={ 2 }
                        noiseIntensity={ 1.75 }
                        scale={ 0.2 }
                        rotation={ 0 }
                    />
                ) : (
                    <Iridescence
                        color1={ [0.067, 0.071, 0.247] } // #11123F
                        color2={ [0.294, 0.471, 0.467] } // #4B7877
                        color3={ [0.639, 0.467, 0.337] } // #A37756
                        speed={ 1.0 }
                        amplitude={ 0.1 }
                        mouseReact={ true }
                    />
                ) }
            </div>
        </section>
    );
};

export default Hero;
