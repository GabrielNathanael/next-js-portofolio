// lib\data\projects.ts
// lib/data/projects.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  featured: boolean;
  year: number;
  orientation: "vertical" | "horizontal";
}

export const TAG_CATEGORIES: Record<string, string[]> = {
  Languages: ["JavaScript", "TypeScript", "Python", "PHP", "Kotlin"],
  Frameworks: ["Next.js", "React.js", "Laravel"],
  Styling: ["Tailwind CSS"],
  "Database & ORM": ["Prisma", "MySQL", "PostgreSQL"],
  "Cloud & Services": ["AWS", "Google Cloud", "Firebase"],
  Tools: ["Docker", "Git"],
};

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce platform with payment integration, admin dashboard, and real-time inventory management.",
    image: "https://picsum.photos/seed/project1/800/600",
    tags: [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "AWS",
      "Docker",
    ],
    githubUrl: "https://github.com/yourusername/project1",
    featured: true,
    year: 2026,
    orientation: "horizontal",
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates and team collaboration features.",
    image: "https://picsum.photos/seed/project2/600/800",
    tags: [
      "React.js",
      "JavaScript",
      "Firebase",
      "Tailwind CSS",
      "Google Cloud",
      "Git",
    ],
    githubUrl: "https://github.com/yourusername/project2",
    featured: true,
    year: 2024,
    orientation: "vertical",
  },
  {
    id: "3",
    title: "AI Chat Assistant",
    description:
      "Intelligent chatbot with NLP, real-time responses, and integration to cloud APIs.",
    image: "https://picsum.photos/seed/project3/800/600",
    tags: ["Python", "Next.js", "AWS", "PostgreSQL", "Docker", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/project3",
    featured: true,
    year: 2023,
    orientation: "horizontal",
  },
  {
    id: "4",
    title: "Portfolio CMS",
    description:
      "Headless CMS for portfolio management with modular components and live preview.",
    image: "https://picsum.photos/seed/project4/600/800",
    tags: ["PHP", "Laravel", "MySQL", "Tailwind CSS", "Git", "Google Cloud"],
    githubUrl: "https://github.com/yourusername/project4",
    featured: false,
    year: 2023,
    orientation: "vertical",
  },
  {
    id: "5",
    title: "Weather Dashboard",
    description:
      "Real-time weather visualization dashboard with forecast and historical trend analytics.",
    image: "https://picsum.photos/seed/project5/800/600",
    tags: ["React.js", "TypeScript", "Prisma", "PostgreSQL", "AWS", "Docker"],
    githubUrl: "https://github.com/yourusername/project5",
    featured: false,
    year: 2023,
    orientation: "horizontal",
  },
  {
    id: "6",
    title: "Fitness Tracker",
    description:
      "Mobile-first fitness tracking app with goal planning, workout logs, and cloud backup.",
    image: "https://picsum.photos/seed/project6/600/800",
    tags: ["Kotlin", "Firebase", "Tailwind CSS", "Google Cloud", "Git"],
    githubUrl: "https://github.com/yourusername/project6",
    featured: false,
    year: 2023,
    orientation: "vertical",
  },
  {
    id: "7",
    title: "Restaurant POS",
    description:
      "Point of Sale system for restaurants with offline-first architecture and analytics dashboard.",
    image: "https://picsum.photos/seed/project7/800/600",
    tags: ["Laravel", "PHP", "JavaScript", "MySQL", "Docker", "AWS"],
    githubUrl: "https://github.com/yourusername/project7",
    featured: false,
    year: 2023,
    orientation: "horizontal",
  },
  {
    id: "8",
    title: "Learning Platform",
    description:
      "Online learning platform with video lessons, quizzes, instructor dashboard, and progress tracking.",
    image: "https://picsum.photos/seed/project8/800/600",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Google Cloud",
    ],
    githubUrl: "https://github.com/yourusername/project8",
    featured: false,
    year: 2023,
    orientation: "horizontal",
  },
];
