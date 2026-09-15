export type SectionId =
  | 'home'
  | 'about'
  | 'skills'
  | 'experience'
  | 'project'
  | 'education'
  | 'contact';

export const SECTION_IDS: SectionId[] = [
  'home',
  'about',
  'skills',
  'experience',
  'project',
  'education',
  'contact',
];

export const NAV_LABELS: Record<SectionId, string> = {
  home: 'Home',
  about: 'About',
  skills: 'Skills',
  experience: 'Experience',
  project: 'Projects',
  education: 'Education',
  contact: 'Contact',
};

export interface Skill {
  title: string;
  level: number;
  pic?: string;
  icon?: string;
  category: string;
}

export interface Project {
  title: string;
  year: string;
  description: string;
  image: string;
  techs: string[];
  codeUrl: string;
  liveUrl: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  detail: string;
}

export interface SocialLink {
  label: string;
  icon: string;
  url: string;
}

export const SKILL_CATEGORIES: string[] = [
  'Frontend',
  'Backend',
  'Database',
  'API',
  'Tools',
];

export const SKILLS: Skill[] = [
  // Frontend
  { title: 'Angular', level: 80, pic: 'assets/angular-logo.png', category: 'Frontend' },
  { title: 'TypeScript', level: 75, pic: 'assets/ts.png', category: 'Frontend' },
  { title: 'JavaScript', level: 80, pic: 'assets/javascript.png', category: 'Frontend' },
  { title: 'HTML', level: 85, pic: 'assets/html.png', category: 'Frontend' },
  { title: 'CSS', level: 80, pic: 'assets/css.png', category: 'Frontend' },
  { title: 'Bootstrap', level: 75, icon: 'bi-bootstrap', category: 'Frontend' },

  // Backend
  { title: 'Node.js', level: 70, icon: 'bi-terminal', category: 'Backend' },
  { title: 'Express.js', level: 65, icon: 'bi-hdd-stack', category: 'Backend' },
  { title: 'ASP.NET', level: 65, icon: 'bi-hdd-rack', category: 'Backend' },
  { title: 'C#', level: 65, icon: 'bi-filetype-cs', category: 'Backend' },
  { title: 'C++', level: 60, icon: 'bi-code-square', category: 'Backend' },

  // Database
  { title: 'MySQL', level: 75, icon: 'bi-database', category: 'Database' },
  { title: 'PostgreSQL', level: 65, icon: 'bi-database-fill-gear', category: 'Database' },
  { title: 'MongoDB', level: 65, icon: 'bi-database-check', category: 'Database' },

  // API
  { title: 'REST API', level: 75, icon: 'bi-link-45deg', category: 'API' },
  { title: 'HTTP', level: 75, icon: 'bi-globe', category: 'API' },
  { title: 'JSON', level: 80, icon: 'bi-filetype-json', category: 'API' },


  // Tools
  { title: 'Git', level: 75, icon: 'bi-git', category: 'Tools' },
  { title: 'GitHub', level: 75, icon: 'bi-github', category: 'Tools' },
  { title: 'Visual Studio Code', level: 85, icon: 'bi-code-slash', category: 'Tools' },
  { title: 'Visual Studio', level: 70, icon: 'bi-window-desktop', category: 'Tools' },

];

export const PROJECTS: Project[] = [
  {
    title: 'Library Management System',
    year: '2025',
    description:
      'A library management application featuring authentication, role-based access, and workflows for books, book copies, authors, members, borrowing, and returns. Implemented with REST APIs, database integration, validation, and exception handling.',
    image: 'assets/library.png',
    techs: ['Angular', 'TypeScript', 'Node.js', 'REST API', 'Database'],
    codeUrl: 'https://github.com/sokhaimeach/Library_Management_Dashboard',
    liveUrl: 'https://library-management-dashboard-six.vercel.app/',
  },
  {
    title: 'Attendance Management System',
    year: '2026',
    description:
      'An attendance management application with an Angular frontend, attendance tracking, reporting features, role-based capabilities, and seamless REST API and database operations.',
    image: 'assets/attendance.png',
    techs: ['Angular', 'TypeScript', 'Bootstrap', 'REST API', 'Database'],
    codeUrl: 'https://github.com/sokhaimeach/AttendanceDashboard',
    liveUrl: '',
  },
  {
    title: 'Online Quiz System',
    year: '2026',
    description:
      'An online quiz application with an React frontend, quiz creation, question management, and scoring features.',
    image: 'assets/online_quiz.png',
    techs: ['ReactJS', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Database'],
    codeUrl: 'https://github.com/sokhaimeach/OnlineQuizSystem_Frontend',
    liveUrl: '',
  },
  {
    title: 'Clothing E-Commerce Web Application',
    year: '2025',
    description:
      'A responsive clothing e-commerce web application built using Angular. Features product browsing and filtering, shopping cart, favorites, and reusable components with a clean, responsive UI.',
    image: 'assets/clotheshop.png',
    techs: ['Angular', 'TypeScript', 'Bootstrap'],
    codeUrl: 'https://github.com/sokhaimeach/ClotheShop',
    liveUrl: 'https://clothe-shop-delta.vercel.app/',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Academic & Team Project Experience',
    company: 'SETEC Institute (MIS Program)',
    period: '2024 — Present',
    summary:
      'Collaborated on and built full-featured management applications as part of academic coursework, focusing on practical functionality, database schemas, and REST API integration.',
    highlights: [
      'Built a Library Management System with authentication, role-based access, book copy tracking, borrowing/returns, and exception handling',
      'Developed an Attendance Management System using Angular with attendance tracking, reporting, and REST API operations',
      'Implemented robust input validation, relational database operations, and secure role-based access control',
    ],
  },
  {
    role: 'Self-Directed & Personal Web Projects',
    company: 'Independent Practical Development',
    period: '2024 — Present',
    summary:
      'Created responsive, user-friendly web applications to deepen practical software skills, component-driven design, and modern frontend development.',
    highlights: [
      'Built a responsive Clothing E-Commerce web application with product browsing, category filtering, shopping cart, and favorites',
      'Engineered reusable, modular components and clean UI layouts using Angular and Bootstrap',
      'Practiced version control, commit workflows, and deployment using Git and GitHub',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "Bachelor's Degree in Management Information Systems (MIS)",
    school: 'SETEC Institute',
    period: '2024 — Present',
    detail:
      'Fourth-year student pursuing a Bachelor of MIS. Major areas of study: Programming, Web Development, Database, and Software Development.',
  },
  {
    degree: 'High School Diploma',
    school: 'Hun Sen Tepnimith High School',
    period: '2017 — 2023',
    detail:
      'Completed secondary education with a strong foundational interest in computer technology and software development.',
  },
];

export const CONTACT_INFO = {
  name: 'MEACH Sokhai',
  address: 'St 122, Tuek Laák 1, Tuol Kouk, Phnom Penh',
  email: 'sokhaimeach119@gmail.com',
  phone: '096 549 6483',
};

export const SOCIALS: SocialLink[] = [
  { label: 'GitHub', icon: 'bi-github', url: 'https://github.com/sokhaimeach' },
  { label: 'Email', icon: 'bi-envelope-fill', url: 'mailto:sokhaimeach119@gmail.com' },
];
