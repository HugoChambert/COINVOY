import { Buffer } from 'buffer'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LanguageProvider } from './contexts/LanguageContext'
import { PhantomWalletProvider } from './contexts/PhantomWalletContext'
import './index.css'

globalThis.Buffer = Buffer
window.Buffer = Buffer
if (!globalThis.process) {
  globalThis.process = { env: {} } as any
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <PhantomWalletProvider>
        <App />
      </PhantomWalletProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
