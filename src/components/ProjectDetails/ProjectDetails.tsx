import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { FaGithub, FaFigma, FaExternalLinkAlt, FaInfoCircle, FaUsers, FaImages, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { TagProps } from '../ProjectCard/ProjectCard';
import ChromaGrid, { ChromaItem } from '../ChromaGrid/ChromaGrid';

type Contributor = {
    name: string;
    image: string;
    link: string;
    handle: string;
    role?: string;
};

export type ProjectDetailsProps = {
    project: {
        tags: TagProps[];
        title: string;
        categ: string;
        coverImg: string;
        desc: string;
        longDesc: string;
        textColor: string;
        tagsBgColor: string;
        projectImg?: string[];
        contributors: Contributor[];
        previewLink?: string;
        githubLink?: string;
        figmaLink?: string;
    };
    projectIndex: number;
    onBack: () => void;
};

const ProjectDetails = ({ project, projectIndex, onBack }: ProjectDetailsProps) => {
    const { t } = useTranslation('projects');
    const [isDark, setIsDark] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    // Theme detection
    useEffect(() => {
        const checkTheme = () => {
            const theme = document.documentElement.getAttribute('data-theme');
            setIsDark(theme === 'dark');
        };

        checkTheme();

        // Listen for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => observer.disconnect();
    }, []);

    // Image viewer functions
    const openImageViewer = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeImageViewer = () => {
        setSelectedImageIndex(null);
    };

    const goToPreviousImage = () => {
        if (selectedImageIndex !== null && project.projectImg) {
            setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : project.projectImg.length - 1);
        }
    };

    const goToNextImage = () => {
        if (selectedImageIndex !== null && project.projectImg) {
            setSelectedImageIndex(selectedImageIndex < project.projectImg.length - 1 ? selectedImageIndex + 1 : 0);
        }
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex !== null) {
                if (e.key === 'Escape') {
                    closeImageViewer();
                } else if (e.key === 'ArrowLeft') {
                    goToPreviousImage();
                } else if (e.key === 'ArrowRight') {
                    goToNextImage();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex]);

    // Helper function to convert contributors to ChromaGrid format
    const convertContributorsToChromaItems = (contributors: Contributor[]): ChromaItem[] => {
        const colors = [
            '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4',
            '#EC4899', '#84CC16', '#F97316', '#6366F1', '#14B8A6', '#F43F5E'
        ];

        const gradients = isDark ? [
            'linear-gradient(145deg,#4F46E5,#000)',
            'linear-gradient(210deg,#10B981,#000)',
            'linear-gradient(165deg,#F59E0B,#000)',
            'linear-gradient(195deg,#EF4444,#000)',
            'linear-gradient(225deg,#8B5CF6,#000)',
            'linear-gradient(135deg,#06B6D4,#000)',
            'linear-gradient(180deg,#EC4899,#000)',
            'linear-gradient(120deg,#84CC16,#000)',
            'linear-gradient(150deg,#F97316,#000)',
            'linear-gradient(200deg,#6366F1,#000)',
            'linear-gradient(160deg,#14B8A6,#000)',
            'linear-gradient(190deg,#F43F5E,#000)'
        ] : [
            'linear-gradient(145deg,#4F46E5,#f8fafc)',
            'linear-gradient(210deg,#10B981,#f0fdf4)',
            'linear-gradient(165deg,#F59E0B,#fffbeb)',
            'linear-gradient(195deg,#EF4444,#fef2f2)',
            'linear-gradient(225deg,#8B5CF6,#faf5ff)',
            'linear-gradient(135deg,#06B6D4,#ecfeff)',
            'linear-gradient(180deg,#EC4899,#fdf2f8)',
            'linear-gradient(120deg,#84CC16,#f7fee7)',
            'linear-gradient(150deg,#F97316,#fff7ed)',
            'linear-gradient(200deg,#6366F1,#f8fafc)',
            'linear-gradient(160deg,#14B8A6,#f0fdfa)',
            'linear-gradient(190deg,#F43F5E,#fef2f2)'
        ];

        return contributors.map((contributor, index) => ({
            image: contributor.image,
            title: contributor.name,
            handle: `@${ contributor.handle }`,
            borderColor: colors[index % colors.length],
            gradient: gradients[index % gradients.length],
            url: contributor.link
        }));
    };

    return (
        <div className="container mx-auto max-w-6xl px-4 py-8 pt-20">
            {/* Header */ }
            <div className="mb-8">
                <button
                    onClick={ onBack }
                    className="btn btn-ghost mb-4"
                >
                    { t('back_to_portfolio') }
                </button>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Project Image */ }
                    <div className="lg:w-1/2">
                        <img
                            src={ project.coverImg }
                            alt={ t(project.title) }
                            className="w-full h-80 object-cover rounded-lg shadow-xl"
                        />
                    </div>

                    {/* Project Info */ }
                    <div className="lg:w-1/2 space-y-6">
                        <div>
                            <div className="badge badge-primary mb-4">{ project.categ }</div>
                            <h1 className="text-4xl font-bold text-base-content mb-4">
                                { t(project.title) }
                            </h1>
                            <p className="text-lg text-base-content/70 leading-relaxed">
                                { t(project.desc) }
                            </p>
                        </div>

                        {/* Action Buttons */ }
                        <div className="flex flex-wrap gap-3">
                            { project.previewLink && (
                                <a
                                    href={ project.previewLink }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                                    { t('view_live') }
                                </a>
                            ) }
                            { project.githubLink && (
                                <a
                                    href={ project.githubLink }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
                                >
                                    <FaGithub className="mr-2 h-4 w-4" />
                                    { t('view_code') }
                                </a>
                            ) }
                            { project.figmaLink && (
                                <a
                                    href={ project.figmaLink }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
                                >
                                    <FaFigma className="mr-2 h-4 w-4" />
                                    { t('view_design') }
                                </a>
                            ) }
                        </div>
                    </div>
                </div>
            </div>

            {/* Technology Icons - Full Width */ }
            <div className="mt-16 mb-8">
                <div className="flex flex-wrap gap-6">
                    { project.tags.map((tag, index) => (
                        <div
                            key={ index }
                            className="tooltip tooltip-top"
                            data-tip={ tag.tagName }
                        >
                            <div
                                className={ `w-16 h-16 rounded-full flex items-center justify-center shadow-lg ring-2 ring-base-300 hover:ring-primary transition-all duration-300 hover:scale-110 cursor-pointer ${ tag.tagBgColor }` }
                            >
                                <tag.tagIcon className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    )) }
                </div>
            </div>

            {/* Project Details */ }
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */ }
                <div className="lg:col-span-2 space-y-8">
                    {/* Description */ }
                    <div>
                        <h2 className="text-3xl font-bold text-base-content mb-4 flex items-center">
                            <FaInfoCircle className="w-8 h-8 mr-3 text-primary" />
                            { t('about_this_project') }
                        </h2>
                        <p className="text-base-content/80 leading-relaxed">
                            { t(project.longDesc) }
                        </p>
                    </div>

                    {/* Project Images */ }
                    { project.projectImg && project.projectImg.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-3xl font-bold text-base-content mb-4 flex items-center">
                                <FaImages className="w-8 h-8 mr-3 text-primary" />
                                { t('project_screenshots') }
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                { project.projectImg.map((img, index) => (
                                    <div key={ index } className="aspect-video w-full">
                                        <img
                                            src={ img }
                                            alt={ `${ t(project.title) } screenshot ${ index + 1 }` }
                                            className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
                                            onClick={ () => openImageViewer(index) }
                                        />
                                    </div>
                                )) }
                            </div>
                        </div>
                    ) }

                </div>

                {/* Sidebar */ }
                <div className="space-y-8">
                </div>
            </div>

            {/* Contributors - Full Width */ }
            { project.contributors.length > 1 && (
                <div className="mt-16 mb-24">
                    <h2 className="text-3xl font-bold text-base-content mb-8 flex items-center">
                        <FaUsers className="w-8 h-8 mr-3 text-primary" />
                        { t('contributors') }
                    </h2>
                    <ChromaGrid
                        items={ convertContributorsToChromaItems(project.contributors) }
                    />
                </div>
            ) }

            {/* Image Viewer Modal */ }
            { selectedImageIndex !== null && project.projectImg && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
                    onClick={ closeImageViewer }
                >
                    <div
                        className="relative max-w-7xl max-h-[90vh] w-full mx-4"
                        onClick={ (e) => e.stopPropagation() }
                    >
                        {/* Close Button */ }
                        <button
                            onClick={ closeImageViewer }
                            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 cursor-pointer"
                        >
                            <FaTimes className="w-6 h-6" />
                        </button>

                        {/* Navigation Buttons */ }
                        { project.projectImg.length > 1 && (
                            <>
                                <button
                                    onClick={ goToPreviousImage }
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 cursor-pointer"
                                >
                                    <FaChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={ goToNextImage }
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 cursor-pointer"
                                >
                                    <FaChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        ) }

                        {/* Image */ }
                        <img
                            src={ project.projectImg[selectedImageIndex] }
                            alt={ `${ t(project.title) } screenshot ${ selectedImageIndex + 1 }` }
                            className="w-full h-full object-contain rounded-lg"
                        />

                        {/* Image Counter */ }
                        { project.projectImg.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
                                { selectedImageIndex + 1 } / { project.projectImg.length }
                            </div>
                        ) }
                    </div>
                </div>
            ) }
        </div>
    );
};

export default ProjectDetails;
