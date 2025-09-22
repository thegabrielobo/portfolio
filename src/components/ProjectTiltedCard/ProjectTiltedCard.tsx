import { useTranslation } from 'react-i18next';
import { TiltedCard } from '../';

export type ProjectTiltedCardProps = {
    index: number;
    img?: string;
    title: string;
    desc: string;
    categ?: string;
    textColor?: string;
    onClick?: () => void;
};

const ProjectTiltedCard = ({
    index,
    img,
    title,
    desc,
    categ,
    textColor,
    onClick,
}: ProjectTiltedCardProps) => {
    const { t } = useTranslation('projects');

    return (
        <div
            className="cursor-pointer w-80"
            onClick={ onClick }
        >
            <TiltedCard
                imageSrc={ img || '' }
                altText={ t(title) }
                captionText=""
                containerHeight="180px"
                containerWidth="320px"
                imageHeight="180px"
                imageWidth="320px"
                rotateAmplitude={ 12 }
                scaleOnHover={ 1.05 }
                showMobileWarning={ false }
                showTooltip={ false }
                displayOverlayContent={ false }
            />
        </div>
    );
};

export default ProjectTiltedCard;
