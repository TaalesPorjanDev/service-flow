import axios from "axios";
import { toastShowError, toastShowSuccess } from "../contexts/ToastContext";
import type { Atendimento } from "../types/atendimento";

export const concluirAtendimento = async (atendimento: Atendimento): Promise<boolean> => {
  const url = import.meta.env.VITE_WEBHOOK_CONCLUIDO || "";
  if (!url) {
    console.error('VITE_WEBHOOK_CONCLUIDO não configurado')
    toastShowError('Erro ao concluir atendimento: URL não configurada.')
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

    toastShowSuccess('Atendimento concluído!')
    return true
  } catch (error: any) {
    console.error('Erro ao concluir atendimento:', error)
    const msg =
      error?.response?.data?.message || error?.message || 'Erro ao concluir atendimento.'
    toastShowError(msg)
    return false
  }
}