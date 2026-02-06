import { useEffect, useState } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import Wallet from "./Wallet";
import bs58 from "bs58";
const AddWallet = () => {
	const [mnemonic, setMnemonic] = useState<string>();
	const [show, setShow] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	type StoredKeypair = {
		publicKey: string;
		secretKey: string;
	};
	const [keypairs, setKeypairs] = useState<StoredKeypair[]>([]);

	const generateSecreatePhrase = () => {
		const mn = generateMnemonic();
		localStorage.setItem("mnemonic", mn);
		localStorage.removeItem("publicKeys");

		setMnemonic(mn);
	};

	const createWallet = async () => {
		if (mnemonic) {
			localStorage.setItem("mnemonic", mnemonic);
			const seed = await mnemonicToSeed(mnemonic);
			const idx = currentIndex;
			const path = `m/44'/501'/${idx}'/0'`;
			const derivedSeed = derivePath(path, seed.toString("hex")).key;
			const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
			const keypair = Keypair.fromSecretKey(secret);

			const publicKey = keypair.publicKey.toBase58();
			const secretKey = bs58.encode(keypair.secretKey);

			const keys = [
				...keypairs,
				{ publicKey: publicKey, secretKey: secretKey },
			];
			localStorage.setItem("keypairs", JSON.stringify(keys));

			setKeypairs((prev) => [
				...prev,
				{ publicKey: publicKey, secretKey: secretKey },
			]);

			localStorage.setItem("currentIndex", idx + 1 + "");
			setCurrentIndex(idx + 1);
		}
	};

	const deleteAll = () => {
		localStorage.removeItem("mnemonic");
		localStorage.removeItem("keypairs");
		localStorage.removeItem("currentIndex");
		setMnemonic("");
		setKeypairs([]);
		setCurrentIndex(0);
	};

	useEffect(() => {
		let index = localStorage.getItem("currentIndex");
		if (index) setCurrentIndex(Number(index));
		const storedmnemonic = localStorage.getItem("mnemonic");
		if (storedmnemonic) setMnemonic(storedmnemonic);
		const storedkeypairs = localStorage.getItem("keypairs");
		if (storedkeypairs) {
			try {
				const parsed = JSON.parse(storedkeypairs);
				if (Array.isArray(parsed)) {
					setKeypairs(parsed);
				} else {
					setKeypairs([]);
				}
			} catch {
				setKeypairs([]);
			}
		}
	}, []);

	return (
		<div className="flex flex-col h-full flex-1 min-h-0 gap-2">
			<div className="text-2xl tracking-tight">
				Enter Your Secreate Phrase
			</div>
			<div className="text-muted">(Your secreate stays with you!)</div>

			<div className="flex h-10 w-full border border-border rounded-md ">
				<input
					type={show ? "text" : "password"}
					value={mnemonic}
					onChange={(e) => setMnemonic(e.target.value)}
					className="flex-1 px-2 text-md"
					placeholder="Enter your secreat phrase or click the button to create one"
				/>
				<button
					className="px-2 cursor-pointer"
					onClick={() => setShow((s) => !s)}
				>
					{show ? "👁" : "🙈"}
				</button>

				<button
					onClick={generateSecreatePhrase}
					className="bg-muted text-white  px-4 hover:bg-muted/80"
				>
					Generate Secreate Phrase
				</button>
				<button
					onClick={createWallet}
					className="bg-primary text-white rounded-r-md px-4 hover:bg-primary/80"
				>
					Add Wallet
				</button>
			</div>
			<button
				onClick={deleteAll}
				className="bg-red-400 w-fit text-white rounded-md text-sm p-2 hover:bg-primary/80"
			>
				Delete All
			</button>
			<div className="flex flex-1 min-h-0 flex-col gap-2 pt-10 overflow-y-auto scrollbar-hide scroll-smooth">
				{keypairs?.map((p, idx) => (
					<Wallet key={p.publicKey} pubkey={p.publicKey} idx={idx} />
				))}
			</div>
		</div>
	);
};

export default AddWallet;
