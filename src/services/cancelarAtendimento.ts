import axios from "axios";
import type { Atendimento } from "../types/atendimento";
import { toastShowError, toastShowSuccess } from "../contexts/ToastContext";

export const cancelarAtendimento = async (atendimento: Atendimento): Promise<boolean> => {
  const url = import.meta.env.VITE_WEBHOOK_CANCELADO || "";
  if (!url) {
    console.error('VITE_WEBHOOK_CANCELADO não configurado')
    toastShowError('Erro ao cancelar atendimento: URL não configurada.')
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
    toastShowSuccess('Atendimento cancelado!')
    return true
  } catch (error: any) {
    console.error('Erro ao cancelar atendimento:', error)
    const msg = error?.response?.data?.message || error?.message || 'Erro ao cancelar atendimento.'
    toastShowError(msg)
    return false
  }
}



