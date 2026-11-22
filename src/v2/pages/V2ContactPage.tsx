import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { SeoHead } from "../../components/seo/SeoHead";
import { useLocale } from "../../i18n/LocaleContext";
import { useLocalizedPath } from "../../i18n/useLocalizedPath";
import { sendContactMessage } from "../../lib/sendContact";
import { SiteHeader } from "../components/SiteHeader";
import { v2Theme } from "../tokens/theme";
import "../tokens/tokens.css";

/**
 * @description v2 Contact — same send path as live site, v2 chrome only.
 */
export function V2ContactPage() {
  const { locale, t } = useLocale();
  const lp = useLocalizedPath();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [formError, setFormError] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setFormError("");
    const result = await sendContactMessage({ name, email, message, locale });
    if (result.ok) {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      return;
    }
    setStatus("error");
    setFormError(t.contact.formError);
  };

  return (
    <div className="v2-root">
      <SeoHead
        title={
          locale === "en"
            ? "Contact | Ivy DC v2 (preview)"
            : "Contato | Ivy DC v2 (preview)"
        }
        description={t.contact.subtitle}
        path="/v2/contact"
        locale={locale}
        robots="noindex, nofollow"
      />
      <SiteHeader />
      <main style={{ padding: "var(--v2-space-6) var(--v2-gutter)", maxWidth: 560 }}>
        <p
          style={{
            margin: "0 0 var(--v2-space-3)",
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0.65,
          }}
        >
          {t.nav.contact}
        </p>
        <h1
          style={{
            margin: "0 0 var(--v2-space-3)",
            fontFamily: "var(--v2-font-display)",
            fontWeight: 800,
            fontSize: "clamp(2rem, 6vw, 3.25rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {t.contact.title}
        </h1>
        <p style={{ margin: "0 0 var(--v2-space-4)", fontSize: 17, lineHeight: 1.55 }}>
          {t.contact.subtitle}
        </p>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
          <label style={{ display: "grid", gap: 6, fontSize: 14 }}>
            {t.contact.formName}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.contact.namePlaceholder}
              required
              style={{
                minHeight: 44,
                padding: "10px 12px",
                border: `1px solid ${v2Theme.colors.ink}`,
                background: "transparent",
                font: "inherit",
              }}
            />
          </label>
          <label style={{ display: "grid", gap: 6, fontSize: 14 }}>
            {t.contact.formEmail}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.contact.emailPlaceholder}
              required
              style={{
                minHeight: 44,
                padding: "10px 12px",
                border: `1px solid ${v2Theme.colors.ink}`,
                background: "transparent",
                font: "inherit",
              }}
            />
          </label>
          <label style={{ display: "grid", gap: 6, fontSize: 14 }}>
            {t.contact.formMessage}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.contact.messagePlaceholder}
              required
              rows={5}
              style={{
                padding: "10px 12px",
                border: `1px solid ${v2Theme.colors.ink}`,
                background: "transparent",
                font: "inherit",
                resize: "vertical",
              }}
            />
          </label>
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              minHeight: 44,
              border: "none",
              background: v2Theme.colors.ink,
              color: v2Theme.colors.canvas,
              fontWeight: 600,
              cursor: status === "loading" ? "wait" : "pointer",
            }}
          >
            {status === "loading" ? t.contact.submitting : t.contact.submit}
          </button>
          {status === "success" ? (
            <div style={{ fontSize: 14 }}>
              <p style={{ margin: "0 0 4px", fontWeight: 600 }}>
                {t.contact.successTitle}
              </p>
              <p style={{ margin: 0 }}>{t.contact.successBody}</p>
            </div>
          ) : null}
          {status === "error" ? (
            <p style={{ margin: 0, fontSize: 14 }}>{formError}</p>
          ) : null}
          <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>{t.contact.formHint}</p>
        </form>

        <p style={{ marginTop: "var(--v2-space-5)" }}>
          <Link to={lp("/v2")} style={{ fontWeight: 600 }}>
            ← {locale === "en" ? "Back to v2 home" : "Voltar à home v2"}
          </Link>
        </p>
      </main>
    </div>
  );
}
