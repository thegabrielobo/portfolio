type IconButtonProps = {
  onClick?: () => void;
  bgColor?: string;
  textColor?: string;
  icon?: JSX.Element;
  className?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    title?: string;
};

export const IconButton = ({
  onClick,
    bgColor,
    textColor,
  icon,
  className,
    variant = 'ghost',
    size = 'md',
    title,
}: IconButtonProps) => {
    const baseClasses = `btn btn-${ variant } btn-${ size } btn-circle ${ className || '' }`;

  return (
    <button
          className={ baseClasses }
          onClick={ onClick }
          title={ title }
    >
          { icon }
    </button>
  );
};
