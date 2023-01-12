import Accordion from 'react-bootstrap/Accordion';
import { getProtocolName } from '../../helpers/protocol';
import { Protocols } from '../../shared/protocols/constants';
import { Protocol } from '../../shared/types/protocols';
import IconProtocolComponent from '../icon-protocol/icon-protocol';
import ProtocolItemComponent from './protocol-item';
import './protocol.scss';

export default function ProtocolComponent(protocol: Protocol) {
    return (
        protocol.info.length ?
            <Accordion defaultActiveKey="0">
                <Accordion.Item className='protocol-item' eventKey="0">
                    <Accordion.Header>
                        <IconProtocolComponent protocol={protocol}></IconProtocolComponent>
                        &nbsp;{getProtocolName(protocol.symbol)}
                    </Accordion.Header>
                    <Accordion.Body>
                        {
                            protocol.info.map(info => (info.items ?
                                <ProtocolItemComponent items={info.items} symbol={protocol.symbol} type={info.type}></ProtocolItemComponent> :
                                <></>
                            ))
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion> :
            <></>
    );
}