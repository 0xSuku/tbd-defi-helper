import Accordion from 'react-bootstrap/Accordion';
import { getProtocolName } from '../../helpers/protocol';
import { Protocol } from '../../shared/types/protocols';
import ProtocolItemComponent from './protocol-item';
import './protocol.scss';

export default function ProtocolComponent(protocol: Protocol) {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item className='protocol-item' eventKey="0">
                <Accordion.Header>{getProtocolName(protocol.symbol)}</Accordion.Header>
                <Accordion.Body>
                    {
                        protocol.info.map(info => (info.items ?
                            <ProtocolItemComponent items={info.items} symbol={protocol.symbol} type={info.type}></ProtocolItemComponent> :
                            <></>
                        ))
                    }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}