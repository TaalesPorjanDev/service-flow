import { createContext, useContext, useState, type ReactNode } from 'react'
import axios from 'axios'
import { toastShowSuccess, toastShowError } from './ToastContext'
import type { Servico } from '../types/servico'

type EntregaContextType = {
  lista: Servico[]
  adicionar: (s: Servico) => void
  notificar: (id: string) => Promise<void>
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
    try {
      localStorage.setItem('entrega_lista', JSON.stringify(next))
    } catch {
      /* ignore storage errors */
    }
  }

  const adicionar = (s: Servico) => {
    salvar([s, ...lista])
  }

  const excluir = (id: string) => {
    salvar(lista.filter((item) => item.id !== id))
    toastShowSuccess('Atendimento excluído com sucesso')
  }

  const notificar = async (id: string) => {
    const servico = lista.find((i) => i.id === id)
    if (!servico) return

    const webhook = import.meta.env.VITE_WEBHOOK_WHATSAPP_MAQUINA
    if (!webhook) {
      toastShowError('Erro: webhook de entrega não configurado.')
      return
    }

    try {
      await axios.post(webhook, servico, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_N8N_API_KEY || '',
        },
      })
      toastShowSuccess('Cliente avisado sobre a entrega')
    } catch (error) {
      console.error('Erro ao notificar cliente:', error)
      toastShowError('Falha ao avisar cliente sobre a entrega')
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
