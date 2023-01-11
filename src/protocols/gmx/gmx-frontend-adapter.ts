import { getWriteContract } from "../../shared/chains";
import { ContractStaticInfo } from "../../shared/types/protocols";
import { Protocols } from "../../shared/protocols/constants";

export interface IProtocolAdapter {
    claimRewards: (contractStaticInfo: ContractStaticInfo, gmxRewardRouterAddress: string, gmxRewardRouterABI: string) => Promise<void>;
}

const gmxAdapter: IProtocolAdapter = {
    claimRewards: async (contractStaticInfo: ContractStaticInfo, gmxRewardRouterAddress: string, gmxRewardRouterABI: string) => {
        switch (contractStaticInfo.protocol) {
            case Protocols.Mummy:
                const contract = await getWriteContract(contractStaticInfo.chainId, gmxRewardRouterAddress, gmxRewardRouterABI);
                if (contract) {
                    await contract.handleRewards(true, false, true, true, true, true, true);
                } else {
                    throw Error('Contract not found');
                }
                break;
        }
    }
}
export default gmxAdapter;
