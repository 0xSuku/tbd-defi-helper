import React from "react";
import { IProtocol } from "../../entities/types/protocol";


type Values = {
	protocols: IProtocol[];
	setProtocols: (values: IProtocol[]) => void;
};

const initialValues: Values = {
	protocols: [],
	setProtocols: () => { },
};

const ProtocolContext = React.createContext<Values>(initialValues);

const ProtocolProvider = ({ children }: any) => {
	const [protocols, setProtocols] = React.useState<IProtocol[]>([]);
	const values: Values = { protocols, setProtocols };

	return (
		<ProtocolContext.Provider value={values}>
			{children}
		</ProtocolContext.Provider>
	);
};

export { ProtocolProvider, ProtocolContext };
