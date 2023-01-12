import { BigNumber, ethers } from 'ethers';
import { bnDisplay } from '../../helpers/tokenParser';
import { TokenAmount } from '../../shared/types/tokens';
import Table from 'react-bootstrap/Table';
import './token-item.scss';
import IconTokenComponent from '../icon-token/icon-token';

export default function TokenItemComponent(params: { tokenAmounts: TokenAmount[] }) {
    const tokenAmounts = params.tokenAmounts;
    if (tokenAmounts.length) {
        return <Table className='token-table'>
            <thead>
                <tr className='token-column'>
                    <th></th>
                    <th>Token</th>
                    <th className='text-end'>Price</th>
                    <th className='text-end'>Balance</th>
                    <th className='text-end'>USD Value</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tokenAmounts.map(tokenAmount => {
                    const amountBN = BigNumber.from(tokenAmount.amount);
                    if (amountBN.gt(0)) {
                        const amountFormatted = ethers.utils.formatUnits(amountBN, tokenAmount.tokenDetail.token.decimals);
                        return <tr>
                            <td><IconTokenComponent token={tokenAmount.tokenDetail.token}></IconTokenComponent></td>
                            <td>{tokenAmount.tokenDetail.token.symbol}</td>
                            <td className='text-end'>${bnDisplay(tokenAmount.price.toString(), 2)}</td>
                            <td className='text-end' title={amountFormatted}>{bnDisplay(amountFormatted, 4)}</td>
                            <td className='text-end'>${bnDisplay(tokenAmount.usdValue.toString(), 2)}</td>
                            <td><button onClick={() => { }}>Dump</button></td>
                        </tr>
                    } else {
                        return <></>
                    }
                })}
            </tbody>
        </Table>
    } else {
        return <></>
    }
}