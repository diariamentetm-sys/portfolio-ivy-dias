import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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

type ContentContextValue = {
  content: SiteContent;
  isAdmin: boolean;
  isSyncing: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  updateContent: (updater: (current: SiteContent) => SiteContent) => void;
  addProject: () => ManagedProject;
  updateProject: (project: ManagedProject) => void;
  removeProject: (id: string) => void;
  syncNow: () => Promise<void>;
};

const ContentContext = createContext<ContentContextValue | null>(null);

const ADMIN_PASSWORD =
  import.meta.env.VITE_ADMIN_PASSWORD?.toString() || "ivy-admin";

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

  const persistLocalAndRemote = useCallback(
    async (next: SiteContent) => {
      setContent(next);
      saveSiteContent(next);
      if (isSupabaseConfigured) {
        const result = await persistSiteContentToSupabase(next);
        if (!result.ok) {
          console.error("Failed to sync with Supabase:", result.error);
        }
      }
    },
    [],
  );

  const updateContent = useCallback(
    (updater: (current: SiteContent) => SiteContent) => {
      setContent((current) => {
        const next = updater(current);
        saveSiteContent(next);
        if (isSupabaseConfigured) {
          void persistSiteContentToSupabase(next).then((result) => {
            if (!result.ok) {
              console.error("Failed to sync with Supabase:", result.error);
            }
          });
        }
        return next;
      });
    },
    [],
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
    let created = project;
    setContent((current) => {
      created = {
        ...project,
        n: String(5 + current.projects.length).padStart(2, "0"),
      };
      const next = { ...current, projects: [...current.projects, created] };
      saveSiteContent(next);
      if (isSupabaseConfigured) {
        void persistSiteContentToSupabase(next);
      }
      return next;
    });
    return created;
  }, []);

  const updateProject = useCallback((project: ManagedProject) => {
    setContent((current) => {
      const next = {
        ...current,
        projects: current.projects.map((item) =>
          item.id === project.id ? project : item,
        ),
      };
      saveSiteContent(next);
      if (isSupabaseConfigured) {
        void persistSiteContentToSupabase(next);
      }
      return next;
    });
  }, []);

  const removeProject = useCallback((id: string) => {
    setContent((current) => {
      const next = {
        ...current,
        projects: current.projects.filter((item) => item.id !== id),
      };
      saveSiteContent(next);
      if (isSupabaseConfigured) {
        void persistSiteContentToSupabase(next);
      }
      return next;
    });
  }, []);

  const syncNow = useCallback(async () => {
    await persistLocalAndRemote(content);
  }, [content, persistLocalAndRemote]);

  const value = useMemo(
    () => ({
      content,
      isAdmin,
      isSyncing,
      login,
      logout,
      updateContent,
      addProject,
      updateProject,
      removeProject,
      syncNow,
    }),
    [
      content,
      isAdmin,
      isSyncing,
      login,
      logout,
      updateContent,
      addProject,
      updateProject,
      removeProject,
      syncNow,
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
