import type { Atendimento } from '../types/atendimento'

export const atendimentosMock: Atendimento[] = [
  
 {
  id: "ATD-001",
  cliente: "Maria Aparecida",
  telefone: "(19) 99999-9999",
  marca: "Brastemp",
  problema: "Não centrifuga",
  prioridade: "alta",
  status: "novo",
  dataVisita: "2026-06-12",
  horarioVisita: "21:00",
  endereco: "Rua das Flores, 123",
  observacao: "Cliente informou que a máquina para na centrifugação."
},
 {
  id: "ATD-002",
  cliente: "João Aparecido",
  telefone: "(19) 99999-9999",
  marca: "Brastemp",
  problema: "Não centrifuga",
  prioridade: "alta",
  status: "novo",
  dataVisita: "2026-06-13",
  horarioVisita: "22:00",
  endereco: "Rua das Flores, 123",
  observacao: "Cliente informou que a máquina para na centrifugação."
},
  
]
