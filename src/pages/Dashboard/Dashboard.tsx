import { useClients } from "../../contexts/ClientsContext"
import { Button } from "../../components/ui/Button/Button"
import { StatusBadge } from "../../components/StatusBadge/StatusBadge"
import { useNavigate } from "react-router-dom"
import styles from './Dashboard.module.css'

export function Dashboard() {
  const {clients} = useClients();
  const totalClients = clients.length;
  const activeClients = clients.filter(client => client.status === 'active').length;
  const leadCount = clients.filter(client => client.status === 'lead').length;
  const inactiveClients = clients.filter(client => client.status === 'inactive').length
  const recentClients = clients.slice(0, 5)
  return (
    <div></div>
  )
}