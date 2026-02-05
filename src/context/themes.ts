export const themes = {
	light: {
		"--color-bg": "#ffffff",
		"--color-surface": "#f9fafb",
		"--color-text": "#111827",
		"--color-muted": "#6b7280",
		"--color-primary": "#111111",
		"--color-secondary": "#ef4444",
		"--color-border": "#e5e7eb",
	},
	dark: {
		"--color-bg": "#020617",
		"--color-surface": "#0f172a",
		"--color-text": "#e5e7eb",
		"--color-muted": "#94a3b8",
		"--color-primary": "#818cf8",
		"--color-secondary": "#f87171",
		"--color-border": "#1f2937",
	},
	ocean: {
		"--color-bg": "#022c22",
		"--color-surface": "#064e3b",
		"--color-text": "#e0ffff",
		"--color-muted": "#99f6e4",
		"--color-primary": "#2dd4bf",
		"--color-secondary": "#22c55e",
		"--color-border": "#065f46",
	},
	lavender: {
		"--color-bg": "#e6e6fa",
		"--color-surface": "#ffffff",
		"--color-text": "#4b0082",
		"--color-muted": "#7b68a6",
		"--color-primary": "#9370db",
		"--color-secondary": "#ba55d3",
		"--color-border": "#d8bfd8",

		"--color-accent": "#dda0dd",
		"--color-success": "#6abf69",
		"--color-warning": "#e6a23c",
		"--color-danger": "#d95763",
		"--color-shadow": "rgba(75, 0, 130, 0.12)",
	},
} as const;

export type ThemeName = keyof typeof themes;

