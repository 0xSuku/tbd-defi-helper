import { ChainId } from "../../chains";
import { Tokens } from "../../tokens";
import { ContractStaticInfo } from "../../types/protocols";
import { Protocols, ProtocolTypes } from "../constants";
import { stakerABI, vesterABI } from "./mummy-abis";

export const mummyFarms: ContractStaticInfo[] = [
    {
        abi: stakerABI,
        address: Tokens.fantom.esMMY.token.address,
        name: 'Staked MMY',
        protocol: Protocols.Mummy,
        type: ProtocolTypes.Staking,
        chainId: ChainId.Fantom,
        token: Tokens.fantom.esMMY.token,
        tokenRewards: Tokens.fantom.esMMY.token
    },
    {
        abi: stakerABI,
        address: Tokens.fantom.fsMLP.token.address,
        name: 'Staked MLP',
        protocol: Protocols.Mummy,
        type: ProtocolTypes.Staking,
        chainId: ChainId.Fantom,
        token: Tokens.fantom.fsMLP.token,
        tokenRewards: Tokens.fantom.esMMY.token
    }, {
        abi: vesterABI,
        address: Tokens.fantom.vMMY.token.address,
        name: 'Vesting MMY',
        protocol: Protocols.Mummy,
        type: ProtocolTypes.Vesting,
        chainId: ChainId.Fantom,
        token: Tokens.fantom.vMMY.token,
        tokenRewards: Tokens.fantom.MMY.token
    }, {
        abi: vesterABI,
        address: Tokens.fantom.vMLP.token.address,
        name: 'Vesting MLP',
        protocol: Protocols.Mummy,
        type: ProtocolTypes.Vesting,
        chainId: ChainId.Fantom,
        token: Tokens.fantom.vMLP.token,
        tokenRewards: Tokens.fantom.MMY.token
    }
]