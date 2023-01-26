import Table from 'react-bootstrap/Table';
import { bnDisplay } from '../../helpers/tokenParser';
import gmxAdapter from '../../protocols/gmx/gmx-frontend-adapter';
import qiAdapter from '../../protocols/qidao/qidao-adapter';
import { Protocols, ProtocolTypes } from '../../shared/protocols/constants';
import { DepositInfo } from '../../shared/protocols/entities/deposit';
import { QiDaoFarmVaultDepositInfo } from '../../shared/protocols/entities/qidao';
import { gmxFarms, gmxRewardRouterAddress } from '../../shared/protocols/gmx-forks/gmx/gmx-farms';
import { mummyFarms, mummyRewardRouterAddress } from '../../shared/protocols/gmx-forks/mummy/mummy-farms';
import qiFarms from '../../shared/protocols/qidao/qidao-farms';
import { ProtocolItem } from '../../shared/types/protocols';
import IconTokenComponent from '../icon-token/icon-token';
import './protocol-item.scss';

export interface IProtocolItemComponent {
    items: ProtocolItem[];
    symbol: Protocols;
    type: ProtocolTypes;
}

export default function ProtocolItemComponent(protocolItem: IProtocolItemComponent) {
    const claimRewards = async (address: string) => {
        let depositInfo: DepositInfo | undefined;
        try {
            switch (protocolItem.symbol) {
                case Protocols.Qi_Dao:
                    depositInfo = qiFarms.find(farm => farm.address === address);
                    if (depositInfo) {
                        await qiAdapter.claimRewards(depositInfo as QiDaoFarmVaultDepositInfo);
                    }
                    break;
                case Protocols.Mummy:
                    depositInfo = mummyFarms.find(farm => farm.address === address);
                    if (depositInfo) {
                        await gmxAdapter.claimRewards(depositInfo, mummyRewardRouterAddress);
                    }
                    break;
                case Protocols.GMX:
                    depositInfo = gmxFarms.find(farm => farm.address === address);
                    if (depositInfo) {
                        await gmxAdapter.claimRewards(depositInfo, gmxRewardRouterAddress);
                    }
                    break;
                default:
                    throw Error('Claim not declared');
            }
        } catch (ex: any) {
            if (ex.code === 4001) {
                console.log('User rejected the tx');
            }
        }
    }

    const items = protocolItem.items;
    if (items) {
        return <>
            <div className='protocol-type'>{ProtocolTypes[protocolItem.type]}</div>
            <Table className='protocol-table'>
                <thead>
                    <tr className='protocol-column'>
                        <th>Pool</th>
                        <th>Balance</th>
                        <th>Rewards</th>
                        <th className='text-end'>USD Value</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr>
                            <td>{item.name ? item.name : item.balance.map(p => p.tokenDetail.token.symbol).join(' + ')}</td>
                            <td>
                                {
                                    item.balance.map(balance => {
                                        return <div className='token-balance'>
                                            <IconTokenComponent token={balance.tokenDetail.token}></IconTokenComponent>
                                            <div>
                                                {bnDisplay(balance.amount, 4) + ' ' + balance.tokenDetail.token.symbol} (${bnDisplay(balance.usdValue.toString(), 2)})
                                            </div>
                                        </div>
                                    })
                                }
                            </td>
                            <td>
                                {
                                    item.rewards?.map(reward => {
                                        return <div>
                                            {bnDisplay(reward.amount, 4) + ' ' + reward.tokenDetail.token.symbol} (${bnDisplay(reward.usdValue.toString(), 2)})
                                        </div>
                                    })
                                }
                            </td>
                            <td className='text-end'>${bnDisplay(item.usdValue.toString(), 2)}</td>
                            <td><button className='claim-button' onClick={() => claimRewards(item.address)}>Claim</button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    } else {
        return <></>
    }
}