import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux"
import { store } from '../redux/store'
import {
  ContractKitProvider,
  Alfajores,
  NetworkNames,
} from '@celo-tools/use-contractkit';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@celo-tools/use-contractkit/lib/styles.css";
import "react-toastify/dist/ReactToastify.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContractKitProvider
      networks={[Alfajores]}
      network={{
        name: NetworkNames.Alfajores,
        rpcUrl: 'https://alfajores-forno.celo-testnet.org',
        graphQl: 'https://alfajores-blockscout.celo-testnet.org/graphiql',
        explorer: 'https://alfajores-blockscout.celo-testnet.org',
        chainId: 44787,   
      }}
      dapp={{
        name: 'Celo NFT Avatars.',
        description: 'Create your own NFT Avatar.',
        url: 'https://dacade.org',
        icon: ""
      }}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ContractKitProvider>
  )
}

export default MyApp
