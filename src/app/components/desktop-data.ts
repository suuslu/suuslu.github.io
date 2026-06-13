import {
  BarChart3,
  Code2,
  Database,
  FileSpreadsheet,
  Folder,
  Globe,
  GraduationCap,
  Image,
  Mail,
  PenTool,
  Server,
  Users
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type WindowId = 'portfolio' | 'about' | 'projects' | 'skills' | 'contact' | 'gallery';

export type WindowState = {
  id: WindowId;
  title: string;
  icon: string;
  iconSrc?: string;
  minimized: boolean;
  maximized: boolean;
  open: boolean;
  zIndex: number;
};

export type DesktopShortcut = {
  id: WindowId;
  label: string;
  icon: string;
  iconSrc: string;
  ariaLabel: string;
};

export type Experience = {
  title: string;
  period: string;
  details: string[];
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
  asset: string;
};

export type Skill = {
  name: string;
  group: string;
  icon: LucideIcon;
};

export const desktopShortcuts: DesktopShortcut[] = [
  { id: 'about', label: 'About Me', icon: '💻', iconSrc: '/assets/icons/xp-my-computer.png', ariaLabel: 'Open About Me window' },
  { id: 'projects', label: 'Projects', icon: '📁', iconSrc: '/assets/icons/xp-folder.png', ariaLabel: 'Open Projects window' },
  { id: 'skills', label: 'Skills', icon: '🧰', iconSrc: '/assets/icons/xp-control-panel.png', ariaLabel: 'Open Skills window' },
  { id: 'contact', label: 'Contact', icon: '✉️', iconSrc: '/assets/icons/xp-mail.png', ariaLabel: 'Open Contact window' },
  { id: 'gallery', label: 'Gallery', icon: '🖼️', iconSrc: '/assets/icons/xp-pictures.png', ariaLabel: 'Open Photo Gallery window' }
];

export const initialWindowPositions: Record<WindowId, { x: number; y: number }> = {
  portfolio: { x: 308, y: 78 },
  about: { x: 150, y: 46 },
  projects: { x: 176, y: 76 },
  skills: { x: 230, y: 98 },
  contact: { x: 284, y: 118 },
  gallery: { x: 254, y: 84 }
};

export const initialWindows: WindowState[] = [
  {
    id: 'portfolio',
    title: 'Ayse Su Uslu — Portfolio',
    icon: '🖥️',
    iconSrc: '/assets/icons/xp-monitor.png',
    minimized: false,
    maximized: false,
    open: true,
    zIndex: 10
  },
  {
    id: 'about',
    title: 'System Properties — About Me',
    icon: '💻',
    iconSrc: '/assets/icons/xp-my-computer.png',
    minimized: true,
    maximized: false,
    open: false,
    zIndex: 9
  },
  {
    id: 'projects',
    title: 'Explorer — Projects',
    icon: '📁',
    iconSrc: '/assets/icons/xp-folder.png',
    minimized: true,
    maximized: false,
    open: false,
    zIndex: 8
  },
  {
    id: 'skills',
    title: 'Control Panel — Skills',
    icon: '🧰',
    iconSrc: '/assets/icons/xp-control-panel.png',
    minimized: true,
    maximized: false,
    open: false,
    zIndex: 7
  },
  {
    id: 'contact',
    title: 'Outlook Express — Contact',
    icon: '✉️',
    iconSrc: '/assets/icons/xp-mail.png',
    minimized: true,
    maximized: false,
    open: false,
    zIndex: 6
  },
  {
    id: 'gallery',
    title: 'Photo Gallery',
    icon: '🖼️',
    iconSrc: '/assets/icons/xp-pictures.png',
    minimized: true,
    maximized: false,
    open: false,
    zIndex: 5
  }
];

export const profile = {
  name: 'Ayşe Su Uslu',
  asciiName: 'Ayse Su Uslu',
  role: 'Software Engineering Student',
  tagline: 'Building the future one line of code at a time',
  email: 'aysesu.uslu@gmail.com',
  github: 'https://github.com/suuslu',
  githubLabel: 'github.com/suuslu',
  linkedin: 'https://www.linkedin.com/in/ayse-su-uslu/',
  linkedinLabel: 'linkedin.com/in/ayse-su-uslu',
  portfolioDrive: 'https://drive.google.com/drive/folders/1KAa9J34nTpt-0PbesXKkqW1ryC1auri7',
  profilePhoto: '/assets/profile-photo.webp',
  fallbackPhoto: '/image.png'
};

export const aboutCopy = [
  'I am a 3rd-year Software Engineering student at Maltepe University with a current GPA of 3.17, expected to graduate in June 2027. I am an aspiring data analyst who enjoys working with data and building clean, structured systems.',
  'My interests focus on data modeling, analytics, and reliable database design. I work with PostgreSQL and have hands-on experience using XAMPP, phpMyAdmin, and pgAdmin 4 in previous projects.'
];

export const education = [
  {
    school: 'Maltepe University',
    program: 'Software Engineering',
    detail: '3rd-year student, GPA 3.17, expected graduation June 2027'
  }
];

export const interests = ['Data modeling', 'Analytics', 'Reliable database design', 'Structured systems'];

export const experiences: Experience[] = [
  {
    title: 'Information Technologies Intern — Social Office',
    period: 'Aug 2025 – Sep 2025',
    details: [
      'Built data-oriented tasks with Python and Excel.',
      'Designed an interactive Excel dashboard and a Python CLI tool.',
      'Prepared technical design outputs using AutoCAD and Photoshop.'
    ]
  },
  {
    title: 'Vice President — GDG on Campus Maltepe',
    period: '2025 – Jun 2026',
    details: [
      'Managed community events end-to-end and post-event evaluation.',
      'Led social media, organization, and education teams.'
    ]
  },
  {
    title: 'Core Team Member — Anka Software Club',
    period: '2024 – 2025',
    details: [
      'Designed social media visuals and supported the club’s Instagram.',
      'Helped coordinate the AI & Technology Summit.'
    ]
  },
  {
    title: 'Architectural & Engineering Intern — Arch Of Sigma',
    period: 'Nov 2025 – Dec 2025',
    details: [
      'Produced room models in SketchUp and 2D/3D designs in Rhinoceros 3D.',
      'Supported project management and product development tasks.'
    ]
  },
  {
    title: 'Student Assistant — Maltepe University',
    period: 'Jan 2026 – Jun 2026',
    details: ['Assist with course preparation, documentation, and coordination.']
  }
];

export const projects: Project[] = [
  {
    title: 'Graduate Thesis System',
    description: 'DBMS course project for managing theses, people, universities, institutes, topics, and keywords with CRUD and searchable academic records.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Flask', 'PostgreSQL'],
    github: 'https://github.com/suuslu/graduatethesissystemproject',
    demo: null,
    asset: '/assets/project-1.webp'
  },
  {
    title: 'Exam Security System',
    description: 'Exam-day verification platform for exam creation, room assignments, seating plans, camera-based check-in, violation logs, and reports.',
    tech: ['React', 'Vite', 'TypeScript', 'Express', 'MySQL', 'face-api.js'],
    github: 'https://github.com/suuslu/ExamSecuritySystem',
    demo: null,
    asset: '/assets/project-2.webp'
  },
  {
    title: 'Automatic Attendance System',
    description: 'Face recognition attendance platform with instructor, student, and admin workflows, correction requests, reports, and audit logs.',
    tech: ['Python', 'Flask', 'MySQL/MariaDB', 'face_recognition', 'HTML'],
    github: 'https://github.com/suuslu/AutomaticAttendanceSystem',
    demo: null,
    asset: '/assets/project-3.webp'
  },
  {
    title: 'Trackify',
    description: 'BLE proximity tracking prototype that scans an ESP32 device, reads RSSI, estimates Near/Medium/Far/Lost status, and triggers alerts.',
    tech: ['Python', 'Tkinter', 'bleak', 'ESP32 BLE'],
    github: 'https://github.com/suuslu/Trackify',
    demo: null,
    asset: '/assets/project-1.webp'
  },
  {
    title: 'Recep Gesture App',
    description: 'Webcam-based gesture recognition starter app using MediaPipe landmarks, scikit-learn training, and live gesture prediction.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'scikit-learn', 'Pandas'],
    github: 'https://github.com/suuslu/RecepIvedik',
    demo: null,
    asset: '/assets/project-2.webp'
  },
  {
    title: 'Virtual Debate Platform',
    description: 'Final project repository for a virtual debate platform, combining a web interface with HTML and supporting Java, Kotlin, and Python components.',
    tech: ['HTML', 'Kotlin', 'Java', 'Python'],
    github: 'https://github.com/suuslu/VirtualDebatePlatformFinal',
    demo: null,
    asset: '/assets/project-3.webp'
  }
];

