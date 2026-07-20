export type PortfolioPage =
  | "home"
  | "cashlog"
  | "claro"
  | "abtest"
  | "etitulo";

export type Step = { n: string; label: string };

export type Specialty = { num: string; title: string; desc: string };

export type TimelineItem = {
  period: string;
  company: string;
  role: string;
  scope: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  featured?: boolean;
};

export type MetaItem = { k: string; v: string };

export type ProfileItem = { t: string; d: string };

export type CasePreview = {
  id: string;
  n: string;
  kicker: string;
  subtitle: string;
  title: string;
  description: string;
  accent: string;
  path: string;
  ctaColor: string;
  ctaTextColor?: string;
};

export type CaseStudyConfig = {
  id: string;
  path: string;
  accent: string;
  breadcrumb: string;
  kicker: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  tags: string[];
  meta: MetaItem[];
  about: string[];
  headerStats?: { value: string; label: string }[];
  next?: { label: string; path: string; darkText?: boolean };
};
