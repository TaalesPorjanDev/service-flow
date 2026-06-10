import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/Layout/Layout'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import { Atendimentos } from '../pages/Atendimentos/Atendimentos'
import { NovoAtendimento } from '../pages/NovoAtendimento/NovoAtendimento'
import { DetalhesAtendimento } from '../pages/DetalhesAtendimento/DetalhesAtendimento'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'atendimentos', element: <Atendimentos /> },
      { path: 'atendimentos/:id', element: <DetalhesAtendimento /> },
      { path: 'novo-atendimento', element: <NovoAtendimento /> },
    ],
  },
])
