export interface WorkExperienceItem {
    company: string;
    logo: string;
    year: string;
    position?: string;
    description?: string;
    link?: string;
}

export const workExperience: WorkExperienceItem[] = [
    {
        company: '3Pillar Global',
        logo: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702810865/portfolio/clients/3pillar.png',
        year: '2021',
        position: 'Software Engineer Intern',
        description: 'Started my professional journey in software development.',
        link: '#'
    },
    {
        company: 'UCenfotec',
        logo: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702812111/portfolio/clients/cenfotec.png',
        year: '2022 - Present',
        position: 'Elite Software Student',
        description: 'Supported students in computer science and programming courses.',
        link: '#'
    },
    {
        company: 'MobyDyg',
        logo: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702810689/portfolio/clients/mobydyg.png',
        year: '2022',
        position: 'Full Stack Developer',
        description: 'Worked on mobile and web application development.',
        link: '#'
    },
    {
        company: 'NOIR Technologies',
        logo: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702811356/portfolio/clients/noir.png',
        year: '2022',
        position: 'Co-Founder & CEO',
        description: 'Developed innovative technology solutions and applications.',
        link: '#'
    },
    {
        company: 'Mawi',
        logo: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702811762/portfolio/clients/mawi.png',
        year: '2022',
        position: 'Frontend Developer',
        description: 'Created engaging user interfaces and interactive experiences.',
        link: '#'
    },
    {
        company: 'El Viejo',
        logo: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702811225/portfolio/clients/azv.png',
        year: '2023',
        position: 'Software Consultant',
        description: 'Provided technical consulting and development services.',
        link: '#'
    },
    {
        company: 'Ivacus',
        logo: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702812223/portfolio/clients/ivacus.png',
        year: '2023',
        position: 'Full Stack Developer',
        description: 'Built comprehensive web solutions and digital platforms.',
        link: '#'
    },
    {
        company: 'IBM',
        logo: 'https://res.cloudinary.com/glovooker/image/upload/h_65/v1702810428/portfolio/clients/ibm.png',
        year: '2023 - Present',
        position: 'Senior Full Stack Developer',
        description: 'Developing enterprise solutions and contributing to large-scale projects.',
        link: '#'
    },
];
