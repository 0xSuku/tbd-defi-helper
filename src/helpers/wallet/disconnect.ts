export default async function disconnectWallet() {
    await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [{ eth_accounts: {} }]
    });
}