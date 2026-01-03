import { Code2, Palette, Cloud, Shield, Database } from "lucide-react";
import {
  SiCplusplus,
  SiPython,
  SiPhp,
  SiJavascript,
  SiTypescript,
  SiKotlin,
  SiNextdotjs,
  SiReact,
  SiLaravel,
  SiAmazon,
  SiGooglecloud,
  SiVite,
  SiDocker,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiTailwindcss,
  SiNodedotjs,
} from "react-icons/si";
import { IoShieldOutline } from "react-icons/io5";

export interface TechItem {
  name: string;
  category:
    | "language"
    | "framework"
    | "cloud"
    | "security"
    | "database"
    | "tools";
  icon: React.ComponentType<{ className?: string }>;
  color: string; // warna khusus tiap ikon
}

export const techStack: TechItem[] = [
  // Row 1: Web Development Focus (10 items)
  {
    name: "Next.js",
    category: "framework",
    icon: SiNextdotjs,
    color: "text-gray-900 dark:text-gray-100",
  },
  {
    name: "React",
    category: "framework",
    icon: SiReact,
    color: "text-cyan-500 dark:text-cyan-400",
  },
  {
    name: "TypeScript",
    category: "language",
    icon: SiTypescript,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "JavaScript",
    category: "language",
    icon: SiJavascript,
    color: "text-yellow-400 dark:text-yellow-300",
  },
  {
    name: "Node.js",
    category: "framework",
    icon: SiNodedotjs,
    color: "text-green-600 dark:text-green-400",
  },
  {
    name: "Vite",
    category: "framework",
    icon: SiVite,
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    name: "Tailwind CSS",
    category: "framework",
    icon: SiTailwindcss,
    color: "text-cyan-600 dark:text-cyan-400",
  },
  {
    name: "Laravel",
    category: "framework",
    icon: SiLaravel,
    color: "text-red-600 dark:text-red-400",
  },
  {
    name: "PHP",
    category: "language",
    icon: SiPhp,
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    name: "MySQL",
    category: "database",
    icon: SiMysql,
    color: "text-blue-600 dark:text-blue-400",
  },

  // Row 2: Other Tech (9 items)
  {
    name: "PostgreSQL",
    category: "database",
    icon: SiPostgresql,
    color: "text-blue-700 dark:text-blue-500",
  },
  {
    name: "Docker",
    category: "tools",
    icon: SiDocker,
    color: "text-blue-500 dark:text-blue-400",
  },
  {
    name: "Git",
    category: "tools",
    icon: SiGit,
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    name: "AWS",
    category: "cloud",
    icon: SiAmazon,
    color: "text-orange-500 dark:text-orange-400",
  },
  {
    name: "Google Cloud",
    category: "cloud",
    icon: SiGooglecloud,
    color: "text-blue-500 dark:text-blue-400",
  },
  {
    name: "Python",
    category: "language",
    icon: SiPython,
    color: "text-yellow-500 dark:text-yellow-400",
  },
  {
    name: "C++",
    category: "language",
    icon: SiCplusplus,
    color: "text-sky-600 dark:text-sky-400",
  },
  {
    name: "Kotlin",
    category: "language",
    icon: SiKotlin,
    color: "text-purple-500 dark:text-purple-400",
  },
  {
    name: "Cyber Security",
    category: "security",
    icon: IoShieldOutline,
    color: "text-emerald-600 dark:text-emerald-400",
  },
];

export const techCategories = {
  language: { label: "Languages", icon: Code2 },
  framework: { label: "Frameworks", icon: Palette },
  database: { label: "Database", icon: Database },
  cloud: { label: "Cloud", icon: Cloud },
  tools: { label: "Tools", icon: Code2 },
  security: { label: "Cyber Security", icon: Shield },
};
