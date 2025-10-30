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
    position: "Senior Full Stack Developer",
    company: "Tech Corp Indonesia",
    location: "Jakarta, Indonesia",
    startDate: "2023-01",
    endDate: null,
    description:
      "Leading development of enterprise web applications using modern tech stack. Mentoring junior developers and architecting scalable solutions.",
    technologies: ["Next.js", "TypeScript", "AWS", "Laravel"],
    employmentType: "Full-time",
  },
  // {
  //   id: "2",
  //   position: "Full Stack Developer",
  //   company: "StartUp Digital",
  //   location: "Bali, Indonesia",
  //   startDate: "2021-06",
  //   endDate: "2022-12",
  //   description:
  //     "Built and maintained multiple client projects from scratch. Implemented CI/CD pipelines and optimized application performance.",
  //   technologies: ["React.js", "PHP", "Google Cloud", "Python"],
  //   employmentType: "Full-time",
  // },
  // {
  //   id: "3",
  //   position: "Backend Developer",
  //   company: "Software House XYZ",
  //   location: "Surabaya, Indonesia",
  //   startDate: "2020-01",
  //   endDate: "2021-05",
  //   description:
  //     "Developed RESTful APIs and microservices. Worked on database optimization and system architecture.",
  //   technologies: ["Laravel", "PHP", "JavaScript", "AWS"],
  //   employmentType: "Internship",
  // },
];
