export const buildSalePayload = (state: {
  clientId: string;
  orgId: string;
  warehouseId: string;
  priceTypeId: string;
  accountId: string | null;
  items: { id: string; qty: number; price: number }[];
}) => {
  const lines = state.items.map((i) => ({
    product_id: i.id,
    quantity: i.qty,
    price: i.price,
  }));
  return {
    customer_id: state.clientId,
    organization_id: state.orgId,
    warehouse_id: state.warehouseId,
    price_type_id: state.priceTypeId,
    account_id: state.accountId,
    lines,
  };
};
