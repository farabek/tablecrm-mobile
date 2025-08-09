export type Id = string;

export type ApiList<T> = { items: T[] };

export interface Named {
  id: Id;
  name: string;
}

export interface Account extends Named {
  number?: string;
  currency?: string;
}

export interface Organization extends Named {
  inn?: string;
}

export interface Warehouse extends Named {
  address?: string;
}

export interface PriceType extends Named {
  code?: string;
}

export interface Client extends Named {
  phone?: string;
}

export interface Product extends Named {
  sku?: string;
  price?: number;
}

export interface SaleLine {
  product_id: Id;
  quantity: number;
  price: number;
}

export interface CreateSalePayload {
  customer_id: Id;
  organization_id: Id;
  warehouse_id: Id;
  price_type_id: Id;
  account_id?: Id | null;
  lines: SaleLine[];
}
