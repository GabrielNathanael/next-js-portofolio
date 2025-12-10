// lib/data/certificates.ts
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
  sortOrder: number;
}

export const certificates: Certificate[] = Array.from(
  { length: 21 },
  (_, i) => ({
    id: `cert-${i + 1}`,
    title: `Skills Boost Arcade Certification Zone July 2025 ${i + 1}`,
    issuer:
      i % 3 === 0
        ? "Google Cloud Skill Boost"
        : i % 3 === 1
        ? "Udemy"
        : "AWS Training",
    year: `202${3 + Math.floor(i / 7)}`,
    image: `https://picsum.photos/seed/cert${i + 1}/800/600`,
    sortOrder: i + 1,
  })
);
