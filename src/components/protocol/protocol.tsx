import { Protocol } from '../../shared/types/protocols';
import DepositItemComponent from './protocol-item';
import './protocol.scss';

export default function ProtocolComponent(protocol: Protocol) {
    return (
        protocol.info.length ?
            <>
                {
                    protocol.info.map(info => (info.deposits ?
                        <DepositItemComponent items={info.deposits} protocol={protocol} type={info.type}></DepositItemComponent> :
                        <></>
                    ))
                }
            </>
            : <></>
    );
}