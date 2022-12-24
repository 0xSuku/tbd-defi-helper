import requestAccounts from "../../helpers/wallet/requestAccounts";

const ConnectMetamask = () => {
    return (
        <div className="btn btn-dark text-white px-2 rounded-md text-center m-0"
            onClick={() => {
                if (window.ethereum) {
                    requestAccounts();
                }
            }}>
            Connect Wallet
        </div>
    );
};

export default ConnectMetamask;
