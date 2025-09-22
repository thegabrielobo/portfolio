import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlay } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { StarBorder } from '../';

const InterviewPreview = ({ preview }: { preview: string; }) => {
    const { t } = useTranslation('interview');
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const interviewUrl = "https://www.youtube.com/watch?v=er7WuC09n78&ab_channel=UniversidadCENFOTEC";

    // Detect theme
    useEffect(() => {
        const checkTheme = () => {
            const theme = document.documentElement.getAttribute('data-theme');
            setIsDarkMode(theme === 'dark');
        };

        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => observer.disconnect();
    }, []);

    const [isVideoPlaying, setVideoPlaying] = useState(false);
    const videoId = 'er7WuC09n78';
    const embedUrl = `https://www.youtube.com/embed/${ videoId }?autoplay=1&rel=0`;

    const handleVideoPlay = () => {
        setIsLoading(true);
        setVideoPlaying(true);
        // Simulate loading time
        setTimeout(() => setIsLoading(false), 1000);
    };

    const openInterview = () => {
        window.open(interviewUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <>

            {/* Desktop Video Player */ }
            <div className="hidden md:flex justify-center items-center w-fit m-auto mb-8">
                <StarBorder
                    as="div"
                    className="max-w-sm sm:max-w-md md:max-w-xs lg:max-w-3xl"
                    color="#00ffff"
                    lightColor="#3b82f6"
                    speed="6s"
                    thickness={ 2 }
                >
                    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl rounded-lg overflow-hidden">
                        <figure className="relative overflow-hidden rounded-lg">
                            <div
                                className="relative flex justify-center items-center cursor-pointer aspect-video md:max-w-2xl"
                                style={ { width: 'min(35vw, 800px)', maxWidth: '100%' } }
                                onClick={ handleVideoPlay }
                            >
                                { !isVideoPlaying ? (
                                    <div
                                        className="relative flex justify-center items-center overflow-hidden w-full h-full cursor-pointer group"
                                        onMouseEnter={ () => setIsHovered(true) }
                                        onMouseLeave={ () => setIsHovered(false) }
                                    >
                                        <img
                                            src={ preview }
                                            alt="Interview Preview"
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />

                                        {/* Gradient Overlay */ }
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Play Button */ }
                                        <div className={ `absolute inset-0 flex justify-center items-center transition-all duration-300 ${ isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
                                            }` }>
                                            <div className="btn btn-circle btn-lg btn-primary shadow-lg hover:shadow-xl">
                                                <FaPlay className="w-6 h-6 fill-primary-content" />
                                            </div>
                                        </div>

                                        {/* Video Duration Badge */ }
                                        <div className="absolute bottom-4 right-4">
                                            <div className="badge badge-primary badge-lg">{ t('duration') }</div>
                                        </div>
                                    </div>
                                ) : (
                                        <div className="relative w-full h-full">
                                            { isLoading && (
                                                <div className="absolute inset-0 flex justify-center items-center bg-base-100">
                                                    <div className="loading loading-spinner loading-lg text-primary"></div>
                                                </div>
                                            ) }
                                            <iframe
                                                className="w-full h-full rounded-lg"
                                                src={ embedUrl }
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title="Embedded youtube"
                                        />
                                    </div>
                                ) }
                            </div>
                        </figure>

                        {/* Card Body with Video Info */ }
                        <div className="p-4 bg-transparent">
                            <h2 className="text-lg font-bold">{ t('title') }</h2>
                            <p className="text-sm text-base-content/70">{ t('description') }</p>
                            <div className="card-actions justify-end mt-2">
                                <button
                                    onClick={ openInterview }
                                    className="btn btn-outline btn-sm gap-2"
                                >
                                    <FaExternalLinkAlt className="w-3 h-3" />
                                    { t('watch_on_youtube') }
                                </button>
                            </div>
                        </div>
                    </div>
                </StarBorder>
            </div>

            {/* Mobile Video Player */ }
            <div className="md:hidden w-full mb-6">
                <StarBorder
                    as="div"
                    className="w-full"
                    color="#00ffff"
                    lightColor="#3b82f6"
                    speed="4s"
                    thickness={ 1 }
                >
                    <div className="rounded-lg overflow-hidden">
                        <figure className="relative overflow-hidden rounded-lg">
                            <div
                                className="relative flex justify-center items-center cursor-pointer aspect-video w-full"
                                onClick={ openInterview }
                            >
                                <div
                                    className="relative flex justify-center items-center overflow-hidden w-full h-full cursor-pointer group"
                                    onMouseEnter={ () => setIsHovered(true) }
                                    onMouseLeave={ () => setIsHovered(false) }
                                >
                                    <img
                                        src={ preview }
                                        alt="Interview Preview"
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    {/* Gradient Overlay */ }
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                    {/* Play Button */ }
                                    <div className="absolute inset-0 flex justify-center items-center">
                                        <div className="btn btn-circle btn-lg btn-primary shadow-lg">
                                            <FaPlay className="w-6 h-6 fill-primary-content" />
                                        </div>
                                    </div>

                                    {/* Video Duration Badge */ }
                                    <div className="absolute bottom-3 right-3">
                                        <div className="badge badge-primary">{ t('duration') }</div>
                                    </div>
                                </div>
                            </div>
                        </figure>

                        {/* Mobile Card Body */ }
                        <div className="p-3 bg-transparent">
                            <h2 className="text-base font-bold">{ t('title') }</h2>
                            <p className="text-xs text-base-content/70">{ t('description') }</p>
                            <div className="card-actions justify-end mt-1">
                                <button
                                    onClick={ openInterview }
                                    className="btn btn-outline btn-xs gap-1"
                                >
                                    <FaExternalLinkAlt className="w-3 h-3" />
                                    { t('watch') }
                                </button>
                            </div>
                        </div>
                    </div>
                </StarBorder>
            </div>
        </>
    );
};

export default InterviewPreview;
