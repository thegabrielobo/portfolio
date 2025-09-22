import { useState } from 'react';
import { FaPlay } from "react-icons/fa6";

const InterviewPreview = ({ preview }: { preview: string; }) => {
    const [isHovered, setIsHovered] = useState(false);
    const interviewUrl = "https://www.youtube.com/watch?v=er7WuC09n78&ab_channel=UniversidadCENFOTEC";

    const [isVideoPlaying, setVideoPlaying] = useState(false);
    const videoId = 'er7WuC09n78';
    const embedUrl = `https://www.youtube.com/embed/${ videoId }?autoplay=1&rel=0`;

    const handleVideoPlay = () => {
        setVideoPlaying(true);
    };

    const openInterview = () => {
        window.open(interviewUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <div
                className="hidden relative md:flex justify-center items-center overflow-hidden rounded-lg w-fit m-auto cursor-pointer"
                style={ { width: '35vw', height: `calc(35vw * (9 / 16))`, maxWidth: '100%', maxHeight: '100%', aspectRatio: '16 / 9' } }
                onClick={ handleVideoPlay }
            >
                { !isVideoPlaying ? (
                    <div
                        className="relative flex justify-center items-center overflow-hidden rounded-lg w-full m-full cursor-pointer"
                        onMouseEnter={ () => setIsHovered(true) }
                        onMouseLeave={ () => setIsHovered(false) }
                    >
                        <img src={ preview } alt="Interview Preview" className="w-full m-full rounded-lg" />
                        { isHovered && (
                            <div className="absolute inset-0 flex justify-center items-center w-auto m-auto bg-primary bg-opacity-25 transition-all duration-3000 ease-in-out">
                                <FaPlay className="w-12 h-12 fill-white" />
                            </div>
                        ) }
                    </div>
                ) : (
                    <iframe
                        style={ { width: '100%', height: '100%' } }
                        src={ embedUrl }
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    ></iframe>
                ) }
            </div>

            <div
                className="relative flex md:hidden justify-center items-center overflow-hidden rounded-lg w-fit m-auto"
                onMouseEnter={ () => setIsHovered(true) }
                onMouseLeave={ () => setIsHovered(false) }
                onClick={ openInterview }
                style={ { cursor: 'pointer' } }
            >
                <img src={ preview } alt="Interview Preview" className="w-auto m-auto rounded-lg" />
                { isHovered && (
                    <div className="absolute inset-0 flex justify-center items-center w-auto m-auto bg-primary bg-opacity-25 transition-all duration-3000 ease-in-out">
                        <FaPlay className="w-12 h-12 fill-white" />
                    </div>
                ) }
            </div>
        </>
    );
};

export default InterviewPreview;