export const skills: Skill[] = [
  { name: 'React', group: 'Frontend', icon: Code2 },
  { name: 'Vite', group: 'Frontend', icon: Code2 },
  { name: 'TypeScript', group: 'Frontend', icon: Code2 },
  { name: 'Tailwind CSS', group: 'Frontend', icon: Code2 },
  { name: 'HTML/CSS', group: 'Frontend', icon: Globe },
  { name: 'Python', group: 'Programming', icon: BarChart3 },
  { name: 'Java', group: 'Programming', icon: Code2 },
  { name: 'Kotlin', group: 'Programming', icon: Code2 },
  { name: 'Flask', group: 'Backend', icon: Server },
  { name: 'Express', group: 'Backend', icon: Server },
  { name: 'PostgreSQL', group: 'Database', icon: Database },
  { name: 'MySQL / MariaDB', group: 'Database', icon: Database },
  { name: 'XAMPP', group: 'Database', icon: Server },
  { name: 'phpMyAdmin', group: 'Database', icon: Database },
  { name: 'pgAdmin 4', group: 'Database', icon: Database },
  { name: 'face-api.js', group: 'ML / Vision', icon: Image },
  { name: 'face_recognition', group: 'ML / Vision', icon: Image },
  { name: 'OpenCV', group: 'ML / Vision', icon: Image },
  { name: 'MediaPipe', group: 'ML / Vision', icon: Image },
  { name: 'scikit-learn', group: 'ML / Data', icon: BarChart3 },
  { name: 'Pandas', group: 'ML / Data', icon: BarChart3 },
  { name: 'Tkinter', group: 'Desktop / IoT', icon: Globe },
  { name: 'bleak', group: 'Desktop / IoT', icon: Server },
  { name: 'ESP32 BLE', group: 'Desktop / IoT', icon: Server },
  { name: 'Excel Dashboards', group: 'Data', icon: FileSpreadsheet },
  { name: 'AutoCAD', group: 'Design', icon: PenTool },
  { name: 'Photoshop', group: 'Design', icon: Image },
  { name: 'SketchUp', group: 'Design', icon: Globe },
  { name: 'Rhinoceros 3D', group: 'Design', icon: Globe },
  { name: 'Community Leadership', group: 'Teams', icon: Users },
  { name: 'Course Coordination', group: 'Teams', icon: GraduationCap },
  { name: 'Project Organization', group: 'Communication', icon: Folder },
  { name: 'Email Collaboration', group: 'Communication', icon: Mail }
];

export const galleryImages = [
  { src: '/image0.png', alt: 'Portfolio photo 1', objectPosition: '50% 50%' },
  { src: '/image1.png', alt: 'Portfolio photo 2', objectPosition: '50% 50%' },
  { src: '/image2.jpg', alt: 'Portfolio photo 3', objectPosition: '50% 50%' },
  { src: '/image3.png', alt: 'Portfolio photo 4', objectPosition: '50% 50%' },
  { src: '/image4.JPG', alt: 'Portfolio photo 5', objectPosition: '50% 20%' },
  { src: '/kucuksucuk.jpg', alt: 'Portfolio photo 6', objectPosition: '50% 35%' }
];
