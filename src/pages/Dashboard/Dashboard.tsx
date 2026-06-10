import { Link } from 'react-router-dom'
import { StatusBadge } from '../../components/StatusBadge/StatusBadge'
import { useAtendimentos } from '../../contexts/AtendimentosContext'

const statCards = [
  { key: 'total', label: 'Total', color: 'text-slate-800' },
  { key: 'novo', label: 'Novo', color: 'text-blue-600' },
  { key: 'agendado', label: 'Agendado', color: 'text-amber-600' },
  { key: 'finalizado', label: 'Finalizado', color: 'text-green-600' },
] as const

export function Dashboard() {
  const { atendimentos } = useAtendimentos()

  const stats = {
    total: atendimentos.length,
    novo: atendimentos.filter((a) => a.status === 'novo').length,
    agendado: atendimentos.filter((a) => a.status === 'agendado').length,
    finalizado: atendimentos.filter((a) => a.status === 'finalizado').length,
  }

  const recentes = [...atendimentos]
    .sort((a, b) => new Date(b.dataVisita).getTime() - new Date(a.dataVisita).getTime())
    .slice(0, 5)

  return (
    <>
      <header className="mb-7">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">Visão geral dos atendimentos em andamento</p>
      </header>

      <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
        {statCards.map((card) => (
          <div
            key={card.key}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="text-xs font-medium text-slate-500">{card.label}</div>
            <div className={`mt-1 text-3xl font-bold ${card.color}`}>
              {stats[card.key]}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 font-semibold text-slate-800">
          Atendimentos recentes —{' '}
          <Link to="/atendimentos" className="text-blue-600 hover:text-blue-700">
            ver todos
          </Link>
        </div>
        <ul>
          {recentes.map((atendimento) => (
            <li
              key={atendimento.id}
              className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-3.5 last:border-b-0"
            >
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-800">{atendimento.cliente}</div>
                <div className="truncate text-xs text-slate-500">{atendimento.marca} - {atendimento.problema}</div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <StatusBadge status={atendimento.status} />
                <span className="text-xs text-slate-500">
                  {atendimento.dataVisita} {atendimento.horarioVisita}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
