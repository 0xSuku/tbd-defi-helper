import { useRoutes } from "react-router-dom";
import { WalletProvider } from "./context/wallet/wallet";
import { ProtocolProvider } from "./context/protocols/protocols";
import Themeroutes from "./routes/Router";

const App = () => {
    const routing = useRoutes(Themeroutes);

    return <WalletProvider>
    <ProtocolProvider>
        <div className="dark">{routing}</div>
    </ProtocolProvider>
    </WalletProvider>;
};

export default App;
