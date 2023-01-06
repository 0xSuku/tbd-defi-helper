import { useRoutes } from "react-router-dom";
import { WalletProvider } from "./context/wallet/wallet";
import { ProtocolProvider } from "./context/protocols/protocols";
import { TokensProvider } from "./context/tokens/tokens";
import Themeroutes from "./routes/Router";

const App = () => {
    const routing = useRoutes(Themeroutes);

    return <TokensProvider>
        <WalletProvider>
            <ProtocolProvider>
                <div className="dark">{routing}</div>
            </ProtocolProvider>
        </WalletProvider>
    </TokensProvider>
};

export default App;
