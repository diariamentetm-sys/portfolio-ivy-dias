# Cashlog Raízen — source do design system

Fica no mesmo repositório, sem mudar onde o case embute o protótipo.

| Caminho | Papel |
|---|---|
| `public/embeds/cashlog` | Protótipo do case (iframe) — **não alterar estilos do portfólio** |
| `src/embeds/cashlog` | Design system + futuras telas |
| `public/embeds/cashlog/ds` | Build do workshop (`npm run cashlog:build`) |

Isolamento visual:
- Tailwind do portfólio **ignora** `src/embeds/**`
- Este app usa `tailwind.cashlog.config.js` + `tokens.css` próprios
- Nada daqui é importado por `src/main.tsx` / `src/index.css`

```bash
npm run cashlog:dev     # workshop (porta 5174)
npm run cashlog:build   # publica em /embeds/cashlog/ds
```
