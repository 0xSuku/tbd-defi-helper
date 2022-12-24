import Accordion from 'react-bootstrap/Accordion';
import { IProtocol } from '../../entities/types/protocol';
import { getProtocolName } from '../../helpers/protocol';
import ProtocolItemComponent from './protocol-item';

export default function ProtocolComponent(protocol: IProtocol) {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
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