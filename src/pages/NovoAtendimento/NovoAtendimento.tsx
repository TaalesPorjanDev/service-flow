import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAtendimentos } from '../../contexts/AtendimentosContext'
import { novoAtendimentoSchema } from '../../schemas/atendimento.schema'
import type { NovoAtendimentoForm } from '../../types/atendimento'
import { fieldClass } from '../../utils/form'
import { normalizarParaIsoDate } from '../../utils/format'

export function NovoAtendimento() {
  const navigate = useNavigate()
  const { adicionarAtendimento } = useAtendimentos()
  const [sucesso, setSucesso] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NovoAtendimentoForm>({
    resolver: zodResolver(novoAtendimentoSchema),
    defaultValues: {
      prioridade: 'media',
      cliente: '',
      telefone: '',
      marca: '',
      problema: '',
      dataVisita: '',
      horarioVisita: '',
      endereco: '',
      observacao: '',
    },
  })

  function onSubmit(dados: NovoAtendimentoForm) {
    const payload: NovoAtendimentoForm = {
      ...dados,
      endereco: dados.endereco || undefined,
      observacao: dados.observacao || undefined,
      dataVisita: normalizarParaIsoDate(dados.dataVisita),
    }

    const criado = adicionarAtendimento(payload)
    setSucesso(`Atendimento ${criado.id} criado com sucesso!`)
    reset({
      prioridade: 'media',
      cliente: '',
      telefone: '',
      marca: '',
      problema: '',
      dataVisita: '',
      horarioVisita: '',
      endereco: '',
      observacao: '',
    })

    setTimeout(() => {
      navigate('/atendimentos')
    }, 1500)
  }

  return (
    <>
      <header className="mb-7">
        <h2 className="text-2xl font-bold text-slate-800">Novo Atendimento</h2>
        <p className="mt-1 text-sm text-slate-500">Preencha os dados para abrir um novo chamado</p>
      </header>

      {sucesso && (
        <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3.5 text-sm text-green-700">
          {sucesso}
        </div>
      )}

      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="cliente" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Cliente
            </label>
            <input
              id="cliente"
              type="text"
              placeholder="Nome do cliente"
              className={fieldClass(!!errors.cliente)}
              {...register('cliente')}
            />
            {errors.cliente && (
              <p className="mt-1 text-xs text-red-600">{errors.cliente.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="telefone" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Telefone
            </label>
            <input
              id="telefone"
              type="tel"
              inputMode="numeric"
              maxLength={11}
              placeholder="11999999999"
              className={fieldClass(!!errors.telefone)}
              {...register('telefone', {
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/\D/g, '')
                },
              })}
            />
            {errors.telefone && (
              <p className="mt-1 text-xs text-red-600">{errors.telefone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="marca" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Marca do Produto
            </label>
            <input
              id="marca"
              type="text"
              placeholder="Ex: Brastemp, Samsung, LG"
              className={fieldClass(!!errors.marca)}
              {...register('marca')}
            />
            {errors.marca && (
              <p className="mt-1 text-xs text-red-600">{errors.marca.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="problema" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Problema
            </label>
            <input
              id="problema"
              type="text"
              placeholder="Descreva o problema relatado"
              className={fieldClass(!!errors.problema)}
              {...register('problema')}
            />
            {errors.problema && (
              <p className="mt-1 text-xs text-red-600">{errors.problema.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="prioridade"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Prioridade
            </label>
            <select
              id="prioridade"
              className={fieldClass(!!errors.prioridade)}
              {...register('prioridade')}
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
            {errors.prioridade && (
              <p className="mt-1 text-xs text-red-600">{errors.prioridade.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="dataVisita" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Data da Visita
              </label>
              <input
                id="dataVisita"
                type="date"
                className={fieldClass(!!errors.dataVisita)}
                {...register('dataVisita')}
              />
              {errors.dataVisita && (
                <p className="mt-1 text-xs text-red-600">{errors.dataVisita.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="horarioVisita" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Horário da Visita
              </label>
              <input
                id="horarioVisita"
                type="time"
                className={fieldClass(!!errors.horarioVisita)}
                {...register('horarioVisita')}
              />
              {errors.horarioVisita && (
                <p className="mt-1 text-xs text-red-600">{errors.horarioVisita.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="endereco" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Endereço (Opcional)
            </label>
            <input
              id="endereco"
              type="text"
              placeholder="Endereço completo"
              className={fieldClass(!!errors.endereco)}
              {...register('endereco')}
            />
            {errors.endereco && (
              <p className="mt-1 text-xs text-red-600">{errors.endereco.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="observacao"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Observações (Opcional)
            </label>
            <textarea
              id="observacao"
              placeholder="Notas adicionais..."
              className={`${fieldClass(!!errors.observacao)} min-h-20 resize-y`}
              {...register('observacao')}
            />
            {errors.observacao && (
              <p className="mt-1 text-xs text-red-600">{errors.observacao.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
            >
              {isSubmitting ? 'Salvando...' : 'Criar atendimento'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/atendimentos')}
              className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
