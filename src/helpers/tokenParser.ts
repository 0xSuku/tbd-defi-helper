import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { BigNumber, BigNumberish } from "ethers";

export function bnToFixed(amount: BigNumberish, token: Token) {
    const amountBN = BigNumber.from(amount);
    const currencyAmount = CurrencyAmount.fromRawAmount(token, amountBN.toString());
    return currencyAmount.toFixed(token.decimals)
}