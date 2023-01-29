import { getWriteContract } from "../../shared/chains";
import { GmxProtocolDeposit } from "../../shared/types/protocols";
import { rewardRouterABI } from "../../shared/protocols/gmx-forks/gmx-abis";

export interface IProtocolAdapter {
    claimRewards: (contractStaticInfo: GmxProtocolDeposit, gmxRewardRouterAddress: string) => Promise<void>;
}

const gmxAdapter: IProtocolAdapter = {
    claimRewards: async (gmxProtocolDeposit: GmxProtocolDeposit, gmxRewardRouterAddress: string) => {
        const gmxRewardRouterABI = JSON.stringify(rewardRouterABI)
        const contract = await getWriteContract(gmxProtocolDeposit.chainId, gmxRewardRouterAddress, gmxRewardRouterABI);
        if (contract) {
            await contract.handleRewards(true, false, true, true, true, true, true);
        } else {
            throw Error('Contract not found');
        }
    }
}
export default gmxAdapter;
