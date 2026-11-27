import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/Layout/Layout'
import { Clients } from '../pages/Clients/Clients'
import { ClientForm } from '../pages/ClientForm/ClientForm'
import { Dashboard } from '../pages/Dashboard/Dashboard'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'clientes', element: <Clients /> },
      { path: 'clientes/novo', element: <ClientForm /> },
      { path: 'clientes/:id/editar', element: <ClientForm /> },
    ],
  },
])