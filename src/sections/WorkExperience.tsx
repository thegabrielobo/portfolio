import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Timeline from '../components/Timeline/Timeline';
import { workExperience } from '../constants/workExperience';

const WorkExperience: FC = () => {
    const { t } = useTranslation('work_experience');

    return (
        <section className='bg-base-200 w-full'>
            <div className='container mx-auto max-w-8xl px-4 py-16'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl md:text-5xl font-bold mb-4 text-primary'>
                        { t('title') }
                    </h2>
                    <p className='text-lg text-base-content/70 max-w-2xl mx-auto'>
                        { t('description') }
                    </p>
                </div>
                <Timeline items={ workExperience } />
            </div>
        </section>
    );
};

export default WorkExperience;
