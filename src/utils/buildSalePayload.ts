// src/utils/buildSalePayload.ts
import type { CreateSalePayload, Id } from '../entities/tablecrm.types';

export function buildSalePayload(input: {
  clientId: Id;
  orgId: Id;
  warehouseId: Id;
  priceTypeId: Id;
  accountId: Id | null;
  items: { id: Id; qty: number; price: number | undefined }[];
}): CreateSalePayload {
  return {
    customer_id: input.clientId,
    organization_id: input.orgId,
    warehouse_id: input.warehouseId,
    price_type_id: input.priceTypeId,
    account_id: input.accountId ?? undefined,
    lines: input.items.map((i) => ({
      product_id: i.id,
      quantity: i.qty,
      price: Number(i.price ?? 0),
    })),
  };
}
