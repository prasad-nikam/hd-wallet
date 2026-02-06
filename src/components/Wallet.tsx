type walletProp = {
	pubkey: string;
	idx: number;
};

const Wallet = ({ pubkey, idx }: walletProp) => {
	console;
	return (
		<div key={idx} className="p-4 rounded-2xl bg-surface">
			<div className="text-xl font-semibold">Wallet {idx + 1}</div>
			<div>{pubkey}</div>
		</div>
	);
};

export default Wallet;
