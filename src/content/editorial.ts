/**
 * Case studies and articles. Kept empty on purpose: the site shows an honest
 * "coming soon" state until real, approved content exists.
 * When you adopt a CMS (Sanity or Payload, per the blueprint), replace these arrays with CMS queries.
 */
export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  tech: string[];
  quote?: { text: string; author: string; role: string };
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  topic: string;
};

export const caseStudies: CaseStudy[] = [];
export const articles: Article[] = [];

export const plannedTopics = [
  "AI automation for small and medium businesses",
  "WhatsApp marketing that customers welcome",
  "How document AI replaces manual data entry",
  "Designing AI voice agents customers trust",
  "Why 3D learning improves understanding",
];

/** TODO(CEYNX): add open roles. */
export const openRoles: { title: string; type: string; location: string }[] = [];
