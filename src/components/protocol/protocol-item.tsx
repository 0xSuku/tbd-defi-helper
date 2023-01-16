import Table from 'react-bootstrap/Table';
import qiFarms from '../../shared/protocols/qidao/qidao-farms';
import qiAdapter from '../../protocols/qidao/qidao-adapter';
import gmxAdapter from '../../protocols/gmx/gmx-frontend-adapter';
import { bnDisplay } from '../../helpers/tokenParser';
import { Protocols, ProtocolTypes } from '../../shared/protocols/constants';
import { ProtocolItem } from '../../shared/types/protocols';
// import { mummyRewardRouterAddress, rewardRouterABI } from '../../shared/protocols/mummy/mummy-abis';
// import { mummyFarms } from '../../shared/protocols/mummy/mummy-farms';
import './protocol-item.scss';

export interface IProtocolItemComponent {
    items: ProtocolItem[];
    symbol: Protocols;
    type: ProtocolTypes;
}

export default function ProtocolItemComponent(protocolItem: IProtocolItemComponent) {
    const claimRewards = async (address: string) => {
        let contractStaticInfo;
        try {
            switch (protocolItem.symbol) {
                case Protocols.Qi_Dao:
                    contractStaticInfo = qiFarms.find(qiFarm => qiFarm.address === address);
                    if (contractStaticInfo) {
                        await qiAdapter.claimRewards(contractStaticInfo);
                    }
                    break;
                // case Protocols.Mummy:
                //     contractStaticInfo = mummyFarms.find(mummyFarms => mummyFarms.address === address);
                //     if (contractStaticInfo) {
                //         await gmxAdapter.claimRewards(contractStaticInfo, mummyRewardRouterAddress, JSON.stringify(rewardRouterABI));
                //     }
                //     break;
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
                        <th className='text-end'>Rewards</th>
                        <th className='text-end'>USD Value</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr>
                            <td>{item.pool.map(p => p.token.name)}</td>
                            <td>
                                {
                                    item.balance.map(balance => {
                                        return <div>
                                            {bnDisplay(balance.amount, 4) + ' ' + balance.tokenDetail.token.symbol} (${bnDisplay(balance.usdValue.toString(), 2)})
                                        </div>
                                    })
                                }
                            </td>
                            <td className='text-end'>
                                {
                                    item.rewards?.map(reward => {
                                        return <div>
                                            {bnDisplay(reward.amount, 4) + ' ' + reward.tokenDetail.token.symbol} (${bnDisplay(reward.usdValue.toString(), 2)})
                                        </div>
                                    })
                                }
                            </td>
                            <td className='text-end'>${item.usdValue}</td>
                            <td><button onClick={() => claimRewards(item.address)}>Claim</button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    } else {
        return <></>
    }
}