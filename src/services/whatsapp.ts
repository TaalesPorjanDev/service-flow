import axios from "axios"
import type { Atendimento } from "../types/atendimento";
import { toastShowSuccess, toastShowError } from "../contexts/ToastContext"

export const avisarCliente = async (
    atendimento: Atendimento
) => {
    try {
                const url = import.meta.env.VITE_WEBHOOK_WHATSAPP || ''
                if (!url) {
                    console.error('VITE_WHATSAPP_WEBHOOK não configurado')
                    toastShowError('Erro: webhook do WhatsApp não configurado (VITE_WHATSAPP_WEBHOOK).')
                    return
                }

        const response = await axios.post (
            url,
            {
                cliente: atendimento.cliente,
                telefone: atendimento.telefone,
                problema: atendimento.problema,
                marca: atendimento.marca,
                dataVisita: atendimento.dataVisita,
                horarioVisita: atendimento.horarioVisita
            },
            {
                headers: {
                    'x-api-key': import.meta.env.VITE_N8N_API_KEY || ''
                }
            }
        );

        console.log(response.data)
        toastShowSuccess('Cliente avisado com sucesso')
        
    } catch(error: any) {
        console.error('Erro ao avisar cliente:', error);
        const msg = error?.response?.data?.message || error?.message || 'Erro ao avisar cliente.'
        toastShowError(msg)
    }
}

