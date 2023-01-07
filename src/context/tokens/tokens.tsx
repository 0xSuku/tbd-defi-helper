import React from "react";
import { TokenAmount } from "../../shared/types/tokens";

type Values = {
	tokens: TokenAmount[];
	setTokens: (values: TokenAmount[]) => void;
};

const initialValues: Values = {
	tokens: [],
	setTokens: () => { },
};

const TokensContext = React.createContext<Values>(initialValues);

const TokensProvider = ({ children }: any) => {
	const [tokens, setTokens] = React.useState<TokenAmount[]>([]);
	const values: Values = { tokens, setTokens };

	return (
		<TokensContext.Provider value={values}>
			{children}
		</TokensContext.Provider>
	);
};

export { TokensProvider, TokensContext };
