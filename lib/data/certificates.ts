export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
}

export const certificates: Certificate[] = Array.from(
  { length: 21 },
  (_, i) => ({
    id: `cert-${i + 1}`,
    title: `Certificate ${i + 1}`,
    issuer: i % 3 === 0 ? "Coursera" : i % 3 === 1 ? "Udemy" : "AWS Training",
    date: `202${3 + Math.floor(i / 7)}`,
    image: `https://picsum.photos/seed/cert${i + 1}/800/600`,
  })
);
