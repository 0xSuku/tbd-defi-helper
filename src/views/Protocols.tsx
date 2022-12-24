import { useEffect } from 'react'
import { IProtocol } from '../entities/types/protocol';
import useWallet from '../context/wallet/useWallet';
import useProtocol from '../context/protocols/useProtocols';
import ProtocolComponent from '../components/protocol/protocol';
import protocolList from '../protocols';
import qiAdapter from '../protocols/qidao/qidao-adapter';

export default function Protocols() {
    const { wallet } = useWallet();
    const { protocols, setProtocols } = useProtocol();

    const _setProtocols = async () => {
        protocolList.forEach(protocol => protocol.info = []);
        const prot = await Promise.all(
            protocolList.map(async (protocol: IProtocol) => {
                protocol.info.push(await qiAdapter.getFarmInfo(wallet.address));
                return protocol;
            })
        );
        setProtocols(prot);
    }

    useEffect(() => {
        if (wallet.isConnected) {
            _setProtocols();
        }
    }, [wallet, wallet.isConnected]);

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