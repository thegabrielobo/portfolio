import { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel: FC = () => {
    const logos = [
        { src: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702810428/portfolio/clients/ibm.png', alt: 'IBM' },
        { src: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702811356/portfolio/clients/noir.png', alt: 'Noir' },
        { src: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702810865/portfolio/clients/3pillar.png', alt: '3Pillar Global' },
        { src: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702811762/portfolio/clients/mawi.png', alt: 'Mawi' },
        { src: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702812223/portfolio/clients/ivacus.png', alt: 'Ivacus' },
        { src: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702810689/portfolio/clients/mobydyg.png', alt: 'MobyDyg' },
        { src: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702812111/portfolio/clients/cenfotec.png', alt: 'UCenfotec' },
        { src: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702811225/portfolio/clients/azv.png', alt: 'Azucarera El Viejo' },

    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Default for large screens
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        swipeToSlide: true,
        touchThreshold: 10,
        responsive: [
            {
                breakpoint: 2560, // Ultra wide monitors
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1024, // Small monitors, large tablets
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 700, // Mobile devices in landscape and larger phones in portrait
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };


    return (
        <section className='bg-base-100 w-full'>
            <div className='container mx-auto max-w-8xl px-4 py-8 text-center'>
                <Slider { ...settings }>
                    { logos.map((logo, index) => (
                        <div key={ index } className="px-2 flex justify-center items-center h-full">
                            <img src={ logo.src } alt={ logo.alt } className='mx-auto filter grayscale opacity-50' />
                        </div>
                    )) }
                </Slider>
            </div>
        </section>
    );
};

export default Carousel;
