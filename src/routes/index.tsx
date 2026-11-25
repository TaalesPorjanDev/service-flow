import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/Layout/Layout'



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'clientes', element: <ClientsPage /> },
      { path: 'clientes/novo', element: <ClientForm /> },
      { path: 'clientes/:id/editar', element: <ClientForm /> },
      
    ],
  },
])
