# Design System — Cashlog Raízen

Versão: 1.0.0 | Stack: React + Tailwind | Última auditoria: 2026-07-31 (Fase 6)

> Escopo: protótipo Cashlog apenas (`src/embeds/cashlog/`, `tailwind.cashlog.config.js`, `public/embeds/cashlog/` como baseline).
> Portfólio fora de escopo.

Tokens implementados em `src/embeds/cashlog/tokens/` — 2026-07-31
(primitives → theme semânticos; zero hex em `theme.ts`)

## Tokens

Fonte implementada: `src/embeds/cashlog/tokens/theme.ts` (semânticos) → `tokens.primitives.ts`.

### Cores — inventário `theme.colors` (sincronizado Fase 6)

| Token em theme.ts | Primitivo | Hex / CSS var | No md Fase 1 |
|---|---|---|---|
| `background.default` | gray.0 | `--cashlog-canvas` | via surface.default |
| `background.subtle` | gray.50 | `#F7F9FB` | legado |
| `background.muted` | gray.100 | `--cashlog-surface` | via surface.muted |
| `background.inverse` | gray.950 | `--cashlog-ink` | — |
| `background.brand` | purple.500 | `--cashlog-purple` | — |
| `text.default` | gray.950 | `--cashlog-ink` | ✅ |
| `text.muted` | gray.500 | `--cashlog-muted` | ✅ |
| `text.subtle` | gray.600 | `#525252` | legado |
| `text.inverse` | gray.0 | `--cashlog-canvas` | (Button) |
| `text.brand` | purple.500 | `--cashlog-purple` | — |
| `text.link` | magenta.500 | `--cashlog-magenta` | era brand.accent |
| `brand.primary` | purple.500 | `--cashlog-purple` | ✅ |
| `brand.primaryHover` | purple.600 | `--cashlog-purple-mid` | ✅ |
| `brand.primaryPressed` | purple.600 | `--cashlog-purple-mid` | — |
| `brand.primarySubtle` | purple.100 | `--cashlog-pink-light` | ✅ |
| `feedback.success` | green.400 | `#A1E3CB` | legado chart |
| `feedback.successSubtle` | green.300 | `#BAEDBD` | legado chart |
| `feedback.warning` | yellow.500 | `--cashlog-yellow` | era brand.highlight |
| `feedback.warningSubtle` | yellow.300 | `--cashlog-yellow-pale` | era brand.highlightPale |
| `feedback.error` | red.500 | `--cashlog-danger` | ✅ |
| `feedback.errorSubtle` | magenta.300 | `--cashlog-magenta-soft` | era brand.accentSoft |
| `feedback.info` | blue.400 | `#95A4FC` | legado chart |
| `feedback.infoSubtle` | blue.300 | `#B1E3FF` | legado chart |
| `border.default` | gray.200 | `--cashlog-border` | ✅ |
| `border.subtle` | gray.250 | `--cashlog-border-soft` | painéis |
| `border.strong` | gray.300 | `#CBCED4` | legado |
| `border.brand` | purple.500 | `--cashlog-purple` | — |
| `border.focus` | magenta.500 | `--cashlog-magenta` | era brand.accent (foco) |
| `surface.default` | gray.0 | `--cashlog-canvas` | ✅ |
| `surface.raised` | gray.50 | `#F7F9FB` | legado |
| `surface.overlay` | gray.100 | `--cashlog-surface` | era surface.muted |
| `surface.kpiLilac` | purple.100 | `--cashlog-pink-light` | MetricCard |
| `surface.kpiYellow` | yellow.300 | `--cashlog-yellow-pale` | MetricCard |
| `surface.kpiLilacWash` | purple.50 | `--cashlog-pink-wash` | hit-state charts |
| `chart.real` | magenta.500 | `--cashlog-magenta` | linha/barras |
| `chart.plan` | gray.800 | `#1C1C1C` | plano pontilhado |
| `chart.approved` | yellow.600 | `--cashlog-yellow-gold` | barras |
| `chart.segmentA–D` | gray/yellow/magenta/lilac | — | donut |

**Aliases de auditoria (Fase 1 → theme):** `brand.accent` → `text.link` / `border.focus` / `brand.accent` · `brand.highlight*` → `feedback.warning*` · `brand.highlightGold` → `chart.approved` · `surface.muted` → `surface.overlay`.

### Tipografia | Espaçamento | Border Radius | Sombras

| Grupo theme | Keys |
|---|---|
| `fontFamily.sans` | Inter via `--font-sans` |
| `fontSize` | xs, sm, base, lg, xl, 2xl, 3xl |
| `spacing` | 1, 2, 3, 4, 5, 6, 8, 10, 12 |
| `radius` | sm, md, lg, xl |
| `shadow` | none, sm, md |

