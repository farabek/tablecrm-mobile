import { useEffect, useState } from 'react';
import { useSaleStore } from '../store/useSaleStore';
import { makeApi } from '../api/tablecrm';

export default function SelectWarehouse() {
  const token = useSaleStore((s) => s.token)!;
  const warehouseId = useSaleStore((s) => s.warehouseId);
  const setWarehouse = useSaleStore((s) => s.setWarehouse);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await makeApi(token).getWarehouses();
      setItems(data?.items ?? data ?? []);
    })();
  }, [token]);

  return (
    <div className="p-4 space-y-2">
      <div className="font-medium">Склад</div>
      <select
        className="w-full rounded border px-3 py-2"
        value={warehouseId ?? ''}
        onChange={(e) => setWarehouse(e.target.value)}
      >
        <option value="" disabled>
          Выберите склад
        </option>
        {items.map((w: any) => (
          <option key={w.id} value={w.id}>
            {w.name}
          </option>
        ))}
      </select>
    </div>
  );
}
