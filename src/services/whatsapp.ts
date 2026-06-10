import axios from "axios"
import type { Atendimento } from "../types/atendimento";

export const avisarCliente = async (
    atendimento: Atendimento
) => {
    try {
        const response = await axios.post (
            "https://tales-n8n-editor.iajhnu.easypanel.host/webhook-test/avisar-client",
            {
                cliente: atendimento.cliente,
                telefone: atendimento.telefone,
                problema: atendimento.problema,
                marca: atendimento.marca,
                dataVisita: atendimento.dataVisita,
                horarioVisita: atendimento.horarioVisita
            }
        );

        console.log(response.data)
        alert("Dados enviados para o n8n")
        
    } catch(error) {
        console.error(error);
        
    }
}

