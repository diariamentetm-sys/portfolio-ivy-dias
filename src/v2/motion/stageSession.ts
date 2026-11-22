const STORAGE_KEY = "ivydc-v2-stage-scroll";

export type StageSession = {
  scrollY: number;
  activeIndex: number;
  savedAt: number;
};

export function saveStageSession(session: Omit<StageSession, "savedAt">) {
  try {
    const payload: StageSession = { ...session, savedAt: Date.now() };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // private mode / quota — ignore
  }
}

export function readStageSession(maxAgeMs = 1000 * 60 * 30): StageSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StageSession;
    if (!parsed || typeof parsed.scrollY !== "number") return null;
    if (Date.now() - parsed.savedAt > maxAgeMs) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearStageSession() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
