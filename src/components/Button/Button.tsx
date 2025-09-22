type ButtonProps = {
    label?: string;
    onClick?: () => void;
    bgColor?: string;
    icon?: JSX.Element;
    type?: 'button' | 'submit' | 'reset';
    isIconOnly?: boolean;
    isFloating?: boolean;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    className?: string;
    style?: React.CSSProperties;
};

export const Button = ({
    label,
    onClick,
    bgColor,
    icon,
    type = 'button',
    isIconOnly = false,
    isFloating = false,
    variant = 'primary',
    size = 'md',
    className = '',
    style = {},
}: ButtonProps) => {
    const baseClasses = isFloating
        ? 'fixed z-20 bottom-5 right-4 btn btn-circle btn-primary shadow-lg'
        : `btn btn-${ variant } btn-${ size } mr-4 font-medium`;

    return (
        <button
            className={ `${ baseClasses } ${ className }` }
            onClick={ onClick }
            type={ type }
            style={ style }
        >
            { !isIconOnly && label }
            { icon && <span className={ isIconOnly ? 'ml-2' : '' }>{ icon }</span> }
        </button>
    );
};
