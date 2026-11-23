import styles from './StatusBadge.module.css'

export type ClientStatus = 'lead' | 'active' | 'inactive'

interface StatusBadgeProps {
  status: ClientStatus
}

const statusLabels: Record<ClientStatus, string> = {
  lead: 'Lead',
  active: 'Ativo',
  inactive: 'Inativo',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  
  const statusClass = styles[status]

  return (
    <span className={`${styles.badge} ${statusClass}`}>
      <span className={styles.dot} />
      {statusLabels[status] ?? status}
    </span>
  )
}