import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {MantineProvider} from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import './index.scss'
import WalletConnetProvider from './functions/WalletConnectProvider.jsx'
import AuthContextProvider from './contexts/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletConnetProvider>
      <MantineProvider>
        <AuthContextProvider>
        <App />
        </AuthContextProvider>
      </MantineProvider>
    </WalletConnetProvider>
  </React.StrictMode>,
)
