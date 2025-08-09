import { useEffect, useState } from 'react';
import { useSaleStore } from '../store/useSaleStore';
import { makeApi } from '../api/tablecrm';
import type { Warehouse } from '../entities/tablecrm.types';
import { asList } from '../utils/normalize';

export default function SelectWarehouse() {
  const token = useSaleStore((s) => s.token)!;
  const warehouseId = useSaleStore((s) => s.warehouseId);
  const setWarehouse = useSaleStore((s) => s.setWarehouse);

  const [items, setItems] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const { data } = await makeApi(token).getWarehouses();
        setItems(asList<Warehouse>(data));
      } catch {
        setErr('Не удалось загрузить склады');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <div className="p-4 space-y-2">
      <div className="font-medium">Склад</div>
      <select
        className="w-full rounded border px-3 py-2 disabled:opacity-60"
        value={warehouseId ?? ''}
        onChange={(e) => setWarehouse(e.target.value)}
        disabled={loading || !!err}
      >
        <option value="" disabled>
          Выберите склад
        </option>
        {items.map((w) => (
          <option key={w.id} value={w.id}>
            {w.name}
          </option>
        ))}
      </select>
      {loading && <div className="text-sm text-gray-500">Загрузка…</div>}
      {err && <div className="text-sm text-red-600">{err}</div>}
    </div>
  );
}
