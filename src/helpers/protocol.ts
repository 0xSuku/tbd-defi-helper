import { Protocols } from "./protocols/constants";

export function getProtocolName(symbol: Protocols): string {
    return Protocols[symbol].replace('_', ' ');
}