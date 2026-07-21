import { FormEvent, type ReactNode, useMemo, useState } from "react";
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
type ProjectEditorBlock = "identity" | "preview" | "case" | "sections";

type SectionImage = NonNullable<
  ProjectLocaleContent["sections"][number]["images"]
>[number];

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
          <section className="card p-6 md:p-8 flex flex-col gap-8">
            <AdminBlock
              title={locale === "en" ? "Hero media" : "Mídia do hero"}
              description={
                locale === "en"
                  ? "Main image shown in the first viewport."
                  : "Imagem principal exibida no primeiro viewport."
              }
            >
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
            </AdminBlock>

            {(["en", "pt"] as Locale[]).map((lang) => (
              <AdminBlock
                key={lang}
                title={lang === "en" ? t.admin.editEn : t.admin.editPt}
                description={
                  lang === "en"
                    ? "Headline and supporting copy for the hero."
                    : "Título e texto de apoio do hero."
                }
              >
                <div className="flex flex-col gap-5">
                  <FieldLabel label="Title" hint="Text before the accent color">
                    <input
                      className="input-field text-lg font-semibold"
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
                  </FieldLabel>
                  <FieldLabel label="Accent" hint="Highlighted part of the title">
                    <input
                      className="input-field text-lg font-semibold text-accent"
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
                  </FieldLabel>
                  <FieldLabel label="Subtitle">
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
                  </FieldLabel>
                </div>
              </AdminBlock>
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
          <section className="card p-6 md:p-8 flex flex-col gap-6">
            <AdminBlock
              title={locale === "en" ? "Contact photo" : "Foto de contato"}
              description={
                locale === "en"
                  ? "Circular portrait used in the contact section."
                  : "Retrato circular usado na seção de contato."
              }
            >
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
            </AdminBlock>
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
          <section className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-3 items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {locale === "en" ? "Case studies" : "Estudos de caso"}
                </h2>
                <p className="mt-1 body-md max-w-xl">
                  {locale === "en"
                    ? "Edit copy, overview art, and section galleries for each project."
                    : "Edite textos, imagem de capa e galerias de cada seção dos projetos."}
                </p>
              </div>
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

            <div className="grid gap-3">
              {content.projects.map((project) => {
                const title =
                  project.en.title || project.pt.title || project.slug;
                const imageCount =
                  (project.overviewImage ? 1 : 0) +
                  project.en.sections.reduce(
                    (total, section) => total + (section.images?.length ?? 0),
                    0,
                  );

                return (
                  <div
                    key={project.id}
                    className={`card p-4 md:p-5 flex flex-wrap gap-4 items-center justify-between ${
                      editingId === project.id ? "ring-2 ring-accent/30" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {project.overviewImage ? (
                        <img
                          src={project.overviewImage}
                          alt=""
                          className="w-16 h-16 rounded-ui object-cover border border-neutral-200 shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-ui bg-neutral-100 border border-dashed border-neutral-300 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold truncate">
                          <span className="font-mono text-xs text-neutral-400 mr-2">
                            {project.n}
                          </span>
                          {title}
                          {project.en.titleAccent || project.pt.titleAccent}
                        </p>
                        <p className="text-sm text-neutral-500">
                          /cases/{project.slug} ·{" "}
                          {project.published ? "published" : "draft"} ·{" "}
                          {imageCount}{" "}
                          {locale === "en" ? "images" : "imagens"}
                        </p>
                      </div>
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
                );
              })}
              {content.projects.length === 0 && (
                <p className="text-sm text-neutral-500">No projects yet.</p>
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
                uiLocale={locale}
              />
            )}
          </section>
        )}
      </main>
    </div>
  );
}

function AdminBlock({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-bold tracking-tight text-neutral-950">
          {title}
        </h3>
        {description ? (
          <p className="mt-1 text-sm text-neutral-500 text-pretty">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function FieldLabel({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-neutral-950">{label}</span>
        {hint ? <span className="text-xs text-neutral-500">{hint}</span> : null}
      </span>
      {children}
    </label>
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
  uiLocale,
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
  uiLocale: Locale;
}) {
  const localeContent = project[editLocale];
  const [openBlock, setOpenBlock] = useState<ProjectEditorBlock>("identity");
  const isPt = uiLocale === "pt";

  function patchLocale(patch: Partial<ProjectLocaleContent>) {
    onChange({
      ...project,
      [editLocale]: { ...localeContent, ...patch },
    });
  }

  function syncSectionImages(sectionIndex: number, images: SectionImage[]) {
    const next = { ...project };
    for (const locale of ["en", "pt"] as const) {
      const localeCopy = next[locale];
      if (!localeCopy.sections[sectionIndex]) continue;
      const sections = [...localeCopy.sections];
      sections[sectionIndex] = { ...sections[sectionIndex], images };
      next[locale] = { ...localeCopy, sections };
    }
    onChange(next);
  }

  function updateSection(
    index: number,
    patch: Partial<ProjectLocaleContent["sections"][number]>,
  ) {
    const sections = [...localeContent.sections];
    sections[index] = { ...sections[index], ...patch };
    patchLocale({ sections });
  }

  function updateSectionImage(
    sectionIndex: number,
    imageIndex: number,
    patch: Partial<SectionImage>,
  ) {
    const images = [...(localeContent.sections[sectionIndex].images ?? [])];
    images[imageIndex] = { ...images[imageIndex], ...patch };
    syncSectionImages(sectionIndex, images);
  }

  function addSectionImage(sectionIndex: number, src: string) {
    const images = [...(localeContent.sections[sectionIndex].images ?? [])];
    images.push({ src, alt: "" });
    syncSectionImages(sectionIndex, images);
    onSave();
  }

  function removeSectionImage(sectionIndex: number, imageIndex: number) {
    const images = [...(localeContent.sections[sectionIndex].images ?? [])];
    images.splice(imageIndex, 1);
    syncSectionImages(sectionIndex, images);
  }

  const blocks: {
    id: ProjectEditorBlock;
    title: string;
    description: string;
  }[] = [
    {
      id: "identity",
      title: isPt ? "1. Identidade do projeto" : "1. Project identity",
      description: isPt
        ? "Slug, numeração e imagem de capa."
        : "Slug, number and cover image.",
    },
    {
      id: "preview",
      title: isPt ? "2. Card da home" : "2. Home preview card",
      description: isPt
        ? "Textos curtos usados na listagem de trabalhos."
        : "Short copy used in the work listing.",
    },
    {
      id: "case",
      title: isPt ? "3. Cabeçalho do case" : "3. Case page header",
      description: isPt
        ? "Título, breadcrumb, tags e texto Sobre o projeto."
        : "Title, breadcrumb, tags and About the project copy.",
    },
    {
      id: "sections",
      title: isPt ? "4. Seções e imagens" : "4. Sections & images",
      description: isPt
        ? "Conteúdo de cada etapa do case, com galeria de imagens."
        : "Each case step with its image gallery.",
    },
  ];

  return (
    <div className="card p-6 md:p-8 flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <p className="eyebrow text-accent">
            {isPt ? "Editando projeto" : "Editing project"}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">
            {localeContent.title || project.slug}
            {localeContent.titleAccent}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={
              editLocale === "en"
                ? "btn-primary px-4 py-2 text-sm"
                : "btn-ghost px-4 py-2 text-sm"
            }
            onClick={() => setEditLocale("en")}
          >
            {labels.editEn}
          </button>
          <button
            type="button"
            className={
              editLocale === "pt"
                ? "btn-primary px-4 py-2 text-sm"
                : "btn-ghost px-4 py-2 text-sm"
            }
            onClick={() => setEditLocale("pt")}
          >
            {labels.editPt}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {blocks.map((block) => (
          <button
            key={block.id}
            type="button"
            onClick={() => setOpenBlock(block.id)}
            className={
              openBlock === block.id
                ? "btn-primary px-4 py-2 text-sm"
                : "btn-ghost px-4 py-2 text-sm"
            }
          >
            {block.title}
          </button>
        ))}
      </div>

      {openBlock === "identity" && (
        <AdminBlock
          title={blocks[0].title}
          description={blocks[0].description}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <FieldLabel label="Slug" hint="/cases/your-slug">
              <input
                className="input-field font-mono text-sm"
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
            </FieldLabel>
            <FieldLabel label={isPt ? "Número" : "Number"} hint="01, 02…">
              <input
                className="input-field font-mono text-sm"
                value={project.n}
                onChange={(event) =>
                  onChange({ ...project, n: event.target.value })
                }
              />
            </FieldLabel>
          </div>
          <div className="mt-5">
            <ImageField
              label={isPt ? "Imagem de capa / overview" : "Cover / overview image"}
              value={project.overviewImage ?? ""}
              folder="projects"
              previewClassName="w-full max-w-xl rounded-2xl object-cover aspect-video"
              uploadLabel={labels.uploadImage}
              uploadingLabel={labels.uploading}
              urlLabel={labels.imageUrl}
              onChange={(url) => {
                onChange({ ...project, overviewImage: url });
                onSave();
              }}
            />
          </div>
        </AdminBlock>
      )}

      {openBlock === "preview" && (
        <AdminBlock
          title={blocks[1].title}
          description={blocks[1].description}
        >
          <div className="flex flex-col gap-5">
            <FieldLabel label="Kicker" hint={isPt ? "Linha curta acima do card" : "Short line above the card"}>
              <input
                className="input-field"
                value={localeContent.kicker}
                onChange={(event) => patchLocale({ kicker: event.target.value })}
              />
            </FieldLabel>
            <FieldLabel label="Subtitle" hint={isPt ? "Contexto / papel" : "Context / role"}>
              <input
                className="input-field"
                value={localeContent.subtitle}
                onChange={(event) =>
                  patchLocale({ subtitle: event.target.value })
                }
              />
            </FieldLabel>
            <FieldLabel label={isPt ? "Descrição do card" : "Card description"}>
              <textarea
                className="input-field resize-y"
                rows={4}
                value={localeContent.description}
                onChange={(event) =>
                  patchLocale({ description: event.target.value })
                }
              />
            </FieldLabel>
          </div>
        </AdminBlock>
      )}

      {openBlock === "case" && (
        <AdminBlock title={blocks[2].title} description={blocks[2].description}>
          <div className="flex flex-col gap-5">
            <div className="grid md:grid-cols-2 gap-4">
              <FieldLabel label={isPt ? "Título" : "Title"}>
                <input
                  className="input-field text-xl font-bold"
                  value={localeContent.title}
                  onChange={(event) =>
                    patchLocale({ title: event.target.value })
                  }
                />
              </FieldLabel>
              <FieldLabel label="Accent" hint={isPt ? "Parte destacada" : "Highlighted part"}>
                <input
                  className="input-field text-xl font-bold text-accent"
                  value={localeContent.titleAccent ?? ""}
                  onChange={(event) =>
                    patchLocale({ titleAccent: event.target.value })
                  }
                />
              </FieldLabel>
            </div>
            <FieldLabel label="Breadcrumb">
              <input
                className="input-field"
                value={localeContent.breadcrumb}
                onChange={(event) =>
                  patchLocale({ breadcrumb: event.target.value })
                }
              />
            </FieldLabel>
            <FieldLabel label={isPt ? "Kicker do case" : "Case kicker"}>
              <input
                className="input-field"
                value={localeContent.caseKicker}
                onChange={(event) =>
                  patchLocale({ caseKicker: event.target.value })
                }
              />
            </FieldLabel>
            <FieldLabel
              label="Tags"
              hint={isPt ? "Separadas por vírgula" : "Comma separated"}
            >
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
            </FieldLabel>
            <FieldLabel
              label={isPt ? "Sobre o projeto" : "About the project"}
              hint={isPt ? "Um parágrafo por linha" : "One paragraph per line"}
            >
              <textarea
                className="input-field resize-y"
                rows={5}
                value={localeContent.about.join("\n")}
                onChange={(event) =>
                  patchLocale({
                    about: event.target.value.split("\n").filter(Boolean),
                  })
                }
              />
            </FieldLabel>
          </div>
        </AdminBlock>
      )}

      {openBlock === "sections" && (
        <AdminBlock title={blocks[3].title} description={blocks[3].description}>
          <div className="flex items-center justify-between gap-3 mb-2">
            <p className="text-sm text-neutral-500">
              {localeContent.sections.length}{" "}
              {isPt ? "seções" : "sections"}
            </p>
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
                      title: isPt ? "Nova seção" : "New section",
                      body: "",
                      images: [],
                    },
                  ],
                })
              }
            >
              + {isPt ? "Seção" : "Section"}
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {localeContent.sections.map((section, index) => (
              <article
                key={`${section.number}-${index}`}
                className="rounded-2xl border border-neutral-200 bg-white overflow-hidden"
              >
                <header className="px-5 py-4 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-accent">
                      {isPt ? "Seção" : "Section"} {section.number || index + 1}
                    </p>
                    <h4 className="text-base font-bold text-neutral-950">
                      {section.title || (isPt ? "Sem título" : "Untitled")}
                    </h4>
                    {section.kicker ? (
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {section.kicker}
                      </p>
                    ) : null}
                  </div>
                  <p className="text-xs text-neutral-500">
                    {section.images?.length ?? 0}{" "}
                    {isPt ? "imagens" : "images"}
                  </p>
                </header>

                <div className="p-5 flex flex-col gap-5">
                  <div className="grid md:grid-cols-3 gap-3">
                    <FieldLabel label={isPt ? "Número" : "Number"}>
                      <input
                        className="input-field font-mono"
                        value={section.number}
                        onChange={(event) =>
                          updateSection(index, { number: event.target.value })
                        }
                      />
                    </FieldLabel>
                    <FieldLabel label="Kicker" hint={isPt ? "Subtítulo / etapa" : "Step label"}>
                      <input
                        className="input-field"
                        value={section.kicker}
                        onChange={(event) =>
                          updateSection(index, { kicker: event.target.value })
                        }
                      />
                    </FieldLabel>
                    <FieldLabel label={isPt ? "Título da seção" : "Section title"}>
                      <input
                        className="input-field font-semibold"
                        value={section.title}
                        onChange={(event) =>
                          updateSection(index, { title: event.target.value })
                        }
                      />
                    </FieldLabel>
                  </div>

                  <FieldLabel label={isPt ? "Texto da seção" : "Section body"}>
                    <textarea
                      className="input-field resize-y"
                      rows={4}
                      value={section.body}
                      onChange={(event) =>
                        updateSection(index, { body: event.target.value })
                      }
                    />
                  </FieldLabel>

                  <div className="border-t border-neutral-100 pt-5">
                    <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
                      <div>
                        <p className="text-sm font-semibold text-neutral-950">
                          {isPt ? "Imagens desta seção" : "Images in this section"}
                        </p>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {isPt
                            ? "Pré-visualização e troca de cada asset usado no case."
                            : "Preview and replace each asset used in the case."}
                        </p>
                      </div>
                    </div>

                    {(section.images?.length ?? 0) > 0 ? (
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        {section.images!.map((image, imageIndex) => (
                          <div
                            key={`${image.src}-${imageIndex}`}
                            className="rounded-ui border border-neutral-200 p-3 flex flex-col gap-3 bg-neutral-50/80"
                          >
                            <img
                              src={image.src}
                              alt={image.alt || section.title}
                              className="w-full rounded-ui object-cover aspect-video border border-neutral-200 bg-white"
                            />
                            <FieldLabel label="Alt text">
                              <input
                                className="input-field text-sm"
                                value={image.alt ?? ""}
                                onChange={(event) =>
                                  updateSectionImage(index, imageIndex, {
                                    alt: event.target.value,
                                  })
                                }
                              />
                            </FieldLabel>
                            <FieldLabel label="URL">
                              <input
                                className="input-field text-sm font-mono"
                                value={image.src}
                                onChange={(event) =>
                                  updateSectionImage(index, imageIndex, {
                                    src: event.target.value,
                                  })
                                }
                              />
                            </FieldLabel>
                            <button
                              type="button"
                              className="btn-ghost px-3 py-2 text-sm text-error self-start"
                              onClick={() =>
                                removeSectionImage(index, imageIndex)
                              }
                            >
                              {isPt ? "Remover imagem" : "Remove image"}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-neutral-500 mb-4">
                        {isPt
                          ? "Nenhuma imagem nesta seção ainda."
                          : "No images in this section yet."}
                      </p>
                    )}

                    <ImageField
                      label={
                        isPt ? "Adicionar imagem à seção" : "Add image to section"
                      }
                      value=""
                      folder="projects"
                      appendMode
                      hideEmptyPreview
                      addUrlLabel={isPt ? "Adicionar URL" : "Add URL"}
                      uploadLabel={labels.uploadImage}
                      uploadingLabel={labels.uploading}
                      urlLabel={
                        isPt
                          ? "Ou cole a URL e confirme"
                          : "Or paste a URL and confirm"
                      }
                      onChange={(url) => {
                        if (!url.trim()) return;
                        addSectionImage(index, url.trim());
                      }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </AdminBlock>
      )}

      <div className="border-t border-neutral-200 pt-5 flex flex-wrap gap-3">
        <button
          type="button"
          className="btn-primary"
          disabled={saveStatus === "saving"}
          onClick={onSave}
        >
          {saveStatus === "saving" ? labels.saving : labels.save}
        </button>
        <Link
          to={`/cases/${project.slug}`}
          className="btn-ghost px-5 py-3 text-sm"
          target="_blank"
          rel="noreferrer"
        >
          {isPt ? "Ver no site" : "View on site"}
        </Link>
      </div>
    </div>
  );
}
