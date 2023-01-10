import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { getReadContract, getWriteContract } from "../../shared/chains";
import { ContractStaticInfo, ProtocolInfo } from "../../shared/types/protocols";
import { Protocols, ProtocolTypes } from "../../shared/protocols/constants";

export interface IProtocolAdapter {
    getStakingInfo: (address: string, gmxFarms: ContractStaticInfo[], extraAddresses?: string[], extraABI?: string[], nativeToken?: Token) => Promise<ProtocolInfo>;
    claimRewards: (contractStaticInfo: ContractStaticInfo, gmxRewardRouterAddress: string, gmxRewardRouterABI: string) => Promise<void>;
}

const gmxAdapter: IProtocolAdapter = {
    getStakingInfo: async (address: string, gmxFarms: ContractStaticInfo[], extraAddresses?: string[], extraABI?: string[], nativeToken?: Token) => {
        if (!extraAddresses) throw new Error('Should have the fees address');
        if (!extraABI) throw new Error('Should have the fees ABIs');
        if (!nativeToken) throw new Error('Should have the native token set');

        let deposits: ProtocolInfo = {
            type: ProtocolTypes.Farms,
            items: []
        };

        await Promise.all(
            gmxFarms.map(async (contractStaticInfo: ContractStaticInfo) => {
                let depositBalance = '0';
                let rewardBalance = '0';
                let rewardBalance2 = '0';

                const stakeContract = getReadContract(contractStaticInfo.chainId, contractStaticInfo.address, JSON.stringify(contractStaticInfo.abi));
                if (stakeContract) {
                    switch (contractStaticInfo.type) {
                        case ProtocolTypes.Staking:
                            const staked = await stakeContract.stakedAmounts(address);
                            const stakedCA = CurrencyAmount.fromRawAmount(contractStaticInfo.token, staked);
                            depositBalance = stakedCA.toExact();

                            const stakingRewards = await stakeContract.claimable(address);
                            const stakingRewardsCA = CurrencyAmount.fromRawAmount(contractStaticInfo.tokenRewards, stakingRewards);
                            rewardBalance = stakingRewardsCA.toExact();

                            const stakeFeesContract = getReadContract(contractStaticInfo.chainId, extraAddresses[0], extraABI[0]);
                            const feeStakingRewards = await stakeFeesContract.claimable(address);
                            const feeStakingRewardsCA = CurrencyAmount.fromRawAmount(nativeToken, feeStakingRewards);
                            rewardBalance2 = feeStakingRewardsCA.toExact();

                            deposits.items?.push({
                                balance: [{
                                    amount: depositBalance,
                                    currency: contractStaticInfo.token
                                }],
                                pool: [contractStaticInfo.token],
                                rewards: [{
                                    amount: rewardBalance,
                                    currency: contractStaticInfo.tokenRewards
                                }, {
                                    amount: rewardBalance2,
                                    currency: nativeToken
                                }],
                                usdValue: 0,
                                address: contractStaticInfo.address
                            });
                            break;
                        case ProtocolTypes.Vesting:
                            // TODO: Vesting amount should be this minus already vested
                            const vested = await stakeContract.getVestedAmount(address);
                            const vestedCA = CurrencyAmount.fromRawAmount(contractStaticInfo.token, vested);
                            depositBalance = vestedCA.toExact();

                            const vestingRewards = await stakeContract.claimable(address);
                            const vestingRewardsCA = CurrencyAmount.fromRawAmount(contractStaticInfo.tokenRewards, vestingRewards);
                            rewardBalance = vestingRewardsCA.toExact();

                            deposits.items?.push({
                                balance: [{
                                    amount: depositBalance,
                                    currency: contractStaticInfo.token
                                }],
                                pool: [contractStaticInfo.token],
                                rewards: [{
                                    amount: rewardBalance,
                                    currency: contractStaticInfo.tokenRewards
                                }],
                                usdValue: 0,
                                address: contractStaticInfo.address
                            });
                            break;
                    }
                }
            })
        );
        return deposits;
    },
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
