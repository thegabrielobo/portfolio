import { useRef } from 'react';

import { FiX, FiExternalLink } from 'react-icons/fi';
import { FaGithub, FaFigma } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import { useOutsideClick, useScrollLock } from '../../hooks';
import { Button, IconButton } from '../';
import { PROJECTS } from '../../constants/projects';

type ModalProps = {
    projectIndex: number;
    open: boolean;
    onClose: () => any;
};

interface AnimatedProps {
    animationIn: string;
    animationOut: string;
    isVisible: boolean;
    children?: React.ReactNode; // This line allows the component to accept children
}

export const Modal = ({ projectIndex, open, onClose }: ModalProps) => {
    const { lockScroll, unlockScroll } = useScrollLock();
    const { t } = useTranslation('projects');
    const currentProject = PROJECTS[projectIndex];
    const modalRef = useRef<HTMLDivElement>(null);

    useOutsideClick(modalRef, onClose);

    if (open) {
        lockScroll();
    } else {
        unlockScroll();
    }

    return open ? (
        <dialog className="modal modal-open">
            <div className="modal-box w-11/12 max-w-5xl h-[90vh] overflow-y-auto">
                <div ref={ modalRef } className='relative'>
                    <button
                        onClick={ onClose }
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        <FiX />
                    </button>

                    <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start'>
                        {/* Mobile Image */ }
                        <div className='block lg:hidden my-5'>
                            <div className='flex justify-center'>
                                <img
                                    className='w-64 md:w-96 max-h-40 md:max-h-64 rounded-lg shadow-lg object-cover'
                                    width='200'
                                    src={ currentProject.coverImg }
                                    alt={ currentProject.title + 'Cover' }
                                />
                            </div>
                        </div>

                        {/* Content */ }
                        <div className='lg:col-start-2'>
                            <div className='flex w-full items-center justify-between'>
                                <div>
                                    <p className={ `text-base leading-6 font-semibold uppercase ${ currentProject.textColor || 'text-accent' }` }>
                                        { currentProject.categ }
                                    </p>
                                    <h4 className='my-4 text-3xl leading-9 font-black text-base-content md:text-4xl md:leading-12'>
                                        { t(currentProject.title) }
                                    </h4>
                                </div>
                                <div className='flex gap-2'>
                                    { currentProject.githubLink && (
                                        <a
                                            href={ currentProject.githubLink }
                                            target='_blank'
                                            className='btn btn-circle btn-sm btn-ghost'
                                        >
                                            <FaGithub className='h-5 w-5' />
                                        </a>
                                    ) }
                                    { currentProject.figmaLink && (
                                        <a
                                            href={ currentProject.figmaLink }
                                            target='_blank'
                                            className='btn btn-circle btn-sm btn-ghost'
                                        >
                                            <FaFigma className='h-5 w-5' />
                                        </a>
                                    ) }
                                </div>
                            </div>


                            <p className='mt-4 text-sm leading-6 text-base-content/70 max-h-32 md:max-h-[15vh] overflow-y-auto scrollbar-tag'>
                                { t(currentProject.longDesc) }
                            </p>

                            <div className='mt-6'>
                                <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4'>
                                    { currentProject.tags.map((tag, index) => (
                                        <div key={ index } className='flex items-center gap-2'>
                                            <div className={ `avatar placeholder ${ tag.tagBgColor }` }>
                                                <div className='w-8 h-8 rounded-full flex items-center justify-center'>
                                                    <tag.tagIcon className='h-4 w-4 text-white' />
                                                </div>
                                            </div>
                                            <span className='text-xs font-medium text-base-content/70 hidden md:block'>
                                                { tag?.tagName }
                                            </span>
                                        </div>
                                    )) }
                                </div>
                            </div>

                            { currentProject.previewLink && (
                                <div className='mt-8'>
                                    <Button
                                        label={ `${ t('check_it_out') }` }
                                        variant="primary"
                                        onClick={ () =>
                                            window.open(currentProject.previewLink, '_blank')
                                        }
                                        icon={ <FiExternalLink className='ml-2 h-5 w-5' /> }
                                    />
                                </div>
                            ) }
                        </div>

                        {/* Desktop Image */ }
                        <div className='hidden lg:block lg:col-start-1'>
                            <div className='space-y-4'>
                                <div className='flex justify-center'>
                                    <img
                                        className='w-56 md:w-96 md:max-h-64 rounded-lg shadow-lg object-cover'
                                        width='200'
                                        src={ currentProject.coverImg }
                                        alt={ currentProject.title + 'Cover' }
                                    />
                                </div>
                                { currentProject?.projectImg && (
                                    <div className='flex justify-center gap-4 overflow-auto scrollbar-tag px-2'>
                                        { currentProject.projectImg.map((img, index) => (
                                            <img
                                                key={ currentProject.title + index }
                                                className='rounded-lg shadow-md max-w-40 h-28 object-cover'
                                                width='260'
                                                src={ img }
                                                alt={ currentProject.title + index }
                                            />
                                        )) }
                                    </div>
                                ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop" onClick={ onClose }>
                <button>close</button>
            </form>
        </dialog>
    ) : null;
};
