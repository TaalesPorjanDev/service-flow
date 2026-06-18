import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  StatusBadge,
  PrioridadeBadge,
} from '../../components/StatusBadge/StatusBadge';
import { useAtendimentos } from '../../contexts/AtendimentosContext';
import type { AtendimentoStatus } from '../../types/atendimento';
import { formatarDataSomente } from '../../utils/format';


const statusOptions: { value: AtendimentoStatus | ''; label: string }[] = [
  { value: '', label: 'Todos os status' },
  { value: 'novo', label: 'Novo' },
  { value: 'agendado', label: 'Agendado' },
  { value: 'finalizado', label: 'Finalizado' },
  { value: 'cancelado', label: 'Cancelado' },
];

const inputClass =
  'min-w-[200px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20';

export function Atendimentos() {
  const { atendimentos, excluirAtendimento } = useAtendimentos();
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<AtendimentoStatus | ''>('');

  const filtrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    return atendimentos.filter((a) => {
      const matchBusca =
        !termo ||
        a.cliente.toLowerCase().includes(termo) ||
        a.marca.toLowerCase().includes(termo) ||
        a.problema.toLowerCase().includes(termo) ||
        a.id.toLowerCase().includes(termo);

      const matchStatus = !filtroStatus || a.status === filtroStatus;

      return matchBusca && matchStatus;
    });
  }, [atendimentos, busca, filtroStatus]);

  return (
    <>
      <header className="mb-7">
        <h2 className="text-2xl font-bold text-slate-800">Atendimentos</h2>
        <p className="mt-1 text-sm text-slate-500">
          Lista completa de chamados e solicitações
        </p>
      </header>

      <div className="mb-5 flex flex-wrap gap-3">
        <input
          type="search"
          className={inputClass}
          placeholder="Buscar por cliente, serviço ou ID..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select
          className={inputClass}
          value={filtroStatus}
          onChange={(e) =>
            setFiltroStatus(e.target.value as AtendimentoStatus | '')
          }
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        {filtrados.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-500">
            <strong className="text-slate-700">
              Nenhum atendimento encontrado
            </strong>
            <p className="mt-2 text-sm">
              Tente ajustar os filtros ou{' '}
              <Link
                to="/novo-atendimento"
                className="text-blue-600 hover:text-blue-700"
              >
                criar um novo atendimento
              </Link>
              .
            </p>
          </div>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {[
                  'ID',
                  'Cliente',
                  'Marca',
                  'Problema',
                  'Prioridade',
                  'Status',
                  'Data Visita',
                  'Ações'
                ].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtrados.map((atendimento) => (
                <tr
                  key={atendimento.id}
                  className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50 cursor-pointer"
                  onClick={() => window.location.href = `/atendimentos/${atendimento.id}`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">
                    {atendimento.id}
                  </td>
                  <td className="px-4 py-3 text-slate-800">
                    {atendimento.cliente}
                  </td>
                  <td className="px-4 py-3 text-slate-800">
                    {atendimento.marca}
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className="max-w-55 truncate text-xs text-slate-600"
                      title={atendimento.problema}
                    >
                      {atendimento.problema}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <PrioridadeBadge prioridade={atendimento.prioridade} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={atendimento.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {formatarDataSomente(atendimento.dataVisita)} {atendimento.horarioVisita}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="text-red-600 hover:text-red-700 text-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (window.confirm('Confirma excluir este atendimento?')) {
                          excluirAtendimento(atendimento.id)
                        }
                      }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
