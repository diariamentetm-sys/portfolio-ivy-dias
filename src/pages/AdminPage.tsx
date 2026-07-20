import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ImageField } from "../components/admin/ImageField";
import { useContent } from "../content/ContentContext";
import {
  type ManagedProject,
  type ProjectLocaleContent,
} from "../content/siteContent";
import { useLocale } from "../i18n/LocaleContext";
import type { Locale } from "../i18n/types";

type Tab = "hero" | "projects" | "contact";

export function AdminPage() {
  const { t, locale } = useLocale();
  const {
    content,
    isAdmin,
    login,
    logout,
    updateContent,
    addProject,
    updateProject,
    removeProject,
    saveNow,
    saveStatus,
    saveError,
  } = useContent();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("hero");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLocale, setEditLocale] = useState<Locale>("en");

  const editing = useMemo(
    () => content.projects.find((item) => item.id === editingId) ?? null,
    [content.projects, editingId],
  );

  async function handleSave() {
    await saveNow();
  }

  function handleLogin(event: FormEvent) {
    event.preventDefault();
    const ok = login(password);
    setError(ok ? "" : "Invalid password");
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-5">
        <form
          onSubmit={handleLogin}
          className="card w-full max-w-md p-8 flex flex-col gap-4"
        >
          <h1 className="text-2xl font-bold text-neutral-950">
            {t.admin.loginTitle}
          </h1>
          <label className="flex flex-col gap-2">
            <span className="eyebrow">{t.admin.password}</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input-field"
              autoFocus
            />
          </label>
          {error && <p className="text-sm text-error">{error}</p>}
          <button type="submit" className="btn-primary">
            {t.admin.login}
          </button>
          <Link to="/" className="text-sm text-center text-neutral-500 hover:text-accent">
            ← Portfolio
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950">
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-neutral-50/95 backdrop-blur-md px-5 md:px-10 py-4 flex flex-wrap gap-4 items-center justify-between">
        <div>
          <p className="eyebrow text-accent">{t.admin.title}</p>
          <p className="text-sm text-neutral-500">Locale UI: {locale.toUpperCase()}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["hero", "projects", "contact"] as Tab[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={
                tab === item
                  ? "btn-primary px-4 py-2 text-sm"
                  : "btn-ghost px-4 py-2 text-sm"
              }
            >
              {item === "hero"
                ? t.admin.heroTab
                : item === "projects"
                  ? t.admin.projectsTab
                  : t.admin.contactTab}
            </button>
          ))}
          <Link to="/" className="btn-ghost px-4 py-2 text-sm">
            Site
          </Link>
          <button type="button" onClick={logout} className="btn-ghost px-4 py-2 text-sm">
            {t.admin.logout}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 md:px-10 py-10">
        {saveStatus === "saving" && (
          <p className="mb-4 text-sm font-semibold text-neutral-500">{t.admin.saving}</p>
        )}
        {saveStatus === "saved" && (
          <p className="mb-4 text-sm font-semibold text-success">{t.admin.saved}</p>
        )}
        {saveStatus === "error" && (
          <p className="mb-4 text-sm font-semibold text-error">
            {t.admin.saveError}
            {saveError ? ` (${saveError})` : ""}
          </p>
        )}

        {tab === "hero" && (
          <section className="card p-6 md:p-8 flex flex-col gap-6">
            <ImageField
              label={t.admin.heroImage}
              value={content.heroImage}
              folder="hero"
              uploadLabel={t.admin.uploadImage}
              uploadingLabel={t.admin.uploading}
              urlLabel={t.admin.imageUrl}
              onChange={(url) => {
                updateContent((current) => ({
                  ...current,
                  heroImage: url,
                }));
                void saveNow();
              }}
            />
            {(["en", "pt"] as Locale[]).map((lang) => (
              <div key={lang} className="border-t border-neutral-200 pt-6">
                <p className="eyebrow mb-4">
                  {lang === "en" ? t.admin.editEn : t.admin.editPt}
                </p>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="eyebrow">Title (before accent)</span>
                    <input
                      className="input-field"
                      value={content.heroCopy[lang].titleBefore}
                      onChange={(event) =>
                        updateContent((current) => ({
                          ...current,
                          heroCopy: {
                            ...current.heroCopy,
                            [lang]: {
                              ...current.heroCopy[lang],
                              titleBefore: event.target.value,
                            },
                          },
                        }))
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="eyebrow">Title accent</span>
                    <input
                      className="input-field"
                      value={content.heroCopy[lang].titleAccent}
                      onChange={(event) =>
                        updateContent((current) => ({
                          ...current,
                          heroCopy: {
                            ...current.heroCopy,
                            [lang]: {
                              ...current.heroCopy[lang],
                              titleAccent: event.target.value,
                            },
                          },
                        }))
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="eyebrow">Subtitle</span>
                    <textarea
                      className="input-field resize-y"
                      rows={3}
                      value={content.heroCopy[lang].subtitle}
                      onChange={(event) =>
                        updateContent((current) => ({
                          ...current,
                          heroCopy: {
                            ...current.heroCopy,
                            [lang]: {
                              ...current.heroCopy[lang],
                              subtitle: event.target.value,
                            },
                          },
                        }))
                      }
                    />
                  </label>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn-primary self-start"
              disabled={saveStatus === "saving"}
              onClick={() => void handleSave()}
            >
              {saveStatus === "saving" ? t.admin.saving : t.admin.save}
            </button>
          </section>
        )}

        {tab === "contact" && (
          <section className="card p-6 md:p-8 flex flex-col gap-4">
            <ImageField
              label={t.admin.contactImage}
              value={content.contactPhoto}
              folder="contact"
              previewClassName="w-40 h-40 rounded-full object-cover object-top border-4 border-white shadow-card"
              uploadLabel={t.admin.uploadImage}
              uploadingLabel={t.admin.uploading}
              urlLabel={t.admin.imageUrl}
              onChange={(url) => {
                updateContent((current) => ({
                  ...current,
                  contactPhoto: url,
                }));
                void saveNow();
              }}
            />
            <button
              type="button"
              className="btn-primary self-start"
              disabled={saveStatus === "saving"}
              onClick={() => void handleSave()}
            >
              {saveStatus === "saving" ? t.admin.saving : t.admin.save}
            </button>
          </section>
        )}

        {tab === "projects" && (
          <section className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <p className="body-md">
                New projects follow the same case structure (preview + sections).
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  const project = addProject();
                  setEditingId(project.id);
                }}
              >
                {t.admin.addProject}
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {content.projects.map((project) => (
                <div
                  key={project.id}
                  className="card p-5 flex flex-wrap gap-3 items-center justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {project.en.title || project.pt.title || project.slug}
                    </p>
                    <p className="text-sm text-neutral-500">
                      /cases/{project.slug} ·{" "}
                      {project.published ? "published" : "draft"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn-ghost px-4 py-2 text-sm"
                      onClick={() => setEditingId(project.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-ghost px-4 py-2 text-sm"
                      onClick={() =>
                        updateProject({
                          ...project,
                          published: !project.published,
                        })
                      }
                    >
                      {project.published ? t.admin.unpublish : t.admin.publish}
                    </button>
                    <button
                      type="button"
                      className="btn-ghost px-4 py-2 text-sm text-error"
                      onClick={() => {
                        removeProject(project.id);
                        if (editingId === project.id) setEditingId(null);
                      }}
                    >
                      {t.admin.deleteProject}
                    </button>
                  </div>
                </div>
              ))}
              {content.projects.length === 0 && (
                <p className="text-sm text-neutral-500">No custom projects yet.</p>
              )}
            </div>

            {editing && (
              <ProjectEditor
                project={editing}
                editLocale={editLocale}
                setEditLocale={setEditLocale}
                onChange={updateProject}
                onSave={() => void handleSave()}
                saveStatus={saveStatus}
                labels={t.admin}
              />
            )}
          </section>
        )}
      </main>
    </div>
  );
}

function ProjectEditor({
  project,
  editLocale,
  setEditLocale,
  onChange,
  onSave,
  saveStatus,
  labels,
}: {
  project: ManagedProject;
  editLocale: Locale;
  setEditLocale: (locale: Locale) => void;
  onChange: (project: ManagedProject) => void;
  onSave: () => void;
  saveStatus: "idle" | "saving" | "saved" | "error";
  labels: {
    editEn: string;
    editPt: string;
    save: string;
    saving: string;
    uploadImage: string;
    uploading: string;
    imageUrl: string;
  };
}) {
  const localeContent = project[editLocale];

  function patchLocale(patch: Partial<ProjectLocaleContent>) {
    onChange({
      ...project,
      [editLocale]: { ...localeContent, ...patch },
    });
  }

  return (
    <div className="card p-6 md:p-8 flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={editLocale === "en" ? "btn-primary px-4 py-2 text-sm" : "btn-ghost px-4 py-2 text-sm"}
          onClick={() => setEditLocale("en")}
        >
          {labels.editEn}
        </button>
        <button
          type="button"
          className={editLocale === "pt" ? "btn-primary px-4 py-2 text-sm" : "btn-ghost px-4 py-2 text-sm"}
          onClick={() => setEditLocale("pt")}
        >
          {labels.editPt}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span className="eyebrow">Slug</span>
          <input
            className="input-field"
            value={project.slug}
            onChange={(event) =>
              onChange({
                ...project,
                slug: event.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9-]/g, "-"),
              })
            }
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow">Number</span>
          <input
            className="input-field"
            value={project.n}
            onChange={(event) => onChange({ ...project, n: event.target.value })}
          />
        </label>
      </div>

      <ImageField
        label="Overview image"
        value={project.overviewImage ?? ""}
        folder="projects"
        previewClassName="w-full max-w-md rounded-2xl object-cover aspect-video"
        uploadLabel={labels.uploadImage}
        uploadingLabel={labels.uploading}
        urlLabel={labels.imageUrl}
        onChange={(url) => {
          onChange({ ...project, overviewImage: url });
          onSave();
        }}
      />

      {(
        [
          ["kicker", "Preview kicker"],
          ["subtitle", "Preview subtitle"],
          ["title", "Title"],
          ["titleAccent", "Title accent"],
          ["description", "Preview description"],
          ["breadcrumb", "Breadcrumb"],
          ["caseKicker", "Case kicker"],
        ] as const
      ).map(([key, label]) => (
        <label key={key} className="flex flex-col gap-2">
          <span className="eyebrow">{label}</span>
          {key === "description" ? (
            <textarea
              className="input-field resize-y"
              rows={3}
              value={localeContent[key] ?? ""}
              onChange={(event) => patchLocale({ [key]: event.target.value })}
            />
          ) : (
            <input
              className="input-field"
              value={localeContent[key] ?? ""}
              onChange={(event) => patchLocale({ [key]: event.target.value })}
            />
          )}
        </label>
      ))}

      <label className="flex flex-col gap-2">
        <span className="eyebrow">Tags (comma separated)</span>
        <input
          className="input-field"
          value={localeContent.tags.join(", ")}
          onChange={(event) =>
            patchLocale({
              tags: event.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            })
          }
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="eyebrow">About (one paragraph per line)</span>
        <textarea
          className="input-field resize-y"
          rows={4}
          value={localeContent.about.join("\n")}
          onChange={(event) =>
            patchLocale({
              about: event.target.value.split("\n").filter(Boolean),
            })
          }
        />
      </label>

      <div className="border-t border-neutral-200 pt-5 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow">Sections</p>
          <button
            type="button"
            className="btn-ghost px-3 py-2 text-sm"
            onClick={() =>
              patchLocale({
                sections: [
                  ...localeContent.sections,
                  {
                    number: String(localeContent.sections.length + 1).padStart(
                      2,
                      "0",
                    ),
                    kicker: "Context",
                    title: "New section",
                    body: "",
                  },
                ],
              })
            }
          >
            + Section
          </button>
        </div>
        {localeContent.sections.map((section, index) => (
          <div key={`${section.number}-${index}`} className="card-ui p-4 flex flex-col gap-3">
            <div className="grid md:grid-cols-3 gap-3">
              <input
                className="input-field"
                placeholder="01"
                value={section.number}
                onChange={(event) => {
                  const sections = [...localeContent.sections];
                  sections[index] = { ...section, number: event.target.value };
                  patchLocale({ sections });
                }}
              />
              <input
                className="input-field"
                placeholder="Kicker"
                value={section.kicker}
                onChange={(event) => {
                  const sections = [...localeContent.sections];
                  sections[index] = { ...section, kicker: event.target.value };
                  patchLocale({ sections });
                }}
              />
              <input
                className="input-field"
                placeholder="Title"
                value={section.title}
                onChange={(event) => {
                  const sections = [...localeContent.sections];
                  sections[index] = { ...section, title: event.target.value };
                  patchLocale({ sections });
                }}
              />
            </div>
            <textarea
              className="input-field resize-y"
              rows={3}
              placeholder="Body"
              value={section.body}
              onChange={(event) => {
                const sections = [...localeContent.sections];
                sections[index] = { ...section, body: event.target.value };
                patchLocale({ sections });
              }}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn-primary self-start"
        disabled={saveStatus === "saving"}
        onClick={onSave}
      >
        {saveStatus === "saving" ? labels.saving : labels.save}
      </button>
    </div>
  );
}
