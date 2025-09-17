
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {TonConnectUIProvider} from "@tonconnect/ui-react";

const manifestUrl = 'https://ah1n.github.io/first_contract_front/tonconnect-manifest.json';

createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl = {manifestUrl}>
    <App />
  </TonConnectUIProvider>,
)
