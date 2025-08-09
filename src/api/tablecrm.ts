import axios from 'axios';
import type { Account, ApiList } from '../entities/tablecrm.types';

const apiBase = import.meta.env.VITE_API_BASE || '';

export const makeApi = (token: string) => {
  const http = axios.create({
    baseURL: `${apiBase}/api/v1`,
    params: { token },
  });

  return {
    // NOTE: проверь реальные пути в Network/Swagger и поправь ниже.
    findClientByPhone: (phone: string) =>
      http.get('/clients/', { params: { phone } }),
    getOrganizations: () => http.get('/organizations/'),
    getWarehouses: () => http.get('/warehouses/'),
    getPriceTypes: () => http.get('/price_types/'),
    // getAccounts: () => http.get('/accounts/'),
    getAccounts: () => http.get<ApiList<Account> | Account[]>('/accounts/'),
    searchProducts: (q: string) => http.get('/products/', { params: { q } }),
    createSale: (payload: any) => http.post('/docs_sales/', payload),
    createAndPostSale: (payload: any) =>
      http.post('/docs_sales/', { ...payload, conduct: true }),
  };
};
