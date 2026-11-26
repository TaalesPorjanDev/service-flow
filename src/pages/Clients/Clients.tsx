import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Clients.module.css';
import { useClients } from '../../contexts/ClientsContext';
import { Button } from '../../components/ui/Button/Button';
import { Input } from '../../components/ui/Input/Input';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';

type StatusFilterType = 'all' | 'lead' | 'active' | 'inactive';

export function Clients() {
  const { clients, deleteClient } = useClients();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    StatusFilterType
  >('all');

  const navigate = useNavigate();

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        !search ||
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || client.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [clients, search, statusFilter]);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Clientes</h1>
          <p className={styles.subtitle}>
            Gerencie sua base de clientes e leads
          </p>
        </div>
        <Button onClick={() => navigate('/clientes/novo')}>
          + Novo Cliente
        </Button>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Input
            placeholder="Buscar por nome ou e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilterType)}
          >
            <option value="all">Todos os Status</option>
            <option value="lead">Leads</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {filteredClients.length === 0 ? (
          <div className={styles.emptyState}>Nenhum Cliente Encontrado.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Empresa</th>
                <th>Status</th>
                <th>Cadastrado em</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <div className={styles.clientName}>{client.name}</div>
                    <div className={styles.clientEmail}>{client.email}</div>
                  </td>

                  <td>{client.company}</td>
                  <td>
                    <StatusBadge status={client.status} />
                  </td>
                  <td>
                    {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Button
                        className={styles.actionButton}
                        onClick={() =>
                          navigate(`/clientes/${client.id}/editar`)
                        }
                      >
                        Editar
                      </Button>
                      <Button
                        className={`${styles.actionButton} ${styles.actionDelete}`}
                        onClick={() => {
                          const confirmou =
                            window.confirm(`Deseja realmente excluir
                            o cliente ${client.name}?`);

                          if (confirmou) {
                            deleteClient(client.id);
                          }
                        }}
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
