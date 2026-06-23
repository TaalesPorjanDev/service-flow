import React from 'react';
import { useEntrega } from '../../contexts/EntregaContext';

const EntregaMaquinas: React.FC = () => {
  const { lista, notificar, excluir } = useEntrega();

  return (
    <div className="max-w-3xl">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Entrega de Máquinas
      </h2>
      {lista.length === 0 && (
        <p className="text-sm text-slate-500">Nenhuma máquina para entrega.</p>
      )}

      <ul className="space-y-4 mt-3">
        {lista.map((item) => (
          <li
            key={item.id}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="flex justify-between">
              <div>
                <strong className="block text-slate-800">{item.cliente}</strong>
                <div className="text-sm text-slate-600">
                  Telefone: {item.telefone || '-'}
                </div>
                <div className="text-sm text-slate-600">
                  Marca: {item.marca || '-'}
                </div>
                <div className="text-sm text-slate-600">
                  Serviço: {item.servicoRealizado || '-'}
                </div>
                <div className="text-sm text-slate-600">
                  Data/Hora: {item.dataVisita || '-'} {item.horaVisita || ''}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => notificar(item.id)}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Avisar cliente
                </button>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        'Deseja realmente excluir este atendimento?'
                      )
                    ) {
                      excluir(item.id);
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
  );
};

export default EntregaMaquinas;
