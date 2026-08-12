export interface ContactContent {
  hero: {
    heading: string; // PENDING_CLIENT_CONTENT
    subhead: string; // PENDING_CLIENT_CONTENT
    backgroundImage: string; // PENDING_CLIENT_CONTENT
  };
  offices: Array<{
    label: string; // PENDING_CLIENT_CONTENT
    address: string; // PENDING_CLIENT_CONTENT
    lat: number; // PENDING_CLIENT_CONTENT
    lng: number; // PENDING_CLIENT_CONTENT
  }>;
}

export const contactContent: ContactContent = {
  hero: {
    heading: "", // PENDING_CLIENT_CONTENT
    subhead: "", // PENDING_CLIENT_CONTENT
    backgroundImage: "", // PENDING_CLIENT_CONTENT
  },
  offices: [],
};
