import Table from 'react-bootstrap/Table';
import { IProtocolItem } from '../../entities/types/protocol';
import { Protocols, ProtocolTypes } from '../../protocols/constants';
import qiAdapter from '../../protocols/qidao/qidao-adapter';
import qiFarms from '../../protocols/qidao/qidao-farms';

export interface IProtocolItemComponent {
    items: IProtocolItem[];
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
        }
        if (contractStaticInfo) {
            try {
                await qiAdapter.claimRewards(contractStaticInfo);
            } catch (ex: any) {
                if (ex.code === 4001) {
                    console.log('User rejected the tx');
                }
            }
        } else {
            throw Error('Claim not declared');
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
                        <td>{item.balance}</td>
                        <td>{item.rewards}</td>
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