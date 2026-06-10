import { RouterProvider } from 'react-router-dom'
import { AtendimentosProvider } from './contexts/AtendimentosContext'
import { router } from './routes'

export function App() {
  return (
    <AtendimentosProvider>
      <RouterProvider router={router} />
    </AtendimentosProvider>
  )
}
