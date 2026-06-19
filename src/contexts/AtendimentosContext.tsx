import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { toastShowSuccess, toastShowError, toastShowInfo } from '../contexts/ToastContext'
import type { Atendimento, NovoAtendimentoForm } from '../types/atendimento'

interface AtendimentosContextValue {
  atendimentos: Atendimento[]
  adicionarAtendimento: (dados: NovoAtendimentoForm) => Atendimento
  atualizarStatus: (id: string, status: Atendimento['status']) => void
  excluirAtendimento: (id: string) => void
}

const AtendimentosContext = createContext<AtendimentosContextValue | null>(null)

function gerarId(atendimentos: Atendimento[]): string {
  const numeros = atendimentos
    .map((a) => parseInt(a.id.replace('ATD-', ''), 10))
    .filter((n) => !Number.isNaN(n))

  const proximo = numeros.length > 0 ? Math.max(...numeros) + 1 : 1
  return `ATD-${String(proximo).padStart(3, '0')}`
}

export function AtendimentosProvider({ children }: { children: ReactNode }) {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>(() => {
    try {
      const salvo = localStorage.getItem('atendimentos')
      return salvo ? JSON.parse(salvo) : []
    } catch {
      return []
    }
  })

  // Salvar no localStorage sempre que atendimentos mudar
  useEffect(() => {
    localStorage.setItem('atendimentos', JSON.stringify(atendimentos))
  }, [atendimentos])

  function adicionarAtendimento(dados: NovoAtendimentoForm): Atendimento {
    const novo: Atendimento = {
      id: gerarId(atendimentos),
      ...dados,
      status: 'novo',
    }

    setAtendimentos((prev) => [novo, ...prev])
    return novo
  }

  function atualizarStatus(id: string, status: Atendimento['status']) {
    console.log('atualizarStatus called', { id, status })
    setAtendimentos((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, status } : a))
      console.log('atendimentos next', next)
      return next
    })
    // chamar toast fora do updater para evitar setState durante render de outro componente
    const texto = `Status atualizado: ${status.toString().toUpperCase()}`
    if (status === 'cancelado') {
      toastShowError(texto)
    } else if (status === 'agendado') {
      // status 'agendado' representa 'Em andamento' na UI — usar cor azul
      toastShowInfo(texto)
    } else {
      toastShowSuccess(texto)
    }
  }

  function excluirAtendimento(id: string) {
    setAtendimentos((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <AtendimentosContext.Provider
      value={{ atendimentos, adicionarAtendimento, atualizarStatus, excluirAtendimento }}
    >
      {children}
    </AtendimentosContext.Provider>
  )
}

export function useAtendimentos() {
  const context = useContext(AtendimentosContext)
  if (!context) {
    throw new Error('useAtendimentos deve ser usado dentro de AtendimentosProvider')
  }
  return context
}
