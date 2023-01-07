import Table from 'react-bootstrap/Table';
import { Protocols, ProtocolTypes } from '../../shared/protocols/constants';
import qiAdapter from '../../shared/protocols/qidao/qidao-adapter';
import qiFarms from '../../shared/protocols/qidao/qidao-farms';
import { ProtocolItem } from '../../shared/types/protocols';

export interface IProtocolItemComponent {
    items: ProtocolItem[];
    symbol: Protocols;
    type: ProtocolTypes;
}

export default function ProtocolItemComponent(req: IProtocolItemComponent) {
    const claimRewards = async (address: string) => {
        let contractStaticInfo;
        switch (req.symbol) {
            case Protocols.Qi_Dao:
                contractStaticInfo = qiFarms.find(qiFarm => qiFarm.address === address);
                break;
            default:
                throw Error('Claim not declared');
        }
        if (contractStaticInfo) {
            try {
                await qiAdapter.claimRewards(contractStaticInfo);
            } catch (ex: any) {
                if (ex.code === 4001) {
                    console.log('User rejected the tx');
                }
            }
        }
    }

    const items = req.items;
    if (items) {
        return <Table>
            <thead>
                <tr>
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
                        <td>{item.balance[0].amount} {item.balance[0].currency?.symbol}</td>
                        <td>{item.rewards ? item.rewards[0].amount : 1} {item.rewards ? item.rewards[0].currency?.symbol : ''}</td>
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