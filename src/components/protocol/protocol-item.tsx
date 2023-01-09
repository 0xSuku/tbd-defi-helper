import Table from 'react-bootstrap/Table';
import qiAdapter from '../../shared/protocols/qidao/qidao-adapter';
import qiFarms from '../../shared/protocols/qidao/qidao-farms';
import gmxAdapter from '../../shared/protocols/gmx/gmx-adapter';
import { bnDisplay } from '../../helpers/tokenParser';
import { Protocols, ProtocolTypes } from '../../shared/protocols/constants';
import { rewardRouterABI, rewardRouterAddress } from '../../shared/protocols/gmx/mummy-abis';
import { mummyFarms } from '../../shared/protocols/gmx/mummy-farms';
import { ProtocolItem } from '../../shared/types/protocols';
import './protocol-item.scss';

export interface IProtocolItemComponent {
    items: ProtocolItem[];
    symbol: Protocols;
    type: ProtocolTypes;
}

export default function ProtocolItemComponent(req: IProtocolItemComponent) {
    const claimRewards = async (address: string) => {
        let contractStaticInfo;
        try {
            switch (req.symbol) {
                case Protocols.Qi_Dao:
                    contractStaticInfo = qiFarms.find(qiFarm => qiFarm.address === address);
                    if (contractStaticInfo) {
                        await qiAdapter.claimRewards(contractStaticInfo);
                    }
                    break;
                case Protocols.Mummy:
                    contractStaticInfo = mummyFarms.find(mummyFarms => mummyFarms.address === address);
                    if (contractStaticInfo) {
                        await gmxAdapter.claimRewards(contractStaticInfo, rewardRouterAddress, JSON.stringify(rewardRouterABI));
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

    const items = req.items;
    if (items) {
        return <Table>
            <thead>
                <tr className='protocol-column'>
                    <th>Pool</th>
                    <th>Balance</th>
                    <th>Rewards</th>
                    <th>USD Value</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr>
                        <td>{item.pool.map(p => p.name)}</td>
                        <td>{bnDisplay(item.balance[0].amount, 4)} {item.balance[0].currency?.symbol}</td>
                        <td>{item.rewards ? bnDisplay(item.rewards[0].amount, 4) : 0} {item.rewards ? item.rewards[0].currency?.symbol : ''}</td>
                        <td>{item.usdValue}</td>
                        <td><button onClick={() => claimRewards(item.address)}>Claim</button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    } else {
        return <></>
    }
}