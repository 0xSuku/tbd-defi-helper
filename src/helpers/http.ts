import axios from 'axios';
import { Protocol } from '../shared/types/protocols';
import { TokenAmount } from '../shared/types/tokens';

const urlBackend = process.env.REACT_APP_URL_BACKEND || '';

export async function fetchWalletTokens(address: string): Promise<TokenAmount[]> {
    const walletResponse = await axios.get<TokenAmount[]>(urlBackend + '/fetchWalletTokens', { params: { address } });
    return walletResponse.data;
}

export async function fetchWalletNatives(address: string): Promise<TokenAmount[]> {
    const walletResponse = await axios.get<TokenAmount[]>(urlBackend + '/fetchWalletNatives', { params: { address } });
    return walletResponse.data;
}

export async function fetchWalletProtocols(address: string): Promise<Protocol[]> {
    const walletResponse = await axios.get<Protocol[]>(urlBackend + '/fetchWalletProtocols', { params: { address } });
    return walletResponse.data;
}