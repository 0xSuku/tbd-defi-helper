import axios from 'axios';
import { useState } from 'react';
import { getProtocolName } from '../../helpers/protocol';
import { bnDisplay } from '../../helpers/tokenParser';
import gmxAdapter from '../../protocols/gmx/gmx-frontend-adapter';
import qiAdapter from '../../protocols/qidao/qidao-adapter';
import { ChainId } from '../../shared/chains';
import { Protocols, ProtocolTypes } from '../../shared/protocols/constants';
import { DepositInfo } from '../../shared/protocols/entities/deposit';
import { QiDaoFarmVaultDepositInfo } from '../../shared/protocols/entities/qidao';
import { gmxFarms, gmxRewardRouterAddress } from '../../shared/protocols/gmx-forks/gmx/gmx-farms';
import { mummyFarms, rewardRouterV2 } from '../../shared/protocols/gmx-forks/mummy/mummy-farms';
import qiFarms from '../../shared/protocols/qidao/qidao-farms';
import { Protocol, DepositItem } from '../../shared/types/protocols';
import IconProtocolComponent from '../icon-protocol/icon-protocol';
import IconTokenComponent from '../icon-token/icon-token';
import './protocol-item.scss';

export interface IDepositItemComponent {
    items: DepositItem[];
    protocol: Protocol;
    type: ProtocolTypes;
}

const enabledClaimProtocols: Protocols[] = [
    Protocols.Qi_Dao,
    Protocols.Mummy,
    Protocols.GMX
]

export default function DepositItemComponent(depositItem: IDepositItemComponent) {
    const [showDepositInfo, setShowDepositInfo] = useState<boolean[]>([]);
    const [apr, setApr] = useState<number[]>([]);

    const claimRewards = async (address: string) => {
        let depositInfo: DepositInfo | undefined;
        try {
            switch (depositItem.protocol.symbol) {
                case Protocols.Qi_Dao:
                    depositInfo = qiFarms.find(farm => farm.address === address);
                    if (depositInfo) {
                        await qiAdapter.claimRewards(depositInfo as QiDaoFarmVaultDepositInfo);
                    }
                    break;
                case Protocols.Mummy:
                    depositInfo = mummyFarms.find(farm => farm.address === address);
                    if (depositInfo) {
                        await gmxAdapter.claimRewards(depositInfo, rewardRouterV2);
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

    const toggleDepositInfo = (index: number) => {
        const newShowDepositInfo: boolean[] = [];
        items.forEach((_, _index) => {
            if (_index === index) {
                if (!showDepositInfo[_index]) {
                    axios.get('https://yields.llama.fi/poolsEnriched?pool=' + depositItem.items[_index].depositId).then(llamaResponse => {
                        if (llamaResponse.data?.data.length) {
                            const apys = [...apr || []];
                            apys[_index] = llamaResponse.data.data[0].apy;
                            setApr(apys);
                        }
                    })
                    newShowDepositInfo[_index] = true;
                } else {
                    newShowDepositInfo[_index] = false;
                }
            } else {
                newShowDepositInfo[_index] = showDepositInfo[_index] || false;
            }
        })
        setShowDepositInfo(newShowDepositInfo);
    }

    const items = depositItem.items;
    if (items) {
        return <>
            {items.map((item: DepositItem, index) => (
                <>
                    <tr onClick={() => toggleDepositInfo(index)} className="deposit-info">
                        <td>
                            <div className='protocol-title'>
                                {item.name ? item.name : item.balance.map(p => p.tokenDetail.token.symbol).join('/')}
                            </div>
                            <div className='protocol-name'>
                                <IconProtocolComponent protocol={depositItem.protocol}></IconProtocolComponent>
                                {getProtocolName(depositItem.protocol.symbol)}
                                &nbsp;({ChainId[depositItem.protocol.chainId]})
                            </div>
                        </td>
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
                                    return <div className='token-balance'>
                                        <IconTokenComponent token={reward.tokenDetail.token}></IconTokenComponent>
                                        <div>
                                            {bnDisplay(reward.amount, 4) + ' ' + reward.tokenDetail.token.symbol} (${bnDisplay(reward.usdValue.toString(), 2)})
                                        </div>
                                    </div>
                                })
                            }
                        </td>
                        <td className='text-end'>${bnDisplay(item.usdValue.toString(), 2)}</td>
                        <td>
                            {
                                enabledClaimProtocols.some(ecp => ecp === depositItem.protocol.symbol) ?
                                    <div className='protocol-item-info-container'>
                                        <button className='claim-button' onClick={() => claimRewards(item.address)}>$</button>
                                    </div>
                                    : <></>
                            }
                        </td>
                        {
                            depositItem.items[index].depositId ?
                                <div className="display-more-info">&#9662;</div>
                                : <></>
                        }
                    </tr>
                    {
                        apr[index] ?
                            <tr className={'protocol-item-info' + (showDepositInfo[index] ? ' active' : '')}>
                                <td colSpan={5}>
                                    <div className='protocol-item-info-container'>
                                        <div>APR: {apr[index]}%</div>
                                    </div>
                                </td>
                            </tr>
                            : <></>
                    }

                </>
            ))}
        </>
    } else {
        return <></>
    }
}