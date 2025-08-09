import { useState } from 'react';
import { useSaleStore } from '../store/useSaleStore';
import { makeApi } from '../api/tablecrm';

export default function ProductPicker() {
  const token = useSaleStore((s) => s.token)!;
  const addItem = useSaleStore((s) => s.addItem);
  const [q, setQ] = useState('');
  const [res, setRes] = useState<any[]>([]);

  const search = async () => {
    if (!q) return;
    const { data } = await makeApi(token).searchProducts(q);
    setRes(data?.items ?? data ?? []);
  };

  return (
    <div className="p-4 space-y-3">
      <div className="font-medium">Товары</div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border px-3 py-2"
          placeholder="Поиск по названию или артикулу"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          className="rounded bg-gray-900 text-white px-4"
          onClick={search}
        >
          Найти
        </button>
      </div>
      <div className="space-y-2">
        {res.map((p: any) => (
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
      </div>
    </div>
  );
}
