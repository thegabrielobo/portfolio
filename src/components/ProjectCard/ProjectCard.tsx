import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons/lib';

import { Modal } from '../';

export type TagProps = {
    tagName: string;
    tagColor: string;
    tagBgColor: string;
    tagIcon: IconType;
};

export type ProjectCardProps = {
    index: number;
    img?: string;
    title: string;
    desc: string;
    tags: TagProps[];
    categ?: string;
    icon?: string;
    textColor?: string;
    tagsBgColor?: string;
    showTags?: boolean;
    showAuthor?: boolean;
};

const ProjectCard = ({
    index,
    img,
    title,
    desc,
    tags,
    categ,
    icon,
    textColor,
    tagsBgColor,
    showTags = true,
    showAuthor = true,
}: ProjectCardProps) => {
    const { t } = useTranslation('projects');
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='card w-80 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer'>
            <figure className='h-40'>
                <img
                    alt={ title + ' Cover' }
                    src={ img }
                    className='w-full h-full object-cover'
                />
            </figure>
            <div className='card-body'>
                <div className='card-actions justify-start'>
                    <div className={ `badge badge-primary ${ textColor }` }>{ categ }</div>
                </div>
                <h2 className='card-title text-2xl font-black mb-2'>
                    { t(title) }
                </h2>
                <p className='text-base-content/70 font-light h-20 text-md'>{ t(desc) }</p>
                { showTags && (
                    <div className='card-actions justify-start mt-4'>
                        <div className='flex flex-wrap gap-2 overflow-x-auto scrollbar-tag pb-2'>
                            { tags?.map((tag) => (
                                <div
                                    key={ tag.tagName }
                                    className={ `badge badge-outline text-xs ${ tagsBgColor }` }
                                >
                                    { tag.tagName }
                                </div>
                            )) }
                        </div>
                    </div>
                ) }
                <div className='card-actions justify-end mt-4'>
                    <button
                        onClick={ () => setShowModal(true) }
                        className='btn btn-primary btn-sm'
                        aria-label={ t('open_project', { project: title }).toString() }
                    >
                        { t('view_details') }
                    </button>
                </div>
            </div>
            <Modal
                open={ showModal }
                onClose={ () => setShowModal(false) }
                projectIndex={ index }
            />
        </div>
    );
};

export default ProjectCard;
