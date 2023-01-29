import disconnectWallet from "../../helpers/wallet/disconnect";
import requestAccounts from "../../helpers/wallet/requestAccounts";
import "./Connected.scss";

const ConnectMetamask = (wallet: Wallet) => {
    if (wallet.isConnected) {
        return (
            <div onClick={disconnectWallet} className="align-self-center text-color">{shortenAddress(wallet.address)}</div>
        )
    } else {
        return (
            <div className="btn btn-dark text-color px-3 rounded-md text-center"
                onClick={() => {
                    if (window.ethereum) {
                        requestAccounts();
                    }
                }}>
                Connect Wallet
            </div>
        );
    }
};

function shortenAddress(address: string): string {
    if (address.length !== 42) return address;

    return address.substring(0, 6) + '...' + address.substring(38);
}

export default ConnectMetamask;
