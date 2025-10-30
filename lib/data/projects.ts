export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  featured: boolean;
  orientation: "vertical" | "horizontal";
}

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce platform with payment integration, admin dashboard, and real-time inventory management.",
    image: "https://picsum.photos/seed/project1/800/600",
    tags: ["Next.js", "TypeScript", "Laravel", "AWS"],
    githubUrl: "https://github.com/yourusername/project1",
    featured: true,
    orientation: "horizontal",
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates and team features.",
    image: "https://picsum.photos/seed/project2/600/800",
    tags: ["React.js", "TypeScript", "Google Cloud"],
    githubUrl: "https://github.com/yourusername/project2",
    featured: true,
    orientation: "vertical",
  },
  {
    id: "3",
    title: "AI Chat Assistant",
    description:
      "Intelligent chatbot with natural language processing capabilities and context awareness.",
    image: "https://picsum.photos/seed/project3/800/600",
    tags: ["Python", "Next.js", "AWS"],
    githubUrl: "https://github.com/yourusername/project3",
    featured: true,
    orientation: "horizontal",
  },
  {
    id: "4",
    title: "Portfolio CMS",
    description:
      "Content management system for portfolio websites with drag-and-drop builder.",
    image: "https://picsum.photos/seed/project4/600/800",
    tags: ["Next.js", "TypeScript", "PHP"],
    githubUrl: "https://github.com/yourusername/project4",
    featured: false,
    orientation: "vertical",
  },
  {
    id: "5",
    title: "Weather Dashboard",
    description:
      "Real-time weather monitoring dashboard with forecasts and historical data visualization.",
    image: "https://picsum.photos/seed/project5/800/600",
    tags: ["React.js", "JavaScript", "AWS"],
    githubUrl: "https://github.com/yourusername/project5",
    featured: false,
    orientation: "horizontal",
  },
  {
    id: "6",
    title: "Fitness Tracker",
    description:
      "Mobile-first fitness tracking app with workout plans and progress analytics.",
    image: "https://picsum.photos/seed/project6/600/800",
    tags: ["Kotlin", "Python"],
    githubUrl: "https://github.com/yourusername/project6",
    featured: false,
    orientation: "vertical",
  },
  {
    id: "7",
    title: "Restaurant POS",
    description:
      "Point of sale system for restaurants with order management and kitchen display.",
    image: "https://picsum.photos/seed/project7/800/600",
    tags: ["Laravel", "PHP", "JavaScript"],
    githubUrl: "https://github.com/yourusername/project7",
    featured: false,
    orientation: "horizontal",
  },
  {
    id: "8",
    title: "Learning Platform",
    description:
      "Online learning platform with video courses, quizzes, and progress tracking.",
    image: "https://picsum.photos/seed/project8/800/600",
    tags: ["Next.js", "TypeScript", "Google Cloud"],
    githubUrl: "https://github.com/yourusername/project8",
    featured: false,
    orientation: "horizontal",
  },
];
