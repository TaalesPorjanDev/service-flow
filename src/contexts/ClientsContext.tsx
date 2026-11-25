import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Client, ClientFormData } from '../types/client';
import { INITIAL_CLIENTS } from '../mocks/clients.mock';

interface ClientsContextData {
  clients: Client[];
  addClient: (data: ClientFormData) => void;
  updateClient: (id: string, data: ClientFormData) => void;
  deleteClient: (id: string) => void;
  getClientById: (id: string) => Client | undefined;
}

const ClientsContext = createContext<ClientsContextData | null>(null);

export function ClientsProvider({ children }: { children: ReactNode }) {
    
  const [clients, setClients] = useState<Client[]>(() => {
    try {
      const stored = localStorage.getItem('@crm:clients');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Erro ao carregar clients do localStorage', error);
    }

    return INITIAL_CLIENTS;
  });

  useEffect(() => {
    localStorage.setItem('@crm:clients', JSON.stringify(clients));
  }, [clients])

  function addClient(data: ClientFormData) {
    const newClient: Client = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    setClients((prev) => [newClient, ...prev]);
  }

  function updateClient(id: string, data: ClientFormData) {
    setClients((prev) =>
      prev.map((client) => (client.id === id ? { ...client, ...data } : client))
    );
  }

  function deleteClient(id: string) {
    setClients((prev) =>
        prev.filter((client) => client.id !== id)
    )
  }

  function getClientById(id: string) {
    return clients.find((client) => client.id === id)
  }

  

  return (
    <ClientsContext.Provider
      value={{
        clients,
        addClient,
        updateClient,
        deleteClient,
        getClientById,
      }}
      >
        {children}
    </ClientsContext.Provider>

    )
}

export function useClients() {
        const context = useContext(ClientsContext);

        if(!context) {
            throw new Error('UseClients deve ser utilizado dentro de um ClientsProvider');
        }

        return context;
    }
