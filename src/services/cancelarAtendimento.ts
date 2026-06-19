import axios from "axios";
import type { Atendimento } from "../types/atendimento";
import { toastShowError, toastShowSuccess } from "../contexts/ToastContext";

export const cancelarAtendimento = async (atendimento: Atendimento): Promise<boolean> => {
  const url = import.meta.env.VITE_WEBHOOK_CANCELADO || "";
  if (!url) {
    console.error('VITE_WEBHOOK_CANCELADO não configurado')
      toastShowError('Erro: webhook de cancelamento não configurado.')
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
      // não exibir toast de sucesso aqui para evitar duplicação;
      // o `AtendimentosContext` exibirá a notificação com o tipo adequado
    return true
  } catch (error: any) {
    console.error('Erro ao cancelar atendimento:', error)
    const msg = error?.response?.data?.message || error?.message || 'Erro ao cancelar atendimento.'
    toastShowError(msg)
    return false
  }
}



