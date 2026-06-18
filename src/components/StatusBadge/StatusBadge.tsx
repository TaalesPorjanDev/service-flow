import type { AtendimentoPrioridade, AtendimentoStatus } from '../../types/atendimento'

const statusLabels: Record<AtendimentoStatus, string> = {
  novo: 'Novo',
  agendado: 'Em andamento',
  finalizado: 'Finalizado',
  cancelado: 'Cancelado',
}

const prioridadeLabels: Record<AtendimentoPrioridade, string> = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
}

const statusStyles: Record<AtendimentoStatus, string> = {
  novo: 'bg-blue-100 text-blue-700',
  agendado: 'bg-amber-100 text-amber-700',
  finalizado: 'bg-green-100 text-green-700',
  cancelado: 'bg-red-100 text-red-700',
}

const prioridadeStyles: Record<AtendimentoPrioridade, string> = {
  baixa: 'bg-slate-100 text-slate-600',
  media: 'bg-orange-100 text-orange-700',
  alta: 'bg-red-100 text-red-700',
}

const badgeBase = 'inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize'

interface StatusBadgeProps {
  status: AtendimentoStatus
}

interface PrioridadeBadgeProps {
  prioridade: AtendimentoPrioridade
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${badgeBase} ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  )
}

export function PrioridadeBadge({ prioridade }: PrioridadeBadgeProps) {
  return (
    <span className={`${badgeBase} ${prioridadeStyles[prioridade]}`}>
      {prioridadeLabels[prioridade]}
    </span>
  )
}
