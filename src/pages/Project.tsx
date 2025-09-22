import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { PROJECTS } from '../constants/projects';
import { ProjectDetails } from '../components';
import { withBasicLayout } from '../layout/basicLayout';

const Project = () => {
    const { projectIndex } = useParams<{ projectIndex: string; }>();
    const navigate = useNavigate();
    const { t } = useTranslation('projects');

    const projectIndexNum = parseInt(projectIndex || '0', 10);
    const project = PROJECTS[projectIndexNum];

    // Always scroll to top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen bg-base-100 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-error mb-4">Project Not Found</h1>
                    <p className="text-lg text-base-content/70 mb-8">The project you're looking for doesn't exist.</p>
                    <button
                        onClick={ () => navigate('/') }
                        className="btn btn-primary"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 pt-20">
            <ProjectDetails
                project={ project }
                projectIndex={ projectIndexNum }
                onBack={ () => navigate('/') }
            />
        </div>
    );
};

export default withBasicLayout(Project);
