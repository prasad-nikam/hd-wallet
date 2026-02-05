import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { useTheme } from "./context/ThemeContext";
import { themes, type ThemeName } from "./context/themes";
import AddWallet from "./components/AddWallet";
import Wallet from "./components/Wallet";

function App() {
	const { setTheme } = useTheme();

	useEffect(() => {
		let theme = localStorage.getItem("theme");
		if (theme && theme in themes) setTheme(theme as ThemeName);
	}, []);

	return (
		<div className="bg-bg text-text">
			<div className="h-screen max-w-7xl m-auto flex flex-col p-4 ">
				<Navbar />
				<AddWallet />
				<Wallet />
			</div>
		</div>
	);
}

export default App;
