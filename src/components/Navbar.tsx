import { useTheme } from "../context/ThemeContext";
import { themes } from "../context/themes";

function Navbar() {
	const { setTheme } = useTheme();
	type ThemeName = keyof typeof themes;

	return (
		<div className="flex justify-between items-center">
			<div className="text-2xl font-semibold">Wault</div>

			<div className="flex gap-2 p-3 py-2 bg-surface rounded-full border border-border">
				{(Object.keys(themes) as ThemeName[]).map((themeName) => {
					const themeObj = themes[themeName];

					return (
						<button
							key={themeName}
							style={{
								backgroundColor: themeObj["--color-bg"],
								color: themeObj["--color-text"],
								borderColor: themeObj["--color-border"],
							}}
							className="size-6 rounded-full border-4 cursor-pointer"
							onClick={() => {
								setTheme(themeName);
								localStorage.setItem("theme", themeName);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Navbar;
