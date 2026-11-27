import { useClients } from "../../contexts/ClientsContext"
import { Button } from "../../components/ui/Button/Button"
import { StatusBadge } from "../../components/StatusBadge/StatusBadge"
import { useNavigate } from "react-router-dom"
import styles from './Dashboard.module.css'

export function Dashboard() {
  const {clients} = useClients();
  const totalClients = clients.length;
  const activeClients = clients.filter(client => client.status === 'active').length;
  const leadsCount = clients.filter(client => client.status === 'lead').length;
  const inactiveClients = clients.filter(client => client.status === 'inactive').length
  const recentClients = clients.slice(0, 5)
  const navigate = useNavigate();
  
  return (
  <div className={styles.container}>
    
    <header className={styles.header}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>Visão geral das métricas do seu CRM</p>
    </header>
    
    <div className={styles.metricsGrid}>
      
      <div className={styles.metricCard}>
        <span className={styles.metricLabel}>Total de Clientes</span>
        <span className={styles.metricValue}>{totalClients}</span>
        <span className={styles.metricHint}>Base total cadastrada</span>
      </div>
     
      <div className={styles.metricCard}>
        <span className={styles.metricLabel}>Clientes Ativos</span>
        <span className={styles.metricValue}>{activeClients}</span>
        <span className={styles.metricHint}>Clientes gerando valor</span>
      </div>
    
      <div className={styles.metricCard}>
        <span className={styles.metricLabel}>Leads em Aberto</span>
        <span className={styles.metricValue}>{leadsCount}</span>
        <span className={styles.metricHint}>Oportunidades ativas</span>
      </div>
      
      <div className={styles.metricCard}>
        <span className={styles.metricLabel}>Inativos</span>
        <span className={styles.metricValue}>{inactiveClients}</span>
        <span className={styles.metricHint}>Contatos pausados</span>
      </div>
    </div>
    
    <section className={styles.recentSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Clientes Recentes</h2>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => navigate('/clientes')}
        >
          Ver Todos
        </Button>
      </div>
      <div className={styles.recentList}>
        {recentClients.length === 0 ? (
          <p className={styles.metricHint}>Nenhum cliente cadastrado ainda.</p>
        ) : (
          recentClients.map((client) => (
            <div key={client.id} className={styles.recentItem}>
              <div className={styles.clientInfo}>
                <span className={styles.clientName}>{client.name}</span>
                <span className={styles.clientEmail}>{client.email}</span>
              </div>
              <StatusBadge status={client.status} />
            </div>
          ))
        )}
      </div>
    </section>
  </div>
);
}