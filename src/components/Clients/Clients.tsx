import {useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Clients.module.css';
import { useClients } from '../../contexts/ClientsContext';
import { Button } from '../ui/Button/Button';
import { Input } from '../ui/Input/Input';

export function Clients() {
    const {clients, deleteClient} = useClients()
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'lead' | 'active' | 'inactive'>('all');
    
    const navigate = useNavigate();
    
    const filteredClients = useMemo(() => {
        return clients.filter((client) => {
            const matchesSearch =
              !search ||
              client.name.toLowerCase().includes(search.toLowerCase()) ||
              client.email.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
              statusFilter === 'all' ||
              client.status === statusFilter;

              return matchesSearch && matchesStatus;
        })
    }, [clients, search, statusFilter]);
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>
                        Clientes
                    </h1>
                    <p className={styles.subtitle}>
                        Gerencie sua base de clientes e leads
                    </p>
                    <Button onClick={() => navigate('/clients/novo')}>
                        + Novo Cliente
                    </Button>
                </div>
            </header>

            <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                    <Input 
                        placeholder='Buscar por nome ou e-mail...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select 
                        className={styles.filterSelect}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                    >

                    <option value="all">Todos os Status</option>
                    <option value="lead">Leads</option>
                    <option value="active">Ativos</option>
                    <option value="inactive">Inativos</option>

                    </select>
                </div>
            </div>

            <div className={styles.tableContainer}>
                {filteredClients.length === 0 ? 
                 (
                    <div className={styles.emptyState}>Nenhum Cliente Encontrado.</div>
                 ) : (
                    <table className={styles.table}>
                        <thead>
                            <th>Cliente</th>
                            <th>Empresa</th>
                            <th>Status</th>
                            <th>Cadastrado em</th>
                            <th>Ações</th>
                        </thead>

                        <tbody>
                            {filteredClients.map((client) => (
                                <tr key={client.id}>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                      </table>
                    
                 )
                }
            </div>
        </div>
    )
}