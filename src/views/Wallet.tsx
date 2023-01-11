import { useEffect } from 'react'
import TokenItemComponent from '../components/wallet/token-item';
import useTokens from '../context/tokens/useTokens';
import useWallet from '../context/wallet/useWallet';
import { fetchWalletNatives, fetchWalletTokens } from '../helpers/http';


export default function Protocols() {

    const { wallet } = useWallet();
    const { tokens, setTokens } = useTokens();

    useEffect(() => {
        const startWallet = async () => {
            try {
                const walletNatives = await fetchWalletNatives(wallet.address);
                const walletTokens = await fetchWalletTokens(wallet.address);
                const walletComplete = walletNatives.concat(walletTokens);
                if (walletComplete) {
                    const walletCompleteSorted = walletComplete.sort((a, b) => b.usdValue - a.usdValue);
                    setTokens(walletCompleteSorted);
                }
            } catch (err: any) {
                debugger;
            }
        }

        if (wallet.isConnected) {
            startWallet();
        }
    }, [wallet.isConnected, wallet.address, setTokens]);

    return (
        wallet.isConnected ? (
            <div className="component-display">
                <TokenItemComponent tokenAmounts={tokens}></TokenItemComponent>
            </div>
        ) : (
            <div>Not connected</div>
        )
    );
}