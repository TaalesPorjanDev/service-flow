import { z } from "zod";

export const clientStatusSchema = z.enum(['lead', 'active', 'inactive']);

export const clientSchema = z.object({
    name: z.string().min(3, {message: "O nome deve ter pelo menos 3 caracteres"}),
    email: z.string().email({message: "Informe um email valido"}),
    phone: z.string().min(10, { message: "Informe um telefone válido com DDD" }),
    status: clientStatusSchema,
    company: z.string().optional(),
    notes: z.string().optional()
})

export type ClientSchema = z.infer<typeof clientSchema>;