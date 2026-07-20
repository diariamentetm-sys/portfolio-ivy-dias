const CONTACT_EMAIL = "ivy.dias.de.campos@gmail.com";

/** FormSubmit AJAX endpoint — first submission triggers an activation email to confirm. */
const FORM_ENDPOINT =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.toString() ||
  `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  locale: "en" | "pt";
};

export async function sendContactMessage(
  payload: ContactPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        message: payload.message,
        _replyto: payload.email,
        _subject:
          payload.locale === "en"
            ? `Portfolio contact — ${payload.name || "new CX project"}`
            : `Contato do portfólio — ${payload.name || "novo projeto de CX"}`,
        _template: "table",
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        ok: false,
        error: text || `Request failed (${response.status})`,
      };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}
