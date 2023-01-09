import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { BigNumber, BigNumberish } from "ethers";

export function bnToFixed(amount: BigNumberish, token: Token) {
    const amountBN = BigNumber.from(amount);
    const currencyAmount = CurrencyAmount.fromRawAmount(token, amountBN.toString());
    return currencyAmount.toFixed(token.decimals)
}

export function bnDisplay(amountString: string, decimals: number) {
    const decimalParts = amountString.split('.');
    if (decimalParts.length > 1) {
        decimalParts[1] = decimalParts[1].substring(0, decimals);
        return decimalParts.join('.');
    } else {
        return amountString;
    }
}