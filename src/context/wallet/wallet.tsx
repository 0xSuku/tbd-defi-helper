import React, { useEffect } from "react";
import requestAccounts from "../../helpers/wallet/requestAccounts";


type Values = {
	wallet: Wallet;
	setWallet: (values: Wallet) => void;
};

const initialValues: Values = {
	wallet: {
		address: "",
		isConnected: false,
		balance: 0,
		chainId: 0,
	},
	setWallet: () => { },
};

const WalletContext = React.createContext<Values>(initialValues);

const WalletProvider = ({ children }: any) => {
	const [wallet, setWallet] = React.useState<Wallet>({
		address: window.ethereum.selectedAddress,
		isConnected: false,
		balance: 0,
		chainId: 0
	});
	const getUserInfo = async () => {
		if (window.ethereum) {
			const userInfo = await requestAccounts();
			setWallet({
				...wallet,
				...userInfo,
			});
		}
	};
	const values: Values = { wallet, setWallet };

	if (window.ethereum)
		window.ethereum.on("accountsChanged", async (accounts: any) => {
			getUserInfo();
		});

	useEffect(() => {
		window.setTimeout(() => {
			getUserInfo();
		}, 1500);
	}, []);

	return (
		<WalletContext.Provider value={values}>
			{children}
		</WalletContext.Provider>
	);
};

export { WalletProvider, WalletContext };
