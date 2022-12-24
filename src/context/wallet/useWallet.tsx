import React from "react";
import { WalletContext } from "./wallet";

const useWallet = () => React.useContext(WalletContext);

export default useWallet;
