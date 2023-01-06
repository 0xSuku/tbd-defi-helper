import axios from 'axios';
import { TokenAmount } from '../entities/types/shared/types';

const urlBackend = process.env.REACT_APP_URL_BACKEND || '';

export async function fetchWalletTokens(address: string): Promise<TokenAmount[]> {
    const walletResponse = await axios.get<TokenAmount[]>(urlBackend + '/fetchWalletTokens', { params: { address } });
    return walletResponse.data;
}

export async function fetchWalletNatives(address: string): Promise<TokenAmount[]> {
    const walletResponse = await axios.get<TokenAmount[]>(urlBackend + '/fetchWalletNatives', { params: { address } });
    return walletResponse.data;
}