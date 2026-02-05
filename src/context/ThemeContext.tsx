import React, { createContext, useContext, useEffect, useState } from "react";

import { themes } from "./themes";

type ThemeName = keyof typeof themes;

interface ThemeContextType {
	theme: ThemeName;
	setTheme: React.Dispatch<React.SetStateAction<ThemeName>>;
}
const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
	children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<ThemeName>("dark");

	useEffect(() => {
		const themeVars = themes[theme];

		Object.entries(themeVars).forEach(([key, value]) => {
			document.documentElement.style.setProperty(key, value);
		});
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error("useTheme must be used inside ThemeProvider");
	}
	return ctx;
};
