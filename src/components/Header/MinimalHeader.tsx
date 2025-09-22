import { useTranslation } from 'react-i18next';
import { ThemeSwitch } from '../';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';

const MinimalHeader = () => {
    const { t, i18n } = useTranslation('header');

    const languages = [
        { label: 'es' },
        { label: 'en' },
    ];

    return (
        <div className="navbar fixed top-0 z-50 bg-transparent">
            <div className="navbar-end w-full justify-end pr-8 pt-4">
                <div className="flex items-center gap-2">
                    <ThemeSwitch />
                    <LanguageSwitch items={ languages } />
                </div>
            </div>
        </div>
    );
};

export default MinimalHeader;
