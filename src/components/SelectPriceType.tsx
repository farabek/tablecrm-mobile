import { useEffect, useState } from 'react';
import { useSaleStore } from '../store/useSaleStore';
import { makeApi } from '../api/tablecrm';
import type { PriceType } from '../entities/tablecrm.types';
import { asList } from '../utils/normalize';

export default function SelectPriceType() {
  const token = useSaleStore((s) => s.token)!;
  const priceTypeId = useSaleStore((s) => s.priceTypeId);
  const setPriceType = useSaleStore((s) => s.setPriceType);

  const [items, setItems] = useState<PriceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const { data } = await makeApi(token).getPriceTypes();
        setItems(asList<PriceType>(data));
      } catch {
        setErr('Не удалось загрузить типы цен');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <div className="p-4 space-y-2">
      <div className="font-medium">Тип цен</div>
      <select
        className="w-full rounded border px-3 py-2 disabled:opacity-60"
        value={priceTypeId ?? ''}
        onChange={(e) => setPriceType(e.target.value)}
        disabled={loading || !!err}
      >
        <option value="" disabled>
          Выберите тип цен
        </option>
        {items.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      {loading && <div className="text-sm text-gray-500">Загрузка…</div>}
      {err && <div className="text-sm text-red-600">{err}</div>}
    </div>
  );
}
