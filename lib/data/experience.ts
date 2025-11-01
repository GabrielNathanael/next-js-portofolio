// lib\data\experience.ts

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies: string[];
  tools?: string[];
  responsibilities?: string[];
  website?: string | null;
  employmentType:
    | "Full-time"
    | "Internship"
    | "Part-time"
    | "Contract"
    | "Freelance";
  iscurrent?: boolean;
}

export const experiences: Experience[] = [
  {
    id: "1",
    position: "Full Stack Web Developer",
    company: "Interlace Studies Bali",
    location: "Denpasar, Indonesia",
    startDate: "2025-08",
    endDate: null,
    description:
      "Developed and maintained full-stack web applications to support internal operations, focusing on deployment, security, and authentication. Conducted testing, documentation, and team collaboration.",
    technologies: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    tools: ["GitHub", "Vercel", "Notion"],
    responsibilities: [
      "Developed internal web applications using Next.js and TypeScript.",
      "Implemented secure authentication and role-based access control.",
      "Collaborated with a 3-member team to optimize deployment pipelines.",
      "Documented workflows and improved code maintainability.",
    ],
    website: "https://interlacestudies.com",
    employmentType: "Internship",
    iscurrent: true,
  },
  {
    id: "2",
    position: "Frontend Developer",
    company: "Freelance Project",
    location: "Remote",
    startDate: "2024-12",
    endDate: "2025-03",
    description:
      "Built responsive web interfaces and reusable UI components for small business clients, focusing on clean design and performance.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    tools: ["Figma", "Vite", "GitHub"],
    responsibilities: [
      "Designed and developed user interfaces with React.",
      "Optimized UI performance and accessibility.",
      "Collaborated with clients for design iterations and feedback.",
    ],
    website: "https://exampleclient.com",
    employmentType: "Freelance",
    iscurrent: false,
  },
  {
    id: "3",
    position: "Frontend Developer",
    company: "Freelance Project",
    location: "Remote",
    startDate: "2024-12",
    endDate: "2025-03",
    description:
      "Built responsive web interfaces and reusable UI components for small business clients, focusing on clean design and performance.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    tools: ["Figma", "Vite", "GitHub"],
    responsibilities: [
      "Designed and developed user interfaces with React.",
      "Optimized UI performance and accessibility.",
      "Collaborated with clients for design iterations and feedback.",
    ],
    website: "https://exampleclient.com",
    employmentType: "Freelance",
    iscurrent: false,
  },
  {
    id: "4",
    position: "Frontend Developer",
    company: "Freelance Project",
    location: "Remote",
    startDate: "2024-12",
    endDate: "2025-03",
    description:
      "Built responsive web interfaces and reusable UI components for small business clients, focusing on clean design and performance.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    tools: ["Figma", "Vite", "GitHub"],
    responsibilities: [
      "Designed and developed user interfaces with React.",
      "Optimized UI performance and accessibility.",
      "Collaborated with clients for design iterations and feedback.",
    ],
    website: "https://exampleclient.com",
    employmentType: "Freelance",
    iscurrent: false,
  },
  {
    id: "5",
    position: "Frontend Developer",
    company: "Freelance Project",
    location: "Remote",
    startDate: "2024-12",
    endDate: "2025-03",
    description:
      "Built responsive web interfaces and reusable UI components for small business clients, focusing on clean design and performance.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    tools: ["Figma", "Vite", "GitHub"],
    responsibilities: [
      "Designed and developed user interfaces with React.",
      "Optimized UI performance and accessibility.",
      "Collaborated with clients for design iterations and feedback.",
    ],
    website: "https://exampleclient.com",
    employmentType: "Freelance",
    iscurrent: false,
  },
  {
    id: "6",
    position: "Frontend Developer",
    company: "Freelance Project",
    location: "Remote",
    startDate: "2024-12",
    endDate: "2025-03",
    description:
      "Built responsive web interfaces and reusable UI components for small business clients, focusing on clean design and performance.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    tools: ["Figma", "Vite", "GitHub"],
    responsibilities: [
      "Designed and developed user interfaces with React.",
      "Optimized UI performance and accessibility.",
      "Collaborated with clients for design iterations and feedback.",
    ],
    website: null,
    employmentType: "Freelance",
    iscurrent: true,
  },
];
