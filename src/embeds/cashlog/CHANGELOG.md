# Changelog — Cashlog Design System

## 1.1.0 — 2026-07-31

### Changed

- Visual herdado do dashboard real (flat): Card **sem sombra**; MetricCard pastel lilac/yellow + trend/sparkline
- BarChart reescrito: barras **verticais** Real (magenta) × Aprovado (amarelo)
- Tokens: `theme.colors.chart.*`, `surface.kpiLilac|kpiYellow`; ink/muted/border alinhados ao prototipo
- Neutrals CSS: `--cashlog-ink`, `--cashlog-muted`, `--cashlog-border` como no Figma/desktop

### Added

- `LineChart` (Plano pontilhado × Real acumulado) + `DonutChart` (estados)
- Foundations/Charts atualizado com KPIs + três gráficos do dashboard

## 1.0.0 — 2026-07-31

### Added

- Tokens: `src/embeds/cashlog/tokens/` (primitives + theme + types)
- Componentes: Button, Swatch, App (workshop)
- Storybook + Chromatic (Fase 4)
- Agente Guardião: rules `ds-master`, `ds-tokens`, `ds-components`, `ds-accessibility`, `ds-storybook`, `ds-changelog`

### Changed

- Fase 6: md sincronizado com `theme.colors`; Swatch com `aria-hidden`; Button `type` default explícito
- Harness geral: 98%
- Foundations Storybook: Colors, Typography, Spacing (+ shadow), Charts
- Componentes: Card, MetricCard, BarChart + stories/MDX
- Tokens: `theme.shadow.sm` e `theme.shadow.md` (raros — tooltip/FAB, não cards)
