// src/store/useSaleStore.ts
import { create } from 'zustand';
import type { Client, Id, Product } from '../entities/tablecrm.types';

type CartItem = Pick<Product, 'id' | 'name' | 'sku' | 'price'> & {
  qty: number;
};

type State = {
  token: string | null;
  client: Client | null;
  orgId: Id | null;
  warehouseId: Id | null;
  priceTypeId: Id | null;
  accountId: Id | null;
  items: CartItem[];
  setToken(t: string): void;
  setClient(c: Client | null): void;
  setOrg(id: Id): void;
  setWarehouse(id: Id): void;
  setPriceType(id: Id): void;
  setAccount(id: Id): void;
  addItem(i: Omit<CartItem, 'qty'>): void;
  setQty(id: Id, qty: number): void;
  removeItem(id: Id): void;
  clear(): void;
};

export const useSaleStore = create<State>((set) => ({
  token: localStorage.getItem('tablecrm_token'),
  client: null,
  orgId: null,
  warehouseId: null,
  priceTypeId: null,
  accountId: null,
  items: [],
  setToken: (t) => {
    localStorage.setItem('tablecrm_token', t);
    set({ token: t });
  },
  setClient: (c) => set({ client: c }),
  setOrg: (id) => set({ orgId: id }),
  setWarehouse: (id) => set({ warehouseId: id }),
  setPriceType: (id) => set({ priceTypeId: id }),
  setAccount: (id) => set({ accountId: id }),
  addItem: (i) =>
    set((s) => {
      const ex = s.items.find((x) => x.id === i.id);
      return ex
        ? {
            items: s.items.map((x) =>
              x.id === i.id ? { ...x, qty: x.qty + 1 } : x,
            ),
          }
        : { items: [...s.items, { ...i, qty: 1 }] };
    }),
  setQty: (id, qty) =>
    set((s) => ({
      items: s.items.map((x) => (x.id === id ? { ...x, qty } : x)),
    })),
  removeItem: (id) =>
    set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
  clear: () =>
    set({
      client: null,
      orgId: null,
      warehouseId: null,
      priceTypeId: null,
      accountId: null,
      items: [],
    }),
}));
