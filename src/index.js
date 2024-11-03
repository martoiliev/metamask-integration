import './index.css'
import React from 'react'
import './fonts/fonts.css'
import { App } from './app/App'
import ReactDOM from 'react-dom/client'
import { MetaMaskProvider } from '@metamask/sdk-react'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: 'Metamask Dapp',
          url: window.location.href,
        },
        infuraAPIKey: process.env.INFURA_API_KEY,
      }}
    >
      <App />
    </MetaMaskProvider>
  </React.StrictMode>,
)
