import { Protocols } from "../shared/protocols/constants";

export function getProtocolName(symbol: Protocols): string {
    return Protocols[symbol].replace('_', ' ');
}