export type AtendimentoStatus = 'novo' | 'agendado' | 'finalizado' | 'cancelado'

export type AtendimentoPrioridade = 'baixa' | 'media' | 'alta'

export interface Atendimento {
  id: string
  cliente: string
  telefone: string

  marca: string
  problema: string

  status: AtendimentoStatus
  prioridade: AtendimentoPrioridade
  dataVisita: string
  horarioVisita: string

  endereco?: string
  observacao?: string
}

export interface NovoAtendimentoForm {
  cliente: string
  telefone: string
  marca: string
  problema: string
  prioridade: AtendimentoPrioridade
  endereco?: string
  observacao?: string
  dataVisita: string
  horarioVisita: string
}