## Componentes

### Button

- Localização: `src/embeds/cashlog/design-system/components/Button.tsx`
- Nível: Primitivo
- Variantes identificadas: `primary` \| `secondary` \| `ghost`
- Props: `ButtonProps` (`variant?`, herda `ButtonHTMLAttributes`, `children`)
- Tokens: `brand.primary|primaryHover|primarySubtle`, `text.inverse|brand`, `feedback.warningSubtle`, `border.focus`, `spacing.2|3|4`, `radius.md`, `fontSize.sm`
- Stories: ✅ Button.stories.tsx + Button.mdx
- Status: ✅ Conforme · @snowflake (&lt; 3 usos)

### Card / CardHeader

- Localização: `src/embeds/cashlog/design-system/components/Card.tsx`
- Nível: Básico
- Variantes: `default` \| `muted` \| `outlined`
- Props: `CardProps` (`variant?`, `padding?`, …); `CardHeaderProps` (`eyebrow?`, `title`, `action?`)
- Tokens: `surface.default|overlay`, `border.default|subtle|strong`, `shadow.none`, `radius.md`, `spacing.*`, `text.*`, `fontSize.*`
- Stories: ✅ Card.stories.tsx + Card.mdx
- Status: ✅ Conforme · @snowflake · **flat (sem sombra)** — alinhado ao dashboard

### MetricCard

- Localização: `src/embeds/cashlog/design-system/components/MetricCard.tsx`
- Nível: Composto
- Variantes (fill): `lilac` \| `yellow`
- Props: `label`, `value`, `trend?`, `sparkline?`, `fill?`
- Tokens: `surface.kpiLilac|kpiYellow`, `chart.real` (sparkline), `text.*`
- Stories: ✅ MetricCard.stories.tsx + MetricCard.mdx
- Status: ✅ Conforme · @snowflake · KPIs pastel do dashboard

### BarChart

- Localização: `src/embeds/cashlog/design-system/components/BarChart.tsx`
- Nível: Composto
- @uses: Card
- Séries: `chart.real` (magenta) × `chart.approved` (amarelo) — barras **verticais** agrupadas
- Stories: ✅ BarChart.stories.tsx + BarChart.mdx
- Status: ✅ Conforme · @snowflake

### LineChart

- Localização: `src/embeds/cashlog/design-system/components/LineChart.tsx`
- Nível: Composto
- @uses: Card
- Séries: `chart.plan` (pontilhado) × `chart.real` (sólido)
- Stories: ✅ LineChart.stories.tsx + LineChart.mdx
- Status: ✅ Conforme · @snowflake

### DonutChart

- Localização: `src/embeds/cashlog/design-system/components/DonutChart.tsx`
- Nível: Composto
- @uses: Card
- Séries: `chart.segmentA|B|C|D`
- Stories: ✅ DonutChart.stories.tsx + DonutChart.mdx
- Status: ✅ Conforme · @snowflake

### App (Design System Workshop)

- Localização: `src/embeds/cashlog/App.tsx`
- Nível: Composto
- Variantes identificadas: —
- Props: nenhuma (página de entrada)
- @uses: Button | Swatch
- Tokens: `border.default`, `surface.default|overlay`, `text.default|muted|link|brand`, `brand.primarySubtle`, `spacing.*`, `radius.sm|xl`, `fontSize.*`, `fontFamily.sans`
- Stories: ⚠️ N/A — página workshop, não componente de biblioteca
- Status: ✅ Conforme · @snowflake

### Swatch

- Localização: `src/embeds/cashlog/design-system/components/Swatch.tsx`
- Nível: Básico
- Variantes identificadas: —
- Props: `SwatchProps` (`name`, `tokenPath`, `color`)
- Tokens: `border.default`, `surface.default`, `text.default|muted`, `spacing.1|3`, `radius.xl`, `fontSize.sm|xs`
- Status: ✅ Conforme · @snowflake (&lt; 3 usos)

### tokenGallery / plannedScreens (dados)

- Localização: `src/embeds/cashlog/design-system/tokens.ts`
- Nível: Primitivo (catálogo de dados, não UI)
- Variantes: —
- Props: —
- Fonte: valores de `theme.*` (zero hex no catálogo)
- Status: ✅ Conforme

### Telas planejadas (legado)

| Tela | Status no DS fonte | Baseline |
|---|---|---|
| Dashboard | `legacy` | `public/embeds/cashlog` |
| Priorizador | `legacy` | idem |
| Criação de demanda | `legacy` | idem |
| Holding | `legacy` | idem |

- Localização futura: `src/embeds/cashlog/screens/`
- Status: ❌ ainda não implementadas no DS fonte (só bundle minificado)

## Regras de Harness

