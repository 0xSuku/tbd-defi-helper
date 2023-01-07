import { useEffect } from 'react'
import useWallet from '../context/wallet/useWallet';
import useProtocol from '../context/protocols/useProtocols';
import ProtocolComponent from '../components/protocol/protocol';
import { fetchWalletProtocols } from '../helpers/http';

export default function Protocols() {
    const { wallet } = useWallet();
    const { protocols, setProtocols } = useProtocol();
    let addressConnected = '';

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
            if (wallet.address !== addressConnected) {
                addressConnected = wallet.address;
                setProtocols([]);
            }
            startProtocols();
        }
    }, [wallet.isConnected, wallet.address, setProtocols]);

    useEffect(() => {
        if (protocols.length) {
        }
    }, [protocols]);

    return (
        wallet.isConnected ? (
            <div className="flex flex-col items-center bg-slate-100 h-screen justify-center">
                {
                    protocols.map(protocol => <ProtocolComponent {...protocol}></ProtocolComponent>)
                }
            </div>
        ) : (
            <div>Not connected</div>
        )
    );
}