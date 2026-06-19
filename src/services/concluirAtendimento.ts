import axios from "axios";
import { toastShowError } from "../contexts/ToastContext";
import type { Atendimento } from "../types/atendimento";

export const concluirAtendimento = async (atendimento: Atendimento): Promise<boolean> => {
  const url = import.meta.env.VITE_WEBHOOK_CONCLUIDO || "";
  if (!url) {
    console.error('VITE_WEBHOOK_CONCLUIDO não configurado')
    toastShowError('Erro: webhook de conclusão não configurado.')
    return false
  }

  try {
    await axios.post(
      url,
      {
        cliente: atendimento.cliente,
        telefone: atendimento.telefone,
      },
      {
        headers: {
          'x-api-key': import.meta.env.VITE_N8N_API_KEY || ''
        }
      }
    );

    return true
  } catch (error: any) {
    console.error('Erro ao concluir atendimento:', error)
    const msg =
      error?.response?.data?.message || error?.message || 'Erro ao concluir atendimento.'
    toastShowError(msg)
    return false
  }
}