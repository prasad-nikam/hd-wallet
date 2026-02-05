import { useState } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

const AddWallet = () => {
	const [mnemonic, setMnemonic] = useState<string>();
	const [show, setShow] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [publicKeys, setPublicKeys] = useState<string[]>([]);

	const generateSecreatePhrase = () => {
		const mn = generateMnemonic();
		setMnemonic(mn);
	};

	const createWallet = async () => {
		if (mnemonic) {
			const seed = await mnemonicToSeed(mnemonic);
			const path = `m/44'/501'/${currentIndex}'/0'`;
			const derivedSeed = derivePath(path, seed.toString("hex")).key;
			const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
			const keypair = Keypair.fromSecretKey(secret);

			setCurrentIndex(currentIndex + 1);
			setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
		}
	};
	return (
		<div className="flex flex-col pt-10 gap-1">
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
					Create Wallet
				</button>
			</div>

			{publicKeys.map((p) => (
				<div>{p}</div>
			))}
		</div>
	);
};

export default AddWallet;
