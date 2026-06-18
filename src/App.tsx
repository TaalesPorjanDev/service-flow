import { RouterProvider } from 'react-router-dom'
import { AtendimentosProvider } from './contexts/AtendimentosContext'
import { router } from './routes'
import { ToastProvider } from './contexts/ToastContext'

export function App() {
  return (
    <AtendimentosProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AtendimentosProvider>
  )
}
