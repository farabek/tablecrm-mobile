// src/components/ProductPicker.tsx
import { useEffect, useMemo, useState } from 'react';
import { useSaleStore } from '../store/useSaleStore';
import { makeApi } from '../api/tablecrm';
import type { Product } from '../entities/tablecrm.types';
import { asList } from '../utils/normalize';

export default function ProductPicker() {
  const token = useSaleStore((s) => s.token)!;
  const addItem = useSaleStore((s) => s.addItem);

  const [q, setQ] = useState('');
  const [res, setRes] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQ = useMemo(() => q.trim(), [q]);

  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      if (!debouncedQ) {
        setRes([]);
        return;
      }
      setLoading(true);
      try {
        const { data } = await makeApi(token).searchProducts(debouncedQ);
        setRes(asList<Product>(data));
      } catch {
        setRes([]);
      } finally {
        setLoading(false);
      }
    };
    const t = setTimeout(run, 300);
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [debouncedQ, token]);

  return (
    <div className="p-4 space-y-3">
      <div className="font-medium">Товары</div>
      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Поиск по названию или артикулу"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {loading && <div className="text-sm text-gray-500">Поиск…</div>}

      <div className="space-y-2">
        {res.map((p) => (
          <div
            key={p.id}
            className="p-3 border rounded flex items-center justify-between"
          >
            <div className="min-w-0">
              <div className="font-medium truncate">{p.name}</div>
              <div className="text-xs text-gray-500">{p.sku ?? ''}</div>
            </div>
            <button
              className="rounded bg-black text-white px-3 py-2"
              onClick={() =>
                addItem({
                  id: String(p.id),
                  name: p.name,
                  price: Number(p.price) || 0,
                  sku: p.sku,
                })
              }
            >
              Добавить
            </button>
          </div>
        ))}
        {!loading && res.length === 0 && debouncedQ && (
          <div className="text-sm text-gray-500">Ничего не найдено</div>
        )}
      </div>
    </div>
  );
}
