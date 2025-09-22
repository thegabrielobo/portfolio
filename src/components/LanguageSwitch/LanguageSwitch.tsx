import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { DDMItem } from '../Header/Header';
import { useTranslation } from 'react-i18next';

interface Props {
    forceOpen?: boolean;
    items: DDMItem[];
}

const LanguageSwitch = (props: Props) => {
    const { t, i18n } = useTranslation('header');

    // Initialize with current language or default to first item
    const getCurrentLanguageItem = () => {
        const currentLang = i18n.language || 'en';
        return props.items.find(item => item.label === currentLang) || props.items[0];
    };

    const [selectedItem, setSelectedItem] = useState<DDMItem>(getCurrentLanguageItem());

    const handleLanguageChange = (lng: string) => {
        i18next.changeLanguage(lng);
    };

    const handleLanguageSwitch = (item: DDMItem) => {
        setSelectedItem(item);
        handleLanguageChange(item.label);
    };

    // Update selected item when language changes externally
    useEffect(() => {
        const currentLang = i18n.language || 'en';
        const currentItem = props.items.find(item => item.label === currentLang);
        if (currentItem && currentItem.label !== selectedItem.label) {
            setSelectedItem(currentItem);
        }
    }, [i18n.language, props.items, selectedItem.label]);

    return (
        <div className='dropdown dropdown-end'>
            <div tabIndex={ 0 } role="button" className="btn btn-ghost btn-sm">
                <span className='text-sm font-medium'>{ t(selectedItem?.label) }</span>
                <svg
                    className='h-4 w-4 ml-1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                >
                    <path
                        fillRule='evenodd'
                        d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                        clipRule='evenodd'
                    />
                </svg>
            </div>
            <ul tabIndex={ 0 } className="dropdown-content z-[60] menu p-2 shadow bg-base-100 rounded-box w-32">
                { props.items.map((item) => (
                    <li key={ item.label }>
                        <button
                            onClick={ () => handleLanguageSwitch(item) }
                            className={ selectedItem?.label === item.label ? 'active' : '' }
                        >
                            { t(item.label) }
                        </button>
                    </li>
                )) }
            </ul>
        </div>
    );
};

export default LanguageSwitch;
