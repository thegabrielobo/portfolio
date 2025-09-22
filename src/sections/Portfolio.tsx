import ProjectCard from '../components/ProjectCard/ProjectCard';
import { PROJECTS } from '../constants/projects';
import { useTranslation } from 'react-i18next';
import { RefObject } from 'react';

export type PortfolioProps = {
    withSearch?: boolean;
    reference: RefObject<HTMLElement>;
};

const Portfolio: React.FC<PortfolioProps> = ({ withSearch = false, reference }) => {
    const { t } = useTranslation('portfolio');

    return (
        <section ref={ reference } id='portfolio' className="w-full bg-base-100 p-10">
            <div className="container mx-auto max-w-8xl px-4">
                <div className="header font-black flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-primary">{ t('title') }</h2>
                        <p className="text-lg font-normal text-primary">{ t('description') }</p>
                    </div>
                    {/* {props.withSearch && (
              <div className='text-end'>
                <FormSubscribe
                  label='Search'
                  placeholder='Enter a title'
                />
              </div>
            )} */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-12">
                    { PROJECTS.map((PROJECT, index) => (
                        <ProjectCard
                            index={ index }
                            key={ PROJECT.title }
                            tags={ PROJECT.tags }
                            title={ PROJECT.title }
                            categ={ PROJECT.categ }
                            img={ PROJECT.coverImg }
                            desc={ PROJECT.desc }
                            textColor={ PROJECT.textColor }
                            tagsBgColor={ PROJECT.tagsBgColor }
                            showAuthor={ false }
                            showTags={ true }
                        />
                    )) }
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
