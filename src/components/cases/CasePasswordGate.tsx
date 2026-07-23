import { FormEvent, type ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import {
  isCaseUnlocked,
  unlockCase,
  verifyCasePassword,
} from "../../lib/caseAccess";
import { useLocale } from "../../i18n/LocaleContext";
import { SeoHead } from "../seo/SeoHead";

type CasePasswordGateProps = {
  caseId: string;
  path: string;
  title: string;
  children: ReactNode;
};

export function CasePasswordGate({
  caseId,
  path,
  title,
  children,
}: CasePasswordGateProps) {
  const { locale } = useLocale();
  const [unlocked, setUnlocked] = useState(() => isCaseUnlocked(caseId));
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const copy =
    locale === "en"
      ? {
          heading: "Protected case study",
          body: "This project is shared privately. Enter the password to continue.",
          password: "Password",
          submit: "Unlock",
          back: "← Portfolio",
          invalid: "Incorrect password",
          description: `Private access to ${title}.`,
        }
      : {
          heading: "Case protegido",
          body: "Este projeto é compartilhado de forma privada. Digite a senha para continuar.",
          password: "Senha",
          submit: "Desbloquear",
          back: "← Portfólio",
          invalid: "Senha incorreta",
          description: `Acesso privado a ${title}.`,
        };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!verifyCasePassword(caseId, password)) {
      setError(copy.invalid);
      return;
    }
    unlockCase(caseId);
    setError("");
    setUnlocked(true);
  }

  if (unlocked) return children;

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-5">
      <SeoHead
        title={title}
        description={copy.description}
        path={path}
        robots="noindex, nofollow"
        locale={locale}
      />
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-md p-8 flex flex-col gap-4"
      >
        <p className="eyebrow text-accent">{copy.heading}</p>
        <h1 className="text-2xl font-bold text-neutral-950 text-pretty">
          {title}
        </h1>
        <p className="text-sm text-neutral-600 text-pretty">{copy.body}</p>
        <label className="flex flex-col gap-2">
          <span className="eyebrow">{copy.password}</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="input-field"
            autoFocus
            autoComplete="current-password"
          />
        </label>
        {error ? <p className="text-sm text-error">{error}</p> : null}
        <button type="submit" className="btn-primary">
          {copy.submit}
        </button>
        <Link
          to="/"
          className="text-sm text-center text-neutral-500 hover:text-accent"
        >
          {copy.back}
        </Link>
      </form>
    </div>
  );
}
