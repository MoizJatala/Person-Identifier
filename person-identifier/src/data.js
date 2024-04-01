import { nanoid } from 'nanoid';
import { FaHtml5, FaPython, FaReact } from 'react-icons/fa';

export const links = [
    { id: nanoid(), href: '#home', text: 'home' },
    { id: nanoid(), href: '#skills', text: 'skills' },
    { id: nanoid(), href: '#about', text: 'about' },
    { id: nanoid(), href: '#projects', text: 'features' },
];

export const skills = [
    {
        id: nanoid(),
        title: 'HTML&CSS',
        icon: <FaHtml5 className='h-16 w-16 text-emerald-500' />,
        text: 'Highly skilled in HTML & CSS, adeptly crafting visually appealing and responsive websites for optimal user experiences.',
    },
    {
        id: nanoid(),
        title: 'Python',
        icon: <FaPython className='h-16 w-16 text-emerald-500' />,
        text: 'Expertise in Python, specializing in developing robust and scalable applications, with a focus on backend logic, data processing, and server-side functionalities.',
    },
    {
        id: nanoid(),
        title: 'React',
        icon: <FaReact className='h-16 w-16 text-emerald-500' />,
        text: 'Advanced proficiency in React, developing efficient and interactive front-end applications with a strong emphasis on component-based architecture.',
    },
];

export const projects = [
    {
        id: nanoid(),
        img: 'https://d1sr9z1pdl3mb7.cloudfront.net/wp-content/uploads/2012/07/25185358/gait-recognition.jpg',
        url: 'https://react-projects.netlify.app/',
        github: 'https://github.com/john-smilga',
        title: 'The Power of Biometric Attendance',
        text: 'Accuracy Beyond Measure: Bid farewell to manual attendance errors. Our biometric systems, fueled by cutting-edge technology, ensure pinpoint accuracy by capturing unique physical attributes such as gait patterns. No more room for proxies or inaccuracies.',
    },
    {
        id: nanoid(),
        img: 'https://d2lfsu1qnyxzxu.cloudfront.net/cms/nga-feature_d4.jpg',
        url: 'https://react-projects.netlify.app/',
        github: 'https://github.com/john-smilga',
        title: 'Why Choose Biometric Attendance from Person-Identifier',
        text: 'Customized Solutions: We recognize that every organization is unique. Our biometric attendance solutions are customizable, ensuring a seamless integration that aligns with your existing systems.',
    },
    {
        id: nanoid(),
        img: 'https://d2lfsu1qnyxzxu.cloudfront.net/cms/footstrike-2.jpg',
        url: 'https://react-projects.netlify.app/',
        github: 'https://github.com/john-smilga',
        title: 'Experience the Future of Attendance',
        text: 'Join us at Person-Identifier as we usher in a new era of attendance tracking. Embrace the simplicity, security, and sophistication of biometric technology. The days of antiquated attendance methods are numbered, and the future is biometric.         ',
    },
];
