import { useEffect } from 'react'
import useWallet from '../context/wallet/useWallet';
import useProtocol from '../context/protocols/useProtocols';
import ProtocolComponent from '../components/protocol/protocol';
import { fetchWalletProtocols } from '../helpers/http';
import { Table } from 'reactstrap';

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
                <Table className='protocol-table' cellPadding={0} cellSpacing={0} border={0}>
                    <thead>
                        <tr className='protocol-column'>
                            <th>Deposit/Protocol</th>
                            <th>Balances</th>
                            <th>Pending Rewards</th>
                            <th className='text-end'>Usd Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            protocols.map(protocol => <ProtocolComponent {...protocol}></ProtocolComponent>)
                        }
                    </tbody>
                </Table>
            </div>
        ) : (
            <div>Not connected</div>
        )
    );
}