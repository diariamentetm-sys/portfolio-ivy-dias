import { Button, Swatch, plannedScreens, tokenGallery } from "./design-system";
import { theme } from "./tokens/theme";

/**
 * @description Workshop do design system Cashlog — tokens, primitivos e telas planejadas.
 * @variant —
 * @uses Button | Swatch
 * @usedBy main.tsx
 * @tokens theme.colors.border.default, focus | theme.colors.surface.default, overlay | theme.colors.text.default, muted, link, brand | theme.colors.brand.primarySubtle | theme.spacing.* | theme.radius.xl | theme.fontSize.*
 * @snowflake
 */
export function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.colors.surface.overlay,
        color: theme.colors.text.default,
        fontFamily: theme.fontFamily.sans,
      }}
    >
      <header
        className="border-b"
        style={{
          borderColor: theme.colors.border.default,
          backgroundColor: theme.colors.surface.default,
        }}
      >
        <div
          className="mx-auto flex max-w-5xl flex-col sm:flex-row sm:items-end sm:justify-between"
          style={{
            gap: theme.spacing[4],
            paddingLeft: theme.spacing[6],
            paddingRight: theme.spacing[6],
            paddingTop: theme.spacing[8],
            paddingBottom: theme.spacing[8],
          }}
        >
          <div>
            <p
              className="font-semibold uppercase"
              style={{
                color: theme.colors.text.link,
                fontSize: theme.fontSize.xs,
                letterSpacing: "0.14em",
              }}
            >
              Cashlog · Raízen
            </p>
            <h1
              className="font-semibold tracking-tight"
              style={{
                marginTop: theme.spacing[2],
                color: theme.colors.text.default,
                fontSize: theme.fontSize["3xl"],
              }}
            >
              Design System
            </h1>
            <p
              className="max-w-xl leading-relaxed"
              style={{
                marginTop: theme.spacing[2],
                color: theme.colors.text.muted,
                fontSize: theme.fontSize.sm,
              }}
            >
              Fonte em{" "}
              <code
                style={{
                  borderRadius: theme.radius.sm,
                  backgroundColor: theme.colors.surface.overlay,
                  paddingLeft: theme.spacing[2],
                  paddingRight: theme.spacing[2],
                  paddingTop: theme.spacing[1],
                  paddingBottom: theme.spacing[1],
                  color: theme.colors.text.brand,
                }}
              >
                src/embeds/cashlog
              </code>
              . Tokens e CSS próprios — não entram no bundle do portfólio. O
              protótipo do case continua em{" "}
              <code
                style={{
                  borderRadius: theme.radius.sm,
                  backgroundColor: theme.colors.surface.overlay,
                  paddingLeft: theme.spacing[2],
                  paddingRight: theme.spacing[2],
                  paddingTop: theme.spacing[1],
                  paddingBottom: theme.spacing[1],
                  color: theme.colors.text.brand,
                }}
              >
                /embeds/cashlog
              </code>
              .
            </p>
          </div>
          <a href="/embeds/cashlog/" target="_blank" rel="noreferrer">
            <Button>Abrir protótipo do case</Button>
          </a>
        </div>
      </header>

      <main
        className="mx-auto max-w-5xl"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing[12],
          paddingLeft: theme.spacing[6],
          paddingRight: theme.spacing[6],
          paddingTop: theme.spacing[10],
          paddingBottom: theme.spacing[10],
        }}
      >
        <section
          className="flex flex-col"
          style={{ gap: theme.spacing[4] }}
        >
          <div>
            <h2
              className="font-semibold"
              style={{
                color: theme.colors.text.default,
                fontSize: theme.fontSize.lg,
              }}
            >
              Tokens
            </h2>
            <p
              style={{
                color: theme.colors.text.muted,
                fontSize: theme.fontSize.sm,
              }}
            >
              Paleta semântica — valores de theme.ts.
            </p>
          </div>
          <div>
            <h3
              className="font-semibold uppercase"
              style={{
                marginBottom: theme.spacing[3],
                color: theme.colors.text.muted,
                fontSize: theme.fontSize.xs,
                letterSpacing: "0.12em",
              }}
            >
              Brand
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6" style={{ gap: theme.spacing[3] }}>
              {tokenGallery.brand.map((token) => (
                <Swatch key={token.tokenPath} {...token} />
              ))}
            </div>
          </div>
          <div>
            <h3
              className="font-semibold uppercase"
              style={{
                marginBottom: theme.spacing[3],
                color: theme.colors.text.muted,
                fontSize: theme.fontSize.xs,
                letterSpacing: "0.12em",
              }}
            >
              Neutrals
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5" style={{ gap: theme.spacing[3] }}>
              {tokenGallery.neutrals.map((token) => (
                <Swatch key={token.tokenPath} {...token} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="flex flex-col"
          style={{ gap: theme.spacing[4] }}
        >
          <div>
            <h2
              className="font-semibold"
              style={{
                color: theme.colors.text.default,
                fontSize: theme.fontSize.lg,
              }}
            >
              Componentes
            </h2>
            <p
              style={{
                color: theme.colors.text.muted,
                fontSize: theme.fontSize.sm,
              }}
            >
              Primitivos do sistema — Button.
            </p>
          </div>
          <div
            className="flex flex-wrap border"
            style={{
              gap: theme.spacing[3],
              borderRadius: theme.radius.xl,
              borderColor: theme.colors.border.default,
              backgroundColor: theme.colors.surface.default,
              padding: theme.spacing[6],
            }}
          >
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </section>

        <section
          className="flex flex-col"
          style={{ gap: theme.spacing[4] }}
        >
          <div>
            <h2
              className="font-semibold"
              style={{
                color: theme.colors.text.default,
                fontSize: theme.fontSize.lg,
              }}
            >
              Telas planejadas
            </h2>
            <p
              style={{
                color: theme.colors.text.muted,
                fontSize: theme.fontSize.sm,
              }}
            >
              Hoje no bundle do case. Serão reescritas aqui com o design system.
            </p>
          </div>
          <ul
            className="divide-y overflow-hidden border"
            style={{
              borderRadius: theme.radius.xl,
              borderColor: theme.colors.border.default,
              backgroundColor: theme.colors.surface.default,
            }}
          >
            {plannedScreens.map((screen) => (
              <li
                key={screen.id}
                className="flex items-center justify-between"
                style={{
                  paddingLeft: theme.spacing[4],
                  paddingRight: theme.spacing[4],
                  paddingTop: theme.spacing[3],
                  paddingBottom: theme.spacing[3],
                  borderColor: theme.colors.border.default,
                }}
              >
                <span
                  className="font-medium"
                  style={{
                    color: theme.colors.text.default,
                    fontSize: theme.fontSize.sm,
                  }}
                >
                  {screen.label}
                </span>
                <span
                  className="font-medium"
                  style={{
                    borderRadius: "9999px",
                    backgroundColor: theme.colors.brand.primarySubtle,
                    color: theme.colors.text.brand,
                    fontSize: theme.fontSize.xs,
                    paddingLeft: theme.spacing[3],
                    paddingRight: theme.spacing[3],
                    paddingTop: theme.spacing[1],
                    paddingBottom: theme.spacing[1],
                  }}
                >
                  {screen.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
