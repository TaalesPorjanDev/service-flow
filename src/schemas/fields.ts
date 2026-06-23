import { z } from 'zod'

export const telefoneSchema = z
  .string()
  .regex(/^\d+$/, 'Digite apenas números')
  .min(10, 'Informe um telefone válido')
  .max(11, 'Telefone deve ter no máximo 11 números')

export const prioridadeSchema = z.enum(['baixa', 'media', 'alta'])
