import { Token } from '@uniswap/sdk-core';
import { ChainId } from '../../shared/chains';
import './icon-token.scss';

export default function IconTokenComponent(params: { token: Token }) {
    const imageSource = `/icons/tokens/${params.token.symbol?.toLowerCase()}.png`;
    const imageChain = `/icons/chains/${ChainId[params.token.chainId].replace(' ', '').toLowerCase()}.svg`;

    return <div className='token-icon'>
        {
            params.token.chainId !== ChainId.Ethereum ?
                <img className='token-chain' src={imageChain} alt={ChainId[params.token.chainId].toLowerCase()}></img> :
                <></>
        }
        <img className='token-icon-image' src={imageSource} alt={params.token.name?.toLowerCase()}></img>
    </div>;
}