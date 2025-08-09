import axios from 'axios';
import type {
  Account,
  ApiList,
  CreateSalePayload,
  Organization,
  Warehouse,
  PriceType,
  Client,
  Product,
} from '../entities/tablecrm.types';

const apiBase = import.meta.env.VITE_API_BASE || '';

export const makeApi = (token: string) => {
  const http = axios.create({
    baseURL: `${apiBase}/api/v1`,
    params: { token },
  });

  return {
    // Проверь реальные пути и параметры в Network/Swagger
    findClientByPhone: (phone: string) =>
      http.get<ApiList<Client> | Client[]>('/clients/', { params: { phone } }),

    getOrganizations: () =>
      http.get<ApiList<Organization> | Organization[]>('/organizations/'),

    getWarehouses: () =>
      http.get<ApiList<Warehouse> | Warehouse[]>('/warehouses/'),

    getPriceTypes: () =>
      http.get<ApiList<PriceType> | PriceType[]>('/price_types/'),

    getAccounts: () => http.get<ApiList<Account> | Account[]>('/accounts/'),

    searchProducts: (q: string) =>
      http.get<ApiList<Product> | Product[]>('/products/', { params: { q } }),

    createSale: (payload: CreateSalePayload) =>
      http.post('/docs_sales/', payload),

    createAndPostSale: (payload: CreateSalePayload) =>
      http.post('/docs_sales/', { ...payload, conduct: true }),
  };
};
