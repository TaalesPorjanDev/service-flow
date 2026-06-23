import { z } from 'zod'
import { prioridadeSchema, telefoneSchema } from './fields'

export const novoAtendimentoSchema = z.object({
  cliente: z.string().min(2, 'Informe o nome do cliente'),
  telefone: telefoneSchema,
  marca: z.string().min(2, 'Informe a marca'),
  problema: z.string().min(5, 'Descreva o problema'),
  prioridade: prioridadeSchema,
  dataVisita: z.string().min(1, 'Informe a data da visita'),
  horarioVisita: z.string().min(1, 'Informe o horário da visita'),
  endereco: z.string().optional(),
  observacao: z.string().optional(),
})

export type NovoAtendimentoSchema = z.infer<typeof novoAtendimentoSchema>
