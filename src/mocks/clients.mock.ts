import type { Client } from '../types/client';

export const INITIAL_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Ana Souza',
    email: 'ana.souza@exemplo.com',
    phone: '11987654321',
    status: 'active',
    company: 'Tech Solutions',
    notes: 'Cliente interessada no plano empresarial',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    email: 'carlos@empresa.com',
    phone: '21988887777',
    status: 'lead',
    company: 'Consultoria Alpha',
    createdAt: new Date().toISOString(),
  },
];