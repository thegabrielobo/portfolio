import { useTranslation } from 'react-i18next';
import { TagProps } from '../ProjectCard/ProjectCard';
import { Avatar } from '../Avatars/Avatars';

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
        contributors: Avatar[];
        previewLink?: string;
        githubLink?: string;
        figmaLink?: string;
    };
    projectIndex: number;
    onBack: () => void;
};

const ProjectDetails = ({ project, projectIndex, onBack }: ProjectDetailsProps) => {
    const { t } = useTranslation('projects');

    return (
        <div className="container mx-auto max-w-6xl px-4 py-8">
            {/* Header */ }
            <div className="mb-8">
                <button
                    onClick={ onBack }
                    className="btn btn-ghost mb-4"
                >
                    ← Back to Portfolio
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
                                    View Live
                                </a>
                            ) }
                            { project.githubLink && (
                                <a
                                    href={ project.githubLink }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
                                >
                                    View Code
                                </a>
                            ) }
                            { project.figmaLink && (
                                <a
                                    href={ project.figmaLink }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
                                >
                                    View Design
                                </a>
                            ) }
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Details */ }
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */ }
                <div className="lg:col-span-2 space-y-8">
                    {/* Description */ }
                    <div>
                        <h2 className="text-2xl font-bold text-base-content mb-4">About This Project</h2>
                        <p className="text-base-content/80 leading-relaxed">
                            { t(project.longDesc) }
                        </p>
                    </div>

                    {/* Project Images */ }
                    { project.projectImg && project.projectImg.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-base-content mb-4">Project Screenshots</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                { project.projectImg.map((img, index) => (
                                    <img
                                        key={ index }
                                        src={ img }
                                        alt={ `${ t(project.title) } screenshot ${ index + 1 }` }
                                        className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                    />
                                )) }
                            </div>
                        </div>
                    ) }
                </div>

                {/* Sidebar */ }
                <div className="space-y-8">
                    {/* Technologies */ }
                    <div>
                        <h3 className="text-xl font-bold text-base-content mb-4">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                            { project.tags.map((tag) => (
                                <div
                                    key={ tag.tagName }
                                    className="text-xs px-3 py-1 rounded-full font-medium transition-all duration-200 hover:scale-105 dark:bg-white dark:text-base-content"
                                    style={ {
                                        backgroundColor: `rgba(${ tag.tagColor.replace('#', '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ') }, 0.1)`,
                                        color: tag.tagColor,
                                        border: `1px solid rgba(${ tag.tagColor.replace('#', '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ') }, 0.2)`
                                    } }
                                >
                                    { tag.tagName }
                                </div>
                            )) }
                        </div>
                    </div>

                    {/* Contributors */ }
                    { project.contributors.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold text-base-content mb-4">Contributors</h3>
                            <div className="space-y-3">
                                { project.contributors.map((contributor, index) => (
                                    <div key={ index } className="flex items-center gap-3">
                                        <img
                                            src={ contributor.avatar }
                                            alt={ contributor.name }
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-medium text-base-content">{ contributor.name }</p>
                                            <p className="text-sm text-base-content/70">{ contributor.role }</p>
                                        </div>
                                    </div>
                                )) }
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
