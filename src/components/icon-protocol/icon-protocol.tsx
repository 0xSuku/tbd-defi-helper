import { ChainId } from '../../shared/chains';
import { Protocols } from '../../shared/protocols/constants';
import { Protocol } from '../../shared/types/protocols';
import './icon-protocol.scss';

export default function IconProtocolComponent(params: { protocol: Protocol }) {
    const imageSource = `/icons/protocols/${Protocols[params.protocol.symbol].toLowerCase()}.png`;
    const imageChain = `/icons/chains/${ChainId[params.protocol.chainId].toLowerCase()}.svg`;

    return <div className='protocol-icon'>
        {
            params.protocol.chainId !== ChainId.Ethereum ?
                <img className='protocol-chain' src={imageChain} alt={ChainId[params.protocol.chainId].toLowerCase()}></img> :
                <></>
        }
        <img className='protocol-icon-image' src={imageSource} alt={Protocols[params.protocol.symbol].toLowerCase()}></img>
    </div>;
}