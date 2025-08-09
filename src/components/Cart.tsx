// src/components/Cart.tsx
import { useSaleStore } from '../store/useSaleStore';

export default function Cart() {
  const items = useSaleStore((s) => s.items);
  const setQty = useSaleStore((s) => s.setQty);
  const removeItem = useSaleStore((s) => s.removeItem);

  const total = items.reduce((s, i) => s + i.qty * (i.price ?? 0), 0);

  if (!items.length) return null;

  return (
    <div className="p-4 space-y-3">
      <div className="font-medium">Корзина</div>
      <div className="space-y-2">
        {items.map((i) => (
          <div key={i.id} className="p-3 border rounded">
            <div className="flex justify-between">
              <div className="font-medium">{i.name}</div>
              <button
                onClick={() => removeItem(i.id)}
                className="text-sm text-red-600"
              >
                Удалить
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => setQty(i.id, Math.max(1, i.qty - 1))}
                >
                  -
                </button>
                <input
                  className="w-14 text-center border rounded py-1"
                  value={i.qty}
                  onChange={(e) =>
                    setQty(i.id, Math.max(1, Number(e.target.value) || 1))
                  }
                />
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => setQty(i.id, i.qty + 1)}
                >
                  +
                </button>
              </div>
              <div className="tabular-nums">
                {((i.price ?? 0) * i.qty).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between font-semibold text-lg">
        <div>Итого</div>
        <div className="tabular-nums">{total.toFixed(2)}</div>
      </div>
    </div>
  );
}
