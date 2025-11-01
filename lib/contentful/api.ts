// lib\contentful\api.ts
// lib/contentful/api.ts
import { contentfulClient } from "./client";
import {
  transformProject,
  transformCertificate,
  transformExperience,
  transformProfile,
  generateTagCategories,
} from "./transformers";
import {
  ProjectSkeleton,
  CertificateSkeleton,
  ExperienceSkeleton,
  TagSkeleton,
  ProfileSkeleton,
  Project,
  Certificate,
  Experience,
  Profile,
} from "./types";

/**
 * Fetch all Projects from Contentful
 * Used in: /projects page, FeaturedProjects component
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await contentfulClient.getEntries<ProjectSkeleton>({
      content_type: "project",
      include: 2, // Include linked entries (tags)
    });

    return response.items.map(transformProject);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

/**
 * Fetch all Certificates from Contentful
 * Used in: /certificates page, LatestCertificates component
 */
export async function getCertificates(): Promise<Certificate[]> {
  try {
    const response = await contentfulClient.getEntries<CertificateSkeleton>({
      content_type: "certificate",
    });

    return response.items.map(transformCertificate);
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return [];
  }
}

/**
 * Fetch all Experiences from Contentful
 * Used in: /experience page, RecentExperience component
 */
export async function getExperiences(): Promise<Experience[]> {
  try {
    const response = await contentfulClient.getEntries<ExperienceSkeleton>({
      content_type: "experience",
    });

    return response.items.map(transformExperience);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

/**
 * Fetch all Tags and generate categories
 * Used in: /projects page for ProjectFilter
 */
export async function getTagsWithCategories(): Promise<{
  tags: string[];
  categories: Record<string, string[]>;
}> {
  try {
    const response = await contentfulClient.getEntries<TagSkeleton>({
      content_type: "tag",
    });

    const tagEntries = response.items;

    // Extract all tag names
    const tags = tagEntries.map((tag) => tag.fields.name as string);

    // Generate categories
    const categories = generateTagCategories(tagEntries);

    return { tags, categories };
  } catch (error) {
    console.error("Error fetching tags:", error);
    return { tags: [], categories: {} };
  }
}

/**
 * Get Featured Projects (for homepage)
 * Filters by featured flag, sorts by sortOrder
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();

  return projects
    .filter((p) => p.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 3);
}

/**
 * Get Latest Certificates (for homepage)
 * Sorts by year descending, takes top 3
 */
export async function getLatestCertificates(): Promise<Certificate[]> {
  const certificates = await getCertificates();

  return certificates
    .sort((a, b) => Number(b.year) - Number(a.year))
    .slice(0, 3);
}

/**
 * Get Recent Experience (for homepage)
 * Prioritizes current jobs, sorts by startDate descending
 */
export async function getRecentExperience(): Promise<Experience | null> {
  const experiences = await getExperiences();

  if (experiences.length === 0) return null;

  // Sort: current jobs first, then by start date
  const sorted = experiences.sort((a, b) => {
    if (a.iscurrent && !b.iscurrent) return -1;
    if (!a.iscurrent && b.iscurrent) return 1;

    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });

  return sorted[0];
}

/**
 * Fetch Profile (photo & resume)
 * Used in: Hero component
 */
export async function getProfile(): Promise<Profile | null> {
  try {
    const response = await contentfulClient.getEntries<ProfileSkeleton>({
      content_type: "profile",
      limit: 1,
    });

    if (response.items.length === 0) return null;

    return transformProfile(response.items[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}
