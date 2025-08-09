export type Id = string;

export type Named = { id: Id; name: string };

export interface Account extends Named {
  number?: string;
  currency?: string;
}

export type ApiList<T> = { items: T[] }; // иногда API отдаёт { items: [...] }
