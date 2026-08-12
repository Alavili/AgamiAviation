export interface SolutionSectionContent {
  number: string; // "01", "02"
  heading: string; // PENDING_CLIENT_CONTENT
  body: string; // PENDING_CLIENT_CONTENT
  items: string[]; // PENDING_CLIENT_CONTENT
}

export interface SolutionsContent {
  hero: {
    heading: string; // PENDING_CLIENT_CONTENT
    subhead: string; // PENDING_CLIENT_CONTENT
    backgroundImage: string; // PENDING_CLIENT_CONTENT
  };
  sections: SolutionSectionContent[];
}

// Two confirmed sections per PROJECT_PLAN.md §1a — footer's 5 "Solution" links
// are placeholder and point at these two (with anchors) instead of 5 stub pages.
export const solutionsContent: SolutionsContent = {
  hero: {
    heading: "", // PENDING_CLIENT_CONTENT
    subhead: "", // PENDING_CLIENT_CONTENT
    backgroundImage: "", // PENDING_CLIENT_CONTENT
  },
  sections: [
    {
      number: "01",
      heading: "Integrated Aircraft GSU System", // PENDING_CLIENT_CONTENT
      body: "", // PENDING_CLIENT_CONTENT
      items: ["PCA", "GPU", "Potable Water", "Sewage", "Blue Water"], // PENDING_CLIENT_CONTENT
    },
    {
      number: "02",
      heading: "Solutions Offered / Scope of Services", // PENDING_CLIENT_CONTENT
      body: "", // PENDING_CLIENT_CONTENT
      items: [
        "Fume Extraction", // PENDING_CLIENT_CONTENT
        "Aircraft Docking", // PENDING_CLIENT_CONTENT
        "Maintenance Platforms", // PENDING_CLIENT_CONTENT
        "Engine Handling", // PENDING_CLIENT_CONTENT
        "System Design & Engineering", // PENDING_CLIENT_CONTENT
        "Airside Systems Integration", // PENDING_CLIENT_CONTENT
      ],
    },
  ],
};
