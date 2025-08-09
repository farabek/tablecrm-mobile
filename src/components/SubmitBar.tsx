import { useSaleStore } from '../store/useSaleStore';
import { makeApi } from '../api/tablecrm';
import { buildSalePayload } from '../utils/buildSalePayload';

export default function SubmitBar() {
  const token = useSaleStore((s) => s.token)!;
  const client = useSaleStore((s) => s.client);
  const orgId = useSaleStore((s) => s.orgId);
  const warehouseId = useSaleStore((s) => s.warehouseId);
  const priceTypeId = useSaleStore((s) => s.priceTypeId);
  const accountId = useSaleStore((s) => s.accountId);
  const items = useSaleStore((s) => s.items);
  const clear = useSaleStore((s) => s.clear);

  const disabled =
    !client || !orgId || !warehouseId || !priceTypeId || items.length === 0;

  const submit = async (conduct: boolean) => {
    const api = makeApi(token);
    const payload = buildSalePayload({
      clientId: client!.id,
      orgId: orgId!,
      warehouseId: warehouseId!,
      priceTypeId: priceTypeId!,
      accountId,
      items: items.map(({ id, qty, price }) => ({ id, qty, price })),
    });
    if (conduct) await api.createAndPostSale(payload);
    else await api.createSale(payload);
    clear();
    alert('Успешно отправлено');
  };

  return (
    <div className="sticky bottom-0 border-t bg-white p-3 grid grid-cols-2 gap-2">
      <button
        className="rounded border py-3 active:bg-gray-50 disabled:opacity-50"
        disabled={disabled}
        onClick={() => submit(false)}
      >
        Создать продажу
      </button>
      <button
        className="rounded bg-black text-white py-3 active:opacity-90 disabled:opacity-50"
        disabled={disabled}
        onClick={() => submit(true)}
      >
        Создать и провести
      </button>
    </div>
  );
}
