import disconnectWallet from "../../helpers/wallet/disconnect";
import requestAccounts from "../../helpers/wallet/requestAccounts";

const ConnectMetamask = (wallet: Wallet) => {
    if (wallet.isConnected) {
        return (
            <div onClick={disconnectWallet} className="align-self-center text-white">{wallet.address}</div>
        )
    } else {
        return (
            <div className="btn btn-dark text-white px-3 rounded-md text-center"
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

export default ConnectMetamask;
