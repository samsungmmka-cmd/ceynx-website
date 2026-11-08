import type { IconName } from "@/components/icon";

/** CUBIPHY: CEYNX's interactive 3D physics practicals, built on the 3D learning platform. */
export const cubiphy = {
  name: "CUBIPHY",
  tagline: "Measure · Observe · Record · Share",
  summary:
    "Interactive 3D physics practicals that let students handle real lab apparatus on screen, follow guided theory, take readings and share results with their class.",
  features: [
    { icon: "cube" as IconName, title: "Real apparatus in 3D", text: "Vernier caliper, micrometer screw gauge and more, modelled to scale." },
    { icon: "compass" as IconName, title: "Guided theory steps", text: "Least count, zero error and method explained before students measure." },
    { icon: "pen" as IconName, title: "Measure and record", text: "Students take readings in the 3D lab and record them in their worksheet." },
    { icon: "users" as IconName, title: "Class discussion", text: "Results are shared with the class for discussion and comparison." },
    { icon: "chart" as IconName, title: "Student dashboard", text: "Progress and assignments for every learner in one place." },
    { icon: "globe" as IconName, title: "Three languages", text: "English, Sinhala and Tamil, in dark and light mode." },
  ],
};
