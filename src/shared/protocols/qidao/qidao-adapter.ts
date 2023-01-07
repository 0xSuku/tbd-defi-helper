import { BigNumber } from "ethers";
import loadSmartContract from "../../../helpers/wallet/loadSmartContract";
import { IContractStaticInfo } from "./qidao-farms";

export interface IProtocolAdapter {
    claimRewards: (contractStaticInfo: IContractStaticInfo) => Promise<void>;
}

const qiAdapter: IProtocolAdapter = {
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