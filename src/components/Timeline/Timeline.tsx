import React from 'react';

interface TimelineItemProps {
    company: string;
    logo: string;
    year: string;
    position?: string;
    description?: string;
    link?: string;
    isLast?: boolean;
    isEven?: boolean;
}

interface TimelineProps {
    items?: TimelineItemProps[];
}

const TimelineItem: React.FC<TimelineItemProps> = ({
    company,
    logo,
    year,
    position,
    description,
    link,
    isLast = false,
    isEven = false
}) => {
    return (
        <li>
            { !isEven && (
                <div className="timeline-start timeline-box my-8">
                    <h3 className="font-bold text-primary">{ company }</h3>
                    { position && (
                        <p className="text-sm font-semibold text-base-content">
                            { position }
                        </p>
                    ) }
                    <p className="text-xs text-primary font-medium">
                        { year }
                    </p>
                </div>
            ) }

            <div className="timeline-middle">
                <div className="w-24 h-24 rounded-full bg-base-100 border-4 border-primary flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 hover:border-secondary transition-all duration-300">
                    <img
                        src={ logo }
                        alt={ `${ company } logo` }
                        className="w-16 h-16 object-contain transition-all duration-300 hover:scale-105 timeline-logo"
                    />
                </div>
            </div>

            { isEven && (
                <div className="timeline-end timeline-box my-8">
                    <h3 className="font-bold text-primary">{ company }</h3>
                    { position && (
                        <p className="text-sm font-semibold text-base-content">
                            { position }
                        </p>
                    ) }
                    <p className="text-xs text-primary font-medium">
                        { year }
                    </p>
                </div>
            ) }

            { !isLast && <hr /> }
        </li>
    );
};

const Timeline: React.FC<TimelineProps> = ({ items = [] }) => {
    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Desktop: Horizontal Timeline */ }
            <ul className="timeline timeline-horizontal hidden lg:flex">
                { items.map((item, index) => (
                    <TimelineItem
                        key={ `${ item.company }-${ index }` }
                        { ...item }
                        isLast={ index === items.length - 1 }
                        isEven={ index % 2 === 1 }
                    />
                )) }
            </ul>

            {/* Mobile: Vertical Timeline */ }
            <ul className="timeline timeline-vertical lg:hidden">
                { items.map((item, index) => (
                    <TimelineItem
                        key={ `${ item.company }-${ index }` }
                        { ...item }
                        isLast={ index === items.length - 1 }
                        isEven={ index % 2 === 1 }
                    />
                )) }
            </ul>
        </div>
    );
};

export default Timeline;
