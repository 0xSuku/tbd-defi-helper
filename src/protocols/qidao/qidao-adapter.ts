import { BigNumber } from "ethers";
import { getWriteContract } from "../../shared/chains";
import { ContractStaticInfo } from "../../shared/types/protocols";

export interface IProtocolAdapter {
    claimRewards: (contractStaticInfo: ContractStaticInfo) => Promise<void>;
}

const qiAdapter: IProtocolAdapter = {
    claimRewards: async (contractStaticInfo: ContractStaticInfo) => {
        const contract = await getWriteContract(contractStaticInfo.chainId, contractStaticInfo.address, JSON.stringify(contractStaticInfo.abi));
        if (contract) {
            await contract.deposit(BigNumber.from('0'), BigNumber.from('0'));
        } else {
            throw Error('Contract not found');
        }
    }
}
export default qiAdapter;