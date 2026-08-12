export interface AboutContent {
  hero: {
    heading: string; // PENDING_CLIENT_CONTENT
    subhead: string; // PENDING_CLIENT_CONTENT
    backgroundImage: string; // PENDING_CLIENT_CONTENT
  };
  intro: {
    body: string; // PENDING_CLIENT_CONTENT
    videoUrl: string; // PENDING_CLIENT_CONTENT
  };
  pullQuote: {
    quote: string; // PENDING_CLIENT_CONTENT
    attribution: string; // PENDING_CLIENT_CONTENT
  };
  missionVisionValue: Array<{
    title: string; // PENDING_CLIENT_CONTENT
    body: string; // PENDING_CLIENT_CONTENT
  }>;
}

export const aboutContent: AboutContent = {
  hero: {
    heading: "", // PENDING_CLIENT_CONTENT
    subhead: "", // PENDING_CLIENT_CONTENT
    backgroundImage: "", // PENDING_CLIENT_CONTENT
  },
  intro: {
    body: "", // PENDING_CLIENT_CONTENT
    videoUrl: "", // PENDING_CLIENT_CONTENT
  },
  pullQuote: {
    quote: "", // PENDING_CLIENT_CONTENT
    attribution: "", // PENDING_CLIENT_CONTENT
  },
  missionVisionValue: [
    { title: "Mission", body: "" }, // PENDING_CLIENT_CONTENT
    { title: "Vision", body: "" }, // PENDING_CLIENT_CONTENT
    { title: "Value", body: "" }, // PENDING_CLIENT_CONTENT
  ],
};
