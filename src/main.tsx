import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/global.css'
import { EntregaProvider } from './contexts/EntregaContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EntregaProvider>
      <App />
    </EntregaProvider>
  </StrictMode>,
)
