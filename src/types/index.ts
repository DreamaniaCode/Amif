export type Locale = 'fr' | 'ar';

export interface Dictionary {
  nav: {
    home: string;
    about: string;
    missions: string;
    poles: string;
    team: string;
    blog: string;
    contact: string;
    join: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  about: {
    tag: string;
    title: string;
    text: string;
    stat1_val: string;
    stat1_label: string;
    stat2_val: string;
    stat2_label: string;
    stat3_val: string;
    stat3_label: string;
  };
  missions: {
    tag: string;
    title: string;
    subtitle: string;
    items: string[];
  };
  poles: {
    tag: string;
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  team: {
    tag: string;
    title: string;
    subtitle: string;
  };
  blog: {
    tag: string;
    title: string;
    subtitle: string;
    readMore: string;
    allPosts: string;
    categories: Record<string, string>;
  };
  contact: {
    tag: string;
    title: string;
    subtitle: string;
    formContact: string;
    formMembership: string;
    formPartnership: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    profession: string;
    city: string;
    motivation: string;
    orgName: string;
    contactPerson: string;
    partnershipType: string;
    send: string;
    success: string;
    error: string;
    required: string;
  };
  footer: {
    desc: string;
    copyright: string;
    quickLinks: string;
    followUs: string;
  };
  admin: Record<string, string | Record<string, string>>;
}
