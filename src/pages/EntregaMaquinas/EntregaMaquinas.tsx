import { useState } from 'react'
import { useEntrega } from '../../contexts/EntregaContext'

export function EntregaMaquinas() {
  const { lista, notificar, excluir } = useEntrega()
  const [notificandoId, setNotificandoId] = useState<string | null>(null)

  async function handleNotificar(id: string) {
    setNotificandoId(id)
    try {
      await notificar(id)
    } finally {
      setNotificandoId(null)
    }
  }

  return (
    <div className="max-w-3xl">
      <header className="mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Entrega de Máquinas</h2>
        <p className="mt-1 text-sm text-slate-500">
          Gerencie as entregas pendentes e avise os clientes
        </p>
      </header>

      {lista.length === 0 && (
        <p className="text-sm text-slate-500">Nenhuma máquina para entrega.</p>
      )}

      <ul className="mt-3 space-y-4">
        {lista.map((item) => (
          <li
            key={item.id}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <strong className="block text-slate-800">{item.cliente}</strong>
                <div className="text-sm text-slate-600">Telefone: {item.telefone}</div>
                <div className="text-sm text-slate-600">Marca: {item.marca}</div>
                <div className="text-sm text-slate-600">
                  Serviço: {item.servicoRealizado}
                </div>
                <div className="text-sm text-slate-600">
                  Data/Hora: {item.dataVisita} {item.horaVisita}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => handleNotificar(item.id)}
                  disabled={notificandoId === item.id}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                >
                  {notificandoId === item.id ? 'Enviando...' : 'Avisar cliente'}
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Deseja realmente excluir este atendimento?')) {
                      excluir(item.id)
                    }
                  }}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Excluir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EntregaMaquinas
