// lib\data\projects.ts
// lib/data/projects.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  featured: boolean;
  year: number;
  orientation: "vertical" | "horizontal";
  projectType: "Indie" | "Collab";
  sortOrder: number; //
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
    title: "Faithful Streak App",
    description:
      "Full-stack e-commerce platform with payment integration, admin dashboard, and real-time inventory management.",
    image: "https://picsum.photos/seed/project5/800/600",
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
    demoUrl: null,
    featured: true,
    year: 2026,
    orientation: "horizontal",
    projectType: "Collab",
    sortOrder: 1,
  },
];
