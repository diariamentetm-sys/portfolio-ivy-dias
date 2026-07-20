export type CaseSectionProps = {
  number: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
};

export type RuleBar = { t: string; v: number; pct: string };

export type PaletteColor = { hex: string; name: string };

export type FunilItem = { s: string; n: number; d: string; w: string };

export type Persona = {
  nome: string;
  meta: string;
  tags: string[];
  mot: string;
  obj: string;
  img?: string;
  imgAlt?: string;
};

export type Fase = { n: string; t: string; d: string; m: string[] };

export type Pain = { n: string; t: string; d: string };

export type StepItem = { n: string; t: string; d: string };

export type Oportunidade = { n: string; tag: string; t: string; d: string };

export type Impacto = { n: string; t: string };

export type CardImage = { src: string; alt: string };

export type AbTestBlock = {
  label: string;
  title: string;
  duration: string;
  device: string;
  metric: string;
  result: string;
  resultLabel: string;
  image: string;
  imageAlt: string;
  imageFirst?: boolean;
};
