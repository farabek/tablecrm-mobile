import { create } from 'zustand';

type Client = { id: string; phone: string; name?: string };
type Item = {
  id: string;
  name: string;
  price: number;
  qty: number;
  sku?: string;
};

type State = {
  token: string | null;
  client: Client | null;
  orgId: string | null;
  warehouseId: string | null;
  priceTypeId: string | null;
  accountId: string | null;
  items: Item[];
  setToken(t: string): void;
  setClient(c: Client | null): void;
  setOrg(id: string): void;
  setWarehouse(id: string): void;
  setPriceType(id: string): void;
  setAccount(id: string): void;
  addItem(i: Omit<Item, 'qty'>): void;
  setQty(id: string, qty: number): void;
  removeItem(id: string): void;
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
