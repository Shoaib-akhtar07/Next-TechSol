export interface ThemeSettings {
  primary: string;
  background: string;
  foreground: string;
  textScale: number;
}

export const DEFAULT_THEME: ThemeSettings = {
  primary: "#2B6E78",
  background: "#C7D3D4",
  foreground: "#101B1E",
  textScale: 1,
};

export const TEXT_SIZE_OPTIONS: { label: string; value: number }[] = [
  { label: "Small", value: 0.9 },
  { label: "Default", value: 1 },
  { label: "Large", value: 1.1 },
  { label: "X-Large", value: 1.25 },
];

const STORAGE_KEY = "next-techsol-theme";

export function loadTheme(): ThemeSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_THEME;
    return { ...DEFAULT_THEME, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_THEME;
  }
}

export function saveTheme(theme: ThemeSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  } catch {}
}

export function applyTheme(theme: ThemeSettings) {
  const root = document.documentElement.style;
  root.setProperty("--primary", theme.primary);
  root.setProperty("--accent", theme.primary);
  root.setProperty("--ring", theme.primary);
  root.setProperty("--background", theme.background);
  root.setProperty("--foreground", theme.foreground);
  root.setProperty("--card-foreground", theme.foreground);
  root.setProperty("--text-primary", theme.foreground);
  root.setProperty("--text-scale", String(theme.textScale));
}
