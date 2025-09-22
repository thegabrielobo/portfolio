import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { Header, HeaderLink } from '../components/Header/Header';
import MinimalHeader from '../components/Header/MinimalHeader';
import { Footer } from '../components/Footer/Footer';

type ChildrenComponent = () => JSX.Element; // Define the type for the Children component

export const withBasicLayout = (Children: ChildrenComponent) => () => {
    const { t } = useTranslation('header');
    const location = useLocation();

    // Only show navigation links on the home page
    const isHomePage = location.pathname === '/';

    const headerLinks: HeaderLink[] = isHomePage ? [
        {
            label: `${ t('home') }`,
            link: '#hero',
        },
        {
            label: `${ t('about') }`,
            link: '#about-me',
        },
        {
            label: `${ t('projects') }`,
            link: '#portfolio',
        },
    ] : [];

    return (
        <div className='flex flex-col min-h-screen overflow-x-hidden'>
            { isHomePage ? (
                <Header
                    links={ headerLinks }
                    hideGitHubLink={ true }
                    alignRight={ true }
                    isFat={ true }
                    forceMenuOpenInMobile={ false }
                    disableScrollEffect={ false }
                />
            ) : (
                <MinimalHeader />
            ) }
            <main className='flex-1 w-full'>
                <Children />
            </main>
            <Footer />
        </div>
    );
};
