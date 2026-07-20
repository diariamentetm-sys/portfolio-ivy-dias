import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { isSupabaseConfigured } from "../lib/supabase";
import {
  fetchSiteContentFromSupabase,
  persistSiteContentToSupabase,
} from "./supabaseContent";
import {
  ADMIN_SESSION_KEY,
  createEmptyProject,
  loadSiteContent,
  saveSiteContent,
  type ManagedProject,
  type SiteContent,
} from "./siteContent";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

type ContentContextValue = {
  content: SiteContent;
  isAdmin: boolean;
  isSyncing: boolean;
  saveStatus: SaveStatus;
  saveError: string;
  login: (password: string) => boolean;
  logout: () => void;
  updateContent: (updater: (current: SiteContent) => SiteContent) => void;
  addProject: () => ManagedProject;
  updateProject: (project: ManagedProject) => void;
  removeProject: (id: string) => void;
  saveNow: () => Promise<boolean>;
};

const ContentContext = createContext<ContentContextValue | null>(null);

const ADMIN_PASSWORD =
  import.meta.env.VITE_ADMIN_PASSWORD?.toString() || "ivy-admin";

const REMOTE_DEBOUNCE_MS = 700;

function readAdminSession() {
  try {
    return localStorage.getItem(ADMIN_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => loadSiteContent());
  const [isAdmin, setIsAdmin] = useState(() => readAdminSession());
  const [isSyncing, setIsSyncing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveError, setSaveError] = useState("");

  const contentRef = useRef(content);
  const debounceRef = useRef<number | null>(null);
  const persistSeq = useRef(0);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      if (!isSupabaseConfigured) return;
      setIsSyncing(true);
      try {
        const remote = await fetchSiteContentFromSupabase();
        if (!cancelled && remote) {
          setContent(remote);
          saveSiteContent(remote);
        }
      } finally {
        if (!cancelled) setIsSyncing(false);
      }
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, []);

  const persistRemote = useCallback(async (next: SiteContent) => {
    if (!isSupabaseConfigured) {
      setSaveStatus("saved");
      setSaveError("");
      window.setTimeout(() => setSaveStatus("idle"), 1600);
      return true;
    }

    const seq = ++persistSeq.current;
    setSaveStatus("saving");
    setSaveError("");

    const result = await persistSiteContentToSupabase(next);
    if (seq !== persistSeq.current) return false;

    if (!result.ok) {
      setSaveStatus("error");
      setSaveError(result.error);
      console.error("Failed to sync with Supabase:", result.error);
      return false;
    }

    setSaveStatus("saved");
    setSaveError("");
    window.setTimeout(() => {
      if (persistSeq.current === seq) setSaveStatus("idle");
    }, 1600);
    return true;
  }, []);

  const scheduleRemotePersist = useCallback(
    (next: SiteContent) => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        void persistRemote(next);
      }, REMOTE_DEBOUNCE_MS);
    },
    [persistRemote],
  );

  const applyLocal = useCallback(
    (next: SiteContent, options?: { syncRemote?: boolean }) => {
      contentRef.current = next;
      setContent(next);
      saveSiteContent(next);
      if (options?.syncRemote !== false) {
        scheduleRemotePersist(next);
      }
    },
    [scheduleRemotePersist],
  );

  const updateContent = useCallback(
    (updater: (current: SiteContent) => SiteContent) => {
      applyLocal(updater(contentRef.current));
    },
    [applyLocal],
  );

  const login = useCallback((password: string) => {
    if (password !== ADMIN_PASSWORD) return false;
    localStorage.setItem(ADMIN_SESSION_KEY, "1");
    setIsAdmin(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdmin(false);
  }, []);

  const addProject = useCallback(() => {
    const project = createEmptyProject();
    const created = {
      ...project,
      n: String(5 + contentRef.current.projects.length).padStart(2, "0"),
    };
    applyLocal({
      ...contentRef.current,
      projects: [...contentRef.current.projects, created],
    });
    return created;
  }, [applyLocal]);

  const updateProject = useCallback(
    (project: ManagedProject) => {
      applyLocal({
        ...contentRef.current,
        projects: contentRef.current.projects.map((item) =>
          item.id === project.id ? project : item,
        ),
      });
    },
    [applyLocal],
  );

  const removeProject = useCallback(
    (id: string) => {
      applyLocal({
        ...contentRef.current,
        projects: contentRef.current.projects.filter((item) => item.id !== id),
      });
    },
    [applyLocal],
  );

  const saveNow = useCallback(async () => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    return persistRemote(contentRef.current);
  }, [persistRemote]);

  const value = useMemo(
    () => ({
      content,
      isAdmin,
      isSyncing,
      saveStatus,
      saveError,
      login,
      logout,
      updateContent,
      addProject,
      updateProject,
      removeProject,
      saveNow,
    }),
    [
      content,
      isAdmin,
      isSyncing,
      saveStatus,
      saveError,
      login,
      logout,
      updateContent,
      addProject,
      updateProject,
      removeProject,
      saveNow,
    ],
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return context;
}
