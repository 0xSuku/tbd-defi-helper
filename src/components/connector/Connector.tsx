import ConnectMetamask from "./ConnectMetamask";

export default function Connector() {
    if (!window.ethereum) {
        return (
            <span className="tracking-wide">
                Metamask is not installed in this browser
            </span>
        );
    } else {
        return <ConnectMetamask />;
    }
}