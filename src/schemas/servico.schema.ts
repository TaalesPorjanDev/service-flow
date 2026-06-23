import { z } from 'zod'
import { telefoneSchema } from './fields'

export const novoServicoSchema = z.object({
  cliente: z.string().min(2, 'Informe o nome do cliente'),
  telefone: telefoneSchema,
  marca: z.string().min(2, 'Informe a marca'),
  problema: z.string().min(5, 'Descreva o problema'),
  servicoRealizado: z.string().min(3, 'Informe o serviço realizado'),
  dataVisita: z.string().min(1, 'Informe a data'),
  horaVisita: z.string().min(1, 'Informe o horário'),
})

export type NovoServicoSchema = z.infer<typeof novoServicoSchema>
