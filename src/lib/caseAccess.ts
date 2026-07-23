const STORAGE_PREFIX = "ivy-case-access:";

export function getCasePasswordEnv(caseId: string): string {
  if (caseId === "gerenciador-de-riscos-com-ai") {
    return (
      import.meta.env.VITE_GERENCIADOR_RISCOS_PASSWORD?.toString() || "p3tr0"
    );
  }
  return "";
}

export function isCaseUnlocked(caseId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(`${STORAGE_PREFIX}${caseId}`) === "1";
  } catch {
    return false;
  }
}

export function unlockCase(caseId: string): void {
  try {
    sessionStorage.setItem(`${STORAGE_PREFIX}${caseId}`, "1");
  } catch {
    // sessionStorage may be blocked; unlock still works for this session in memory via React state
  }
}

export function verifyCasePassword(caseId: string, password: string): boolean {
  const expected = getCasePasswordEnv(caseId);
  if (!expected) return true;
  return password === expected;
}
