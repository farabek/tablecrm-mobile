import { useEffect, useState } from 'react';
import { useSaleStore } from '../store/useSaleStore';
import { makeApi } from '../api/tablecrm';

export default function SelectPriceType() {
  const token = useSaleStore((s) => s.token)!;
  const priceTypeId = useSaleStore((s) => s.priceTypeId);
  const setPriceType = useSaleStore((s) => s.setPriceType);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await makeApi(token).getPriceTypes();
      setItems(data?.items ?? data ?? []);
    })();
  }, [token]);

  return (
    <div className="p-4 space-y-2">
      <div className="font-medium">Тип цены</div>
      <select
        className="w-full rounded border px-3 py-2"
        value={priceTypeId ?? ''}
        onChange={(e) => setPriceType(e.target.value)}
      >
        <option value="" disabled>
          Выберите тип цены
        </option>
        {items.map((p: any) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
