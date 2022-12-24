import getBalance from "./getBalance";

export default async function requestAccounts(): Promise<Wallet> {
	try {
		const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
		const address: string = accounts && window.ethereum.selectedAddress.toLocaleLowerCase();
		const chainId: number = accounts && parseInt(window.ethereum.chainId, 16);

		return {
			address,
			isConnected: address.length > 0,
			balance: await getBalance(window.ethereum.selectedAddress),
			chainId
		};
	} catch (error) {
		console.log("Error connecting Metamask:", error);
		return {
			address: "",
			isConnected: false,
			balance: 0,
			chainId: 0
		};
	}
}
