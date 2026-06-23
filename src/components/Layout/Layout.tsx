import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/atendimentos', label: 'Atendimentos', end: false },
  { to: '/novo-atendimento', label: 'Novo Atendimento', end: false },
  { to: '/novo-servico', label: 'Novo Serviço', end: false },
  { to: '/entrega', label: 'Entrega de Máquinas', end: false },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap',
    isActive
      ? 'bg-blue-50 text-blue-600'
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800',
  ].join(' ')

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white md:w-60 md:border-r md:border-b-0">
        <div className="border-b border-slate-200 px-5 py-6">
          <h1 className="text-xl font-bold text-blue-600">Service Flow</h1>
          <p className="mt-1 text-xs text-slate-500">Gestão de atendimentos</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto p-3 md:flex-col">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-x-auto p-5 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}
