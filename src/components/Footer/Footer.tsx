import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { IconButton } from '..';

export const Footer = () => {
    const year = new Date().getFullYear(); // Dynamically get the current year

    return (
        <footer className="footer footer-center p-4 bg-base-100 text-base-content relative">
            <div className="flex justify-between items-center w-full max-w-6xl">
                <span className='text-xs md:text-base'>© { year } Gabriel Lobo. All rights reserved.</span>
                <div className='flex gap-2'>
                    <IconButton
                        onClick={ () => window.open('https://wa.me/50683833903') }
                        icon={ <FaWhatsapp className="h-5 w-5 md:h-6 md:w-6" /> }
                    />
                    <IconButton
                        onClick={ () => window.open('https://github.com/glovooker') }
                        icon={ <FaGithub className="h-5 w-5 md:h-6 md:w-6" /> }
                    />
                    <IconButton
                        onClick={ () => window.open('https://www.linkedin.com/in/glovooker/') }
                        icon={ <FaLinkedin className="h-5 w-5 md:h-6 md:w-6" /> }
                    />
                </div>
            </div>
        </footer>
    );
};
