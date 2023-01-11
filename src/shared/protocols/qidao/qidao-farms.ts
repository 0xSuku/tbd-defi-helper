import { Token } from "@uniswap/sdk-core";
import { ChainId } from "../../chains";
import { TokenTypes } from "../../constants/token";
import { Tokens } from "../../tokens";
import { ContractStaticInfo } from "../../types/protocols";
import { Protocols, ProtocolTypes } from "../constants";

const qiFarmABI = [{ "inputs": [{ "internalType": "contract IERC20", "name": "_erc20", "type": "address" }, { "internalType": "uint256", "name": "_rewardPerSecond", "type": "uint256" }, { "internalType": "uint256", "name": "_startTimestamp", "type": "uint256" }, { "internalType": "address", "name": "_feeAddress", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IERC20", "name": "_lpToken", "type": "address" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }], "name": "add", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "deposited", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "emergencyWithdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "endTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "erc20", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "feeAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "fund", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "massUpdatePools", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "paidOut", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "pending", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "poolInfo", "outputs": [{ "internalType": "contract IERC20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "accERC20PerShare", "type": "uint256" }, { "internalType": "uint16", "name": "depositFeeBP", "type": "uint16" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "poolLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "rewardPerSecond", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "set", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeAddress", "type": "address" }], "name": "setFeeAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "startTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalAllocPoint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalPending", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "updatePool", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }], "name": "updatePoolDepositFee", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userInfo", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }];

const qiFarms: ContractStaticInfo[] = [{
    abi: qiFarmABI,
    address: "0x9f9f0456005ed4e7248199b6260752e95682a883",
    params: ['0'],
    name: 'USDC-MAI Arrakis Vault',
    protocol: Protocols.Qi_Dao,
    type: ProtocolTypes.Farms,
    chainId: ChainId.Polygon,
    tokenDetail: {
        token: new Token(ChainId.Polygon, '0xa199569af06cb68960869fe376c9b41f68d8e2d1', 18, 'Arrakis Vault V1 USDC/miMATIC', 'USDC+MAI'),
        tokenInfo: TokenTypes.UNUSED,
    },
    tokensDetailRewards: [Tokens.polygon.QI]
}, {
    abi: qiFarmABI,
    address: "0xcc54afcecd0d89e0b2db58f5d9e58468e7ad20dc",
    params: ['0'],
    name: 'MAI-USDC QuickSwap LP',
    protocol: Protocols.Qi_Dao,
    type: ProtocolTypes.Farms,
    chainId: ChainId.Polygon,
    tokenDetail: {
        token: new Token(ChainId.Polygon, '0x9a8b2601760814019b7e6ee0052e25f1c623d1e6', 18, 'Uniswap V2 (UNI-V2)', 'MAI+USDC'),
        tokenInfo: TokenTypes.UNUSED,
    },
    tokensDetailRewards: [Tokens.polygon.QI]
}, {
    abi: qiFarmABI,
    address: "0xcc54afcecd0d89e0b2db58f5d9e58468e7ad20dc",
    params: ['1'],
    name: 'QI-WMATIC QuickSwap LP',
    protocol: Protocols.Qi_Dao,
    type: ProtocolTypes.Farms,
    chainId: ChainId.Polygon,
    tokenDetail: {
        token: new Token(ChainId.Polygon, '0x9a8b2601760814019b7e6ee0052e25f1c623d1e6', 18, 'Uniswap V2 (UNI-V2)', 'QI+WMATIC'),
        tokenInfo: TokenTypes.UNUSED,
    },
    tokensDetailRewards: [Tokens.polygon.QI]
}]

export default qiFarms;
