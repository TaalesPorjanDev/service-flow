import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { useEntrega } from '../../contexts/EntregaContext'
import { useToast } from '../../contexts/ToastContext'
import { novoServicoSchema, type NovoServicoSchema } from '../../schemas/servico.schema'
import type { Servico } from '../../types/servico'
import { fieldClass } from '../../utils/form'

export function NovoServico() {
  const { adicionar } = useEntrega()
  const { showSuccess } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NovoServicoSchema>({
    resolver: zodResolver(novoServicoSchema),
    defaultValues: {
      cliente: '',
      telefone: '',
      marca: '',
      problema: '',
      servicoRealizado: '',
      dataVisita: '',
      horaVisita: '',
    },
  })

  function onSubmit(dados: NovoServicoSchema) {
    const novo: Servico = {
      id: uuidv4(),
      ...dados,
    }
    adicionar(novo)
    showSuccess('Serviço salvo e enviado para a lista de entrega')
    reset()
  }

  return (
    <div>
      <header className="mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Novo Serviço / Entrega</h3>
        <p className="mt-1 text-sm text-slate-500">
          Preencha os dados para enviar para a lista de entrega
        </p>
      </header>

      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="cliente" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Cliente
            </label>
            <input
              id="cliente"
              className={fieldClass(!!errors.cliente)}
              placeholder="Nome do cliente"
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
              className={fieldClass(!!errors.telefone)}
              placeholder="11999999999"
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
              Marca
            </label>
            <input
              id="marca"
              className={fieldClass(!!errors.marca)}
              placeholder="Ex: Samsung"
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
              className={fieldClass(!!errors.problema)}
              placeholder="Descreva o problema"
              {...register('problema')}
            />
            {errors.problema && (
              <p className="mt-1 text-xs text-red-600">{errors.problema.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="servicoRealizado"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Serviço realizado
            </label>
            <input
              id="servicoRealizado"
              className={fieldClass(!!errors.servicoRealizado)}
              placeholder="O que foi feito"
              {...register('servicoRealizado')}
            />
            {errors.servicoRealizado && (
              <p className="mt-1 text-xs text-red-600">{errors.servicoRealizado.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="dataVisita"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Data
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
              <label
                htmlFor="horaVisita"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Hora
              </label>
              <input
                id="horaVisita"
                type="time"
                className={fieldClass(!!errors.horaVisita)}
                {...register('horaVisita')}
              />
              {errors.horaVisita && (
                <p className="mt-1 text-xs text-red-600">{errors.horaVisita.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar e enviar para Entrega'}
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NovoServico
