import React from "react";
import { TokensContext } from "./tokens";

const useTokens = () => React.useContext(TokensContext);

export default useTokens;
