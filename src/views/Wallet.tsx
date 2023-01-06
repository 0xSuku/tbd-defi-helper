import { CurrencyAmount, Token } from '@uniswap/sdk-core';
import { useEffect } from 'react'
import useTokens from '../context/tokens/useTokens';
import useWallet from '../context/wallet/useWallet';
import { TokenAmount } from '../entities/types/shared/types';
import { fetchWalletNatives, fetchWalletTokens } from '../helpers/http';
import { bnToFixed } from '../helpers/tokenParser';


export default function Protocols() {

    const { wallet } = useWallet();
    const { tokens, setTokens } = useTokens();

    useEffect(() => {
        const setWallet = async () => {
            try {
                const walletNatives = await fetchWalletNatives(wallet.address);
                const walletTokens = await fetchWalletTokens(wallet.address);
                const walletComplete = walletNatives.concat(walletTokens);
                if (walletComplete) {
                    setTokens(walletComplete);
                }
            } catch (err: any) {
                debugger;
            }
        }

        if (wallet.isConnected) {
            setWallet();
        }
    }, [wallet.isConnected, wallet.address, setTokens]);

    function showData() {
        return <>
            <div className="my-3 uppercase tracking-wide text-xs">
                Chain: {wallet.chainId} | Balance: {wallet.balance.toString().slice(0, 10)} MATIC
            </div>
            {
                tokens.length ?
                    <div className='center-container'>
                        {tokens.map((tokenAmount: TokenAmount) => <div>{tokenAmount.token.symbol}: {bnToFixed(tokenAmount.amount, tokenAmount.token)}</div>)}
                    </div>
                    : <div></div>
            }
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