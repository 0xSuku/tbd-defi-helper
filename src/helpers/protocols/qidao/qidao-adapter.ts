import { CurrencyAmount } from "@uniswap/sdk-core";
import { BigNumber } from "ethers";
import { IProtocolInfo } from "../../../entities/types/protocol"
import loadSmartContract from "../../wallet/loadSmartContract";
import { ProtocolTypes } from "../constants";
import qiFarms, { IContractStaticInfo } from "./qidao-farms";

export interface IProtocolAdapter {
    getFarmInfo: (address: string) => Promise<IProtocolInfo>;
    claimRewards: (contractStaticInfo: IContractStaticInfo) => Promise<void>;
}

const qiAdapter: IProtocolAdapter = {
    getFarmInfo: async (address: string) => {
        let farms: IProtocolInfo = {
            type: ProtocolTypes.Farms,
            items: []
        };
        
        await Promise.all(
            qiFarms.map(async (contractStaticInfo: IContractStaticInfo) => {
                let _deposited = '0';
                let _rewards = '0';

                const contract = loadSmartContract(contractStaticInfo.address, contractStaticInfo.abi);
                if (contract && contractStaticInfo.params) {
                    const deposited = await contract.deposited(contractStaticInfo.params[0], address);
                    const dep = CurrencyAmount.fromRawAmount(contractStaticInfo.token, deposited);
                    _deposited = dep.toFixed(4);
                    const rewards = await contract.pending(contractStaticInfo.params[0], address);
                    const rew = CurrencyAmount.fromRawAmount(contractStaticInfo.token, rewards);
                    _rewards = rew.toFixed(4);
                }
                farms.items?.push({
                    balance: [_deposited],
                    pool: [contractStaticInfo.token],
                    rewards: [_rewards],
                    usdValue: 0,
                    address: contractStaticInfo.address
                })
            })
        );
        return farms;
    },
    claimRewards: async (contractStaticInfo: IContractStaticInfo) => {
        const contract = loadSmartContract(contractStaticInfo.address, contractStaticInfo.abi);
        if (contract) {
            await contract.deposit(BigNumber.from('0'), BigNumber.from('0'));
        } else {
            throw Error('Contract not found');
        }
    }
}
export default qiAdapter;