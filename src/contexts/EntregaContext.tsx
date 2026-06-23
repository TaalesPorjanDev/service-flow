import { createContext, useContext, useState, type ReactNode } from 'react'
import { toastShowInfo, toastShowSuccess, toastShowError } from './ToastContext'
import axios from 'axios'

export type Servico = {
  id: string
  cliente: string
  telefone?: string
  marca?: string
  problema?: string
  servicoRealizado?: string
  prioridade?: string
  dataVisita?: string
  horaVisita?: string
  endereco?: string
  observacoes?: string
}

type EntregaContextType = {
  lista: Servico[]
  adicionar: (s: Servico) => void
  notificar: (id: string) => void
  excluir: (id: string) => void
}

const EntregaContext = createContext<EntregaContextType | undefined>(undefined)

export const EntregaProvider = ({ children }: { children: ReactNode }) => {
  const [lista, setLista] = useState<Servico[]>(() => {
    try {
      const raw = localStorage.getItem('entrega_lista')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  const salvar = (next: Servico[]) => {
    setLista(next)
    try { localStorage.setItem('entrega_lista', JSON.stringify(next)) } catch {}
  }

  const adicionar = (s: Servico) => {
    salvar([s, ...lista])
  }

  const excluir = (id: string) => {
  const novaLista = lista.filter(item => item.id !== id)
  salvar(novaLista)
  toastShowSuccess('Atendimento excluído com sucesso')
}

  const notificar = async (id: string) => {
    const servico = lista.find(i => i.id === id)
    if (!servico) return

    const webhook = import.meta.env.VITE_WEBHOOK_WHATSAPP_MAQUINA 

    toastShowInfo('Aviso: Mandando dados para o n8n')

    try {
      await axios.post(webhook, servico)
      toastShowSuccess('Dados enviados para o n8n com sucesso')
    } catch (err) {
      // fallback: tentar fetch se axios não estiver funcionando
      try {
        await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(servico) })
        toastShowSuccess('Dados enviados para o n8n com sucesso (fetch)')
      } catch (e) {
        toastShowError('Falha ao enviar dados para o n8n')
      }
    }
  }

  return (
    <EntregaContext.Provider value={{ lista, adicionar, notificar, excluir }}>
      {children}
    </EntregaContext.Provider>
  )
}

export const useEntrega = () => {
  const ctx = useContext(EntregaContext)
  if (!ctx) throw new Error('useEntrega must be used within EntregaProvider')
  return ctx
}

export default EntregaContext
