import axios from "axios"
import type { Atendimento } from "../types/atendimento";
import { toastShowSuccess, toastShowError } from "../contexts/ToastContext"

export const avisarCliente = async (
    atendimento: Atendimento
) => {
    try {
        const url = import.meta.env.VITE_WHATSAPP_WEBHOOK || ''
        if (!url) throw new Error('VITE_WHATSAPP_WEBHOOK não configurado')

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
        
    } catch(error) {
        console.error(error);
        toastShowError('erro ao avisar cliente ')
    }
}

