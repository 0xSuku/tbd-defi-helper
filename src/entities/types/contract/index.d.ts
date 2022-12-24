declare type IContractData = {
    deposited: BigNumber;
    rewards: BigNumber;
}

declare type IContractInfo = {
    contract: any;
    contractData: ContractStaticData;
    vaultData: IContractData;
}