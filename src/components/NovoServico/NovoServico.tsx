import React, { useState } from 'react'
import { useEntrega } from '../../contexts/EntregaContext'
import { useToast } from '../../contexts/ToastContext'
import type { Servico } from '../../contexts/EntregaContext'
import { v4 as uuidv4 } from 'uuid'

const fieldClass = () =>
  [
    'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 transition-colors focus:outline-none focus:ring-2',
    'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20',
  ].join(' ')

export const NovoServico: React.FC = () => {
  const { adicionar } = useEntrega()
  const { showSuccess } = useToast()
  const [cliente, setCliente] = useState('')
  const [telefone, setTelefone] = useState('')
  const [marca, setMarca] = useState('')
  const [problema, setProblema] = useState('')
  const [servicoRealizado, setServicoRealizado] = useState('')
  const [dataVisita, setDataVisita] = useState('')
  const [horaVisita, setHoraVisita] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const novo: Servico = {
      id: uuidv4(),
      cliente,
      telefone,
      marca,
      problema,
      servicoRealizado,
      dataVisita,
      horaVisita,
    }
    adicionar(novo)
    showSuccess('Dados salvos com sucesso e enviados para entrega')
    setCliente('')
    setTelefone('')
    setMarca('')
    setProblema('')
    setServicoRealizado('')
    setDataVisita('')
    setHoraVisita('')
  }

  return (
    <div>
      <header className="mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Novo Serviço / Entrega</h3>
        <p className="mt-1 text-sm text-slate-500">Preencha os dados para enviar para a lista de entrega</p>
      </header>

      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Cliente</label>
            <input
              className={fieldClass()}
              value={cliente}
              onChange={e => setCliente(e.target.value)}
              placeholder="Nome do cliente"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Telefone</label>
            <input
              className={fieldClass()}
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
              placeholder="(XX) XXXXX-XXXX"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Marca</label>
            <input
              className={fieldClass()}
              value={marca}
              onChange={e => setMarca(e.target.value)}
              placeholder="Ex: Samsung"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Problema</label>
            <input
              className={fieldClass()}
              value={problema}
              onChange={e => setProblema(e.target.value)}
              placeholder="Descreva o problema"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Serviço realizado</label>
            <input
              className={fieldClass()}
              value={servicoRealizado}
              onChange={e => setServicoRealizado(e.target.value)}
              placeholder="O que foi feito"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Data</label>
              <input type="date" className={fieldClass()} value={dataVisita} onChange={e => setDataVisita(e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Hora</label>
              <input type="time" className={fieldClass()} value={horaVisita} onChange={e => setHoraVisita(e.target.value)} />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Salvar e enviar para Entrega</button>
            <button type="button" onClick={() => {
              setCliente('')
              setTelefone('')
              setMarca('')
              setProblema('')
              setServicoRealizado('')
              setDataVisita('')
              setHoraVisita('')
            }} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Limpar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NovoServico
