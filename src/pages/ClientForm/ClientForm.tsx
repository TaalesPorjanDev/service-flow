import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  clientSchema,
  type ClientSchema,
} from '../../types/schemas/client.schema';
import { useClients } from '../../contexts/ClientsContext';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import styles from './ClientForm.module.css';

export function ClientForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const { addClient, updateClient, getClientById } = useClients();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClientSchema>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      status: 'lead',
    },
  });

  useEffect(() => {
    if (id) {
      const client = getClientById(id);
      if (client) {
        reset({
          name: client.name,
          email: client.email,
          phone: client.phone,
          status: client.status,
          company: client.company || '',
          notes: client.notes || '',
        });
      } else {
        // Se digitou um ID que não existe na URL, volta para a listagem
        navigate('/clientes');
      }
    }
  }, [id, getClientById, reset, navigate]);

  function onSubmit(data: ClientSchema) {
    if (isEditing && id) {
      updateClient(id, data);
    } else {
      addClient(data);
      
    }
    navigate('/clientes');
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {isEditing ? 'Editar Cliente' : 'Novo Cliente'}
        </h1>
        <p className={styles.subtitle}>
          {isEditing
            ? 'Atualize as informações do cliente abaixo'
            : 'Preencha os dados para cadastrar um novo cliente'}
        </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.formCard}>
          <Input
            label="Nome Completo *"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Ex: Ana Souza"
          />
          <Input
            label="E-mail *"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            placeholder="exemplo@email.com"
          />
          <div className={styles.grid}>
            <Input
              label="Telefone *"
              {...register('phone')}
              error={errors.phone?.message}
              placeholder="(11) 98765-4321"
            />
            <Input
              label="Empresa (opcional) *"
              {...register('company')}
              error={errors.company?.message}
              placeholder="Nome da empresa"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Status do Cliente *</label>
            <select className={styles.select} {...register('status')}>
              <option value="lead">Lead (Em prospecção)</option>
              <option value="active">Ativo (Cliente regular)</option>
              <option value="inactive">Inativo (Cancelado/Pausado)</option>
            </select>
            {errors.status && (
              <p className={styles.errorMessage}>{errors.status.message}</p>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Anotações / Histórico (opcional)
            </label>
            <textarea
              className={styles.textarea}
              {...register('notes')}
              placeholder="Detalhes importantes sobre este cliente..."
            />
          </div>
          <div className={styles.actions}>
            <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/clientes')}>
                Cancelar
            </Button>
            <Button
                type="submit"
                isLoading={isSubmitting}
                >{isEditing ? 'Salvar Alterações' : 'Cadastrar Cliente'}
                
            </Button>
          </div>
        </form>
      
    </div>
  );
}
