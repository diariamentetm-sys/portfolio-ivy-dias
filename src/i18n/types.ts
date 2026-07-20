export type Locale = "en" | "pt";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "ivy-portfolio-locale";

export type NavKey =
  | "about"
  | "specialties"
  | "work"
  | "testimonials"
  | "timeline"
  | "contact";

export type Dictionary = {
  nav: Record<NavKey, string>;
  hero: {
    tags: string[];
    titleBefore: string;
    titleAccent: string;
    subtitle: string;
    ctaWork: string;
    ctaContact: string;
    role: string;
    location: string;
    stats: { value: string; label: string }[];
    imageAlt: string;
  };
  about: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    brandsLabel: string;
    brands: string;
    languages: string[];
  };
  specialties: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { num: string; title: string; desc: string }[];
  };
  work: {
    eyebrow: string;
    title: string;
    intro: string;
    countLabel: string;
    cta: string;
    industryEyebrow: string;
    industryTitle: string;
    industries: { label: string; brands: string }[];
    cases: {
      id: string;
      n: string;
      kicker: string;
      subtitle: string;
      title: string;
      description: string;
      path: string;
    }[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    intro: string;
    linkedinCta: string;
    items: {
      name: string;
      role: string;
      quote: string;
      featured?: boolean;
    }[];
  };
  timeline: {
    eyebrow: string;
    title: string;
    items: { period: string; company: string; role: string; scope: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tags: string[];
    photoAlt: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    formHint: string;
    formError: string;
    successTitle: string;
    successBody: string;
  };
  footer: {
    role: string;
  };
  caseChrome: {
    back: string;
    allWork: string;
    aboutProject: string;
  };
  admin: {
    title: string;
    loginTitle: string;
    password: string;
    login: string;
    logout: string;
    heroTab: string;
    projectsTab: string;
    contactTab: string;
    save: string;
    saving: string;
    saved: string;
    saveError: string;
    uploadImage: string;
    uploading: string;
    imageUrl: string;
    heroImage: string;
    contactImage: string;
    addProject: string;
    deleteProject: string;
    publish: string;
    unpublish: string;
    editEn: string;
    editPt: string;
  };
};
