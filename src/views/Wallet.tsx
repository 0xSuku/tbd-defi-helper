import { useEffect } from 'react'
import { Button } from 'reactstrap';
import { ethers } from "ethers";
import useWallet from '../context/wallet/useWallet';
import ProtocolComponent from '../components/protocol/protocol';

export default function Protocols() {

    const { wallet } = useWallet();

    useEffect(() => {
        if (wallet.isConnected && wallet.chainId === 137) {
            setWallet();
        }
    }, [wallet.isConnected, wallet.chainId]);

    function setWallet() {
        
    }

    function showData() {
        return <>
            <div className="my-3 uppercase tracking-wide text-xs">
                Chain: {wallet.chainId} | Balance: {wallet.balance.toString().slice(0, 10)} MATIC
            </div>
        </>
    }

    return (
        wallet.isConnected ? (
            <div className="flex flex-col items-center bg-slate-100 h-screen justify-center">
                {showData()}
            </div>
        ) : (
            <div>Not connected</div>
        )
    );
}