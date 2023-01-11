import { useEffect } from 'react'
import useWallet from '../context/wallet/useWallet';
import useProtocol from '../context/protocols/useProtocols';
import ProtocolComponent from '../components/protocol/protocol';
import { fetchWalletProtocols } from '../helpers/http';

export default function Protocols() {
    const { wallet } = useWallet();
    const { protocols, setProtocols } = useProtocol();

    useEffect(() => {
        const startProtocols = async () => {
            try {
                const walletProtocols = await fetchWalletProtocols(wallet.address);
                if (walletProtocols) {
                    setProtocols(walletProtocols);
                }
            } catch (err: any) {
                debugger;
            }
        }

        if (wallet.isConnected) {
            startProtocols();
        }
    }, [wallet.isConnected, wallet.address, setProtocols]);

    useEffect(() => {
        if (protocols.length) {
        }
    }, [protocols]);

    return (
        wallet.isConnected ? (
            <div className="component-display">
                {
                    protocols.map(protocol => <ProtocolComponent {...protocol}></ProtocolComponent>)
                }
            </div>
        ) : (
            <div>Not connected</div>
        )
    );
}