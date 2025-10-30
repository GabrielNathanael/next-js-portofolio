import { Code2, Palette, Cloud, Shield } from "lucide-react";
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
} from "react-icons/si";

export interface TechItem {
  name: string;
  category: "language" | "framework" | "cloud" | "security";
  icon: React.ComponentType<{ className?: string }>;
  color: string; // warna khusus tiap ikon
}

export const techStack: TechItem[] = [
  // Languages
  {
    name: "C++",
    category: "language",
    icon: SiCplusplus,
    color: "text-sky-600 dark:text-sky-400",
  },
  {
    name: "Python",
    category: "language",
    icon: SiPython,
    color: "text-yellow-500 dark:text-yellow-400",
  },
  {
    name: "PHP",
    category: "language",
    icon: SiPhp,
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    name: "JavaScript",
    category: "language",
    icon: SiJavascript,
    color: "text-yellow-400 dark:text-yellow-300",
  },
  {
    name: "TypeScript",
    category: "language",
    icon: SiTypescript,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "Kotlin",
    category: "language",
    icon: SiKotlin,
    color: "text-purple-500 dark:text-purple-400",
  },

  // Frameworks
  {
    name: "Next.js",
    category: "framework",
    icon: SiNextdotjs,
    color: "text-gray-900 dark:text-gray-100",
  },
  {
    name: "React.js",
    category: "framework",
    icon: SiReact,
    color: "text-cyan-500 dark:text-cyan-400",
  },
  {
    name: "Laravel",
    category: "framework",
    icon: SiLaravel,
    color: "text-red-600 dark:text-red-400",
  },

  // Cloud
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

  // Security (teori aja)
  {
    name: "Cyber Security",
    category: "security",
    icon: Shield,
    color: "text-emerald-600 dark:text-emerald-400",
  },
];

export const techCategories = {
  language: { label: "Languages", icon: Code2 },
  framework: { label: "Frameworks", icon: Palette },
  cloud: { label: "Cloud", icon: Cloud },
  security: { label: "Cyber Security", icon: Shield },
};