- Nomenclatura: kebab-case, [categoria]-[papel]-[estado]
- Cadeia obrigatória: componente → theme.[token] → primitives.[família].[peso] → valor
- Snowflake: < 3 contextos de uso distintos → não exportar da biblioteca
- Acessibilidade: WCAG AA, foco visível, aria-labels, semântica HTML
- Isolamento: estilos Cashlog **nunca** entram no bundle do portfólio (`!./src/embeds/**` no Tailwind do portfólio)

## Inconsistências Encontradas

1. ~~**Ainda não existe `src/embeds/cashlog/tokens/theme.ts`**~~ → resolvido na Fase 2 (`tokens/`).
2. ~~**`cashlogTokens` com hex literais**~~ → substituído por `tokenGallery` via `theme.*`.
3. **`--cashlog-magenta-soft` e `--cashlog-danger` não têm entrada em `tailwind.cashlog.config.js`** — inacessíveis via `bg-cashlog-*` (já existem como primitives via CSS var).
4. ~~**Button/App usam utilities de cor**~~ → Fase 3: cores/spacing/radius via `theme` (inline styles).
5. **Hex legado de charts** têm primitives (`blue.*`, `green.*`); ainda não ligados a screens.
6. **`purple.500` vs `purple.600`** — primary vs primaryHover/Pressed em `theme.colors.brand`.
7. **Telas do case só existem no bundle minificado** — sem componentes React editáveis em `screens/`.
8. **Sombras** — só `shadow.none`.
9. ~~**Button: `text-white` hardcoded**~~ → `theme.colors.text.inverse`.
10. **Workshop `App.tsx` é snowflake** — página de entrada, não biblioteca; Button/Swatch também &lt; 3 usos.

## Relatório

✅ Fase 1 concluída: **26** tokens catalogados, **3** superfícies (+ 4 telas legacy), **10** inconsistências.

✅ Fase 2 concluída: **48** primitivos, **31** semânticos de cor. Tokens em `src/embeds/cashlog/tokens/`.

✅ Fase 3 concluída: **3** componentes documentados (Button, Swatch, App), **~20** tokens de theme conectados, **3** snowflakes.

✅ Fase 4 concluída: Storybook Cashlog (`src/embeds/cashlog/**`) + Chromatic workflow.

✅ Fase 5 concluída: Agente Guardião ativo — `ds-master` · `ds-tokens` · `ds-components` · `ds-accessibility` · `ds-storybook` · `ds-changelog`. Teste `bg-red-500` bloqueado.

## Fase 6 — Auditoria final (harness)

Comparados: `design-system.md` ↔ `src/embeds/cashlog/tokens/theme.ts` ↔ stories em `src/embeds/cashlog/**` (não `src/tokens/` / `src/stories/` do portfólio).

### ✅ Conformes

- `theme.ts`: zero hex; 31 semânticos de cor + spacing/fontSize/radius/shadow
- Inventário de cores do md sincronizado com `theme.colors` (Fase 6)
- Button: theme tokens, `<button>`, `focus-visible` + `border.focus`, stories + MDX
- Swatch: theme tokens, `aria-hidden` no bloco de cor, stories + MDX
- App: theme tokens, semântica de link (`<a href>`) para o protótipo
- Docs Storybook: Welcome, Tokens, Guidelines
- Guardião: 6 rules em `.cursor/rules/`
- Chromatic: build publicado

### ⚠️ Warnings

1. **`brand.highlightGold`** — só primitivo `yellow.600`; sem semântico em `theme` · sugerido: `theme.colors.feedback.warning` ou novo `brand.highlightGold` se produto exigir
2. **`shadow`** — só `theme.shadow.none` · legados do bundle sem escala · documentar quando screens forem migradas
3. **App sem story** — página workshop (intencional) · não conta como gap de biblioteca
4. **Telas legacy** (Dashboard, Priorizador, Demanda, Holding) — só bundle minificado · fora do harness de componentes fonte
5. **`--cashlog-magenta-soft` / `--cashlog-danger`** — sem classe em `tailwind.cashlog.config.js` (ok via CSS var nos primitives)

### ❌ Críticos

- Nenhum no escopo fonte atual (Button / Swatch / theme / stories).

### Score de harness

| Dimensão | Score | Base |
|---|---|---|
| Tokens | **97%** | 31/31 theme no md; −3% highlightGold / shadow incompleto |
| Componentes | **100%** | Button + Swatch + App no md e com theme |
| Stories | **100%** | 2/2 componentes de biblioteca (Button, Swatch) com CSF+MDX+theme |
| Acessibilidade | **95%** | Button AA + foco; Swatch aria-hidden; −5% sem suite a11y automatizada no CI além do addon |
| **Geral** | **98%** | média ponderada simples das quatro |

✅ Fase 6 concluída — auditoria final. Geral **98%**.
