import React from "react";
import { Protocol } from "../../shared/types/protocols";


type Values = {
	protocols: Protocol[];
	setProtocols: (values: Protocol[]) => void;
};

const initialValues: Values = {
	protocols: [],
	setProtocols: () => { },
};

const ProtocolContext = React.createContext<Values>(initialValues);

const ProtocolProvider = ({ children }: any) => {
	const [protocols, setProtocols] = React.useState<Protocol[]>([]);
	const values: Values = { protocols, setProtocols };

	return (
		<ProtocolContext.Provider value={values}>
			{children}
		</ProtocolContext.Provider>
	);
};

export { ProtocolProvider, ProtocolContext };
