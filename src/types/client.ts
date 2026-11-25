export type ClientStatus = 'lead' | 'active' | 'inactive'

export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: ClientStatus;
    company?: string;
    notes?: string;
    createdAt: string;
}

export type  ClientFormData = Omit<Client, 'id' | 'createdAt'>;