import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import { ProtocolTypes, Protocols } from '../../../helpers/protocols/constants';

declare type IProtocolItem = {
    pool: Token[];
    balance: CurrencyAmount[];
    rewards?: CurrencyAmount[];
    usdValue: CurrencyAmount;
    address: string;
}

declare type IProtocolInfo = {
    items?: IProtocolItem[];
    type: ProtocolTypes;
}

declare type IProtocol = {
    info: IProtocolInfo[];
    symbol: Protocols;
    name: string;
}