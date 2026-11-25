import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { ClientsProvider } from './contexts/ClientsContext'

export function App() {
  return (
        <ClientsProvider>
          <RouterProvider router={router} />
        </ClientsProvider>
        
      
  )
}
