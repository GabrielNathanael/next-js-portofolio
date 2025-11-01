export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies: string[];
  employmentType:
    | "Full-time"
    | "Internship"
    | "Part-time"
    | "Contract"
    | "Freelance";
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
      "Developed full-stack web applications to support Interlace Studies business operations, focusing on deployment, security, and authentication. Conducted testing, documentation, and team collaboration.",
    technologies: ["Next.js", "TypeScript"],
    employmentType: "Internship",
  },
  {
    id: "2",
    position: "Full Stack Web Developer",
    company: "Interlace Studies Bali",
    location: "Denpasar, Indonesia",
    startDate: "2025-08",
    endDate: null,
    description:
      "Developed full-stack web applications to support Interlace Studies business operations, focusing on deployment, security, and authentication. Conducted testing, documentation, and team collaboration.",
    technologies: ["Next.js", "TypeScript"],
    employmentType: "Internship",
  },
  {
    id: "3",
    position: "Full Stack Web Developer",
    company: "Interlace Studies Bali",
    location: "Denpasar, Indonesia",
    startDate: "2025-08",
    endDate: null,
    description:
      "Developed full-stack web applications to support Interlace Studies business operations, focusing on deployment, security, and authentication. Conducted testing, documentation, and team collaboration.",
    technologies: ["Next.js", "TypeScript"],
    employmentType: "Internship",
  },
  {
    id: "4",
    position: "Full Stack Web Developer",
    company: "Interlace Studies Bali",
    location: "Denpasar, Indonesia",
    startDate: "2025-08",
    endDate: null,
    description:
      "Developed full-stack web applications to support Interlace Studies business operations, focusing on deployment, security, and authentication. Conducted testing, documentation, and team collaboration.",
    technologies: ["Next.js", "TypeScript"],
    employmentType: "Internship",
  },
];
