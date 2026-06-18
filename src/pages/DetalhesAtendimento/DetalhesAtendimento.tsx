import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  StatusBadge,
  PrioridadeBadge,
} from '../../components/StatusBadge/StatusBadge';
import { useAtendimentos } from '../../contexts/AtendimentosContext';
import { avisarCliente } from '../../services/whatsapp';
import { concluirAtendimento } from '../../services/concluirAtendimento';
import { cancelarAtendimento } from '../../services/cancelarAtendimento';
import { useState } from 'react';
import { formatarDataSomente } from '../../utils/format';

export function DetalhesAtendimento() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { atendimentos, atualizarStatus } = useAtendimentos();

  const atendimento = atendimentos.find((a) => a.id === id);

  const [isConcluding, setIsConcluding] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  if (!atendimento) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold text-slate-800">
          Atendimento não encontrado
        </h1>
        <p className="mt-2 text-slate-600">
          O atendimento com ID {id} não existe
        </p>
        <Link
          to="/atendimentos"
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Voltar aos atendimentos
        </Link>
      </div>
    );
  }

  return (
    <div key={`${atendimento.id}-${atendimento.status}`}>
      <header className="mb-7 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Detalhes do Atendimento
          </h2>
          <p className="mt-1 text-sm text-slate-500">ID: {atendimento.id}</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
        >
          Voltar
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Informações do Cliente */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            Informações do Cliente
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">
                Cliente
              </p>
              <p className="mt-1 text-base text-slate-800 font-semibold">
                {atendimento.cliente}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">
                Telefone
              </p>
              <p className="mt-1 text-base text-slate-800">{atendimento.telefone}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">
                Endereço
              </p>
              <p className="mt-1 text-base text-slate-800">
                {atendimento.endereco || '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Informações do Atendimento */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            Informações do Atendimento
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">
                Status
              </p>
              <p className="mt-1">
                <StatusBadge status={atendimento.status} />
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => atualizarStatus(atendimento.id, 'agendado')}
                  className="rounded bg-blue-600 px-3 py-1 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Marcar como em andamento
                </button>
                <button
                  onClick={async () => {
                    const confirmed = window.confirm('Tem certeza que deseja marcar este atendimento como concluído?')
                    if (!confirmed) return
                    try {
                      setIsConcluding(true)
                      const ok = await concluirAtendimento(atendimento)
                      if (ok) {
                        atualizarStatus(atendimento.id, 'finalizado')
                      }
                    } finally {
                      setIsConcluding(false)
                    }
                  }}
                  disabled={isConcluding}
                  className="rounded bg-green-600 px-3 py-1 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                >
                  {isConcluding ? 'Concluindo...' : 'Marcar como concluído'}
                </button>
                <button
                  onClick={async () => {
                    const confirmed = window.confirm('Tem certeza que deseja cancelar este atendimento?')
                    if (!confirmed) return
                    try {
                      setIsCancelling(true)
                      const ok = await cancelarAtendimento(atendimento)
                      if (ok === false) return
                      atualizarStatus(atendimento.id, 'cancelado')
                    } finally {
                      setIsCancelling(false)
                    }
                  }}
                  disabled={isCancelling}
                  className="rounded bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                >
                  {isCancelling ? 'Cancelando...' : 'Marcar como cancelado'}
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">
                Prioridade
              </p>
              <p className="mt-1">
                <PrioridadeBadge prioridade={atendimento.prioridade} />
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">
                Marca
              </p>
              <p className="mt-1 text-base text-slate-800">
                {atendimento.marca}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">
                Problema
              </p>
              <p className="mt-1 text-base text-slate-800">
                {atendimento.problema}
              </p>
            </div>
          </div>
        </div>

        {/* Data e Horário */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            Agendamento
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">
                Data da Visita
              </p>
              <p className="mt-1 text-base text-slate-800">
                {formatarDataSomente(atendimento.dataVisita)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">
                Horário
              </p>
              <p className="mt-1 text-base text-slate-800">
                {atendimento.horarioVisita}
              </p>
            </div>
          </div>
        </div>

        {/* Observações */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            Observações
          </h3>
          <p className="text-base text-slate-700">
            {atendimento.observacao || 'Nenhuma observação registrada'}
          </p>
        </div>
      </div>

      {/* Ações */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => avisarCliente(atendimento)}
          className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          Avisar Cliente
        </button>

        <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
          Editar
        </button>

        <button className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100">
          Imprimir
        </button>
      </div>
    </div>
  );
}
