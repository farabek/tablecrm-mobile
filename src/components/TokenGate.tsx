import { useState, useEffect } from 'react';
import { useSaleStore } from '../store/useSaleStore';

export default function TokenGate() {
  const token = useSaleStore((s) => s.token);
  const setToken = useSaleStore((s) => s.setToken);
  const [val, setVal] = useState(token ?? '');

  // поддержка ?token=...
  useEffect(() => {
    const url = new URL(window.location.href);
    const t = url.searchParams.get('token');
    if (t) {
      setVal(t);
      setToken(t);
    }
  }, [setToken]);

  if (token) return null;

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-lg font-semibold">Вход по токену</h1>
      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Вставьте token из задания"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <button
        className="w-full rounded bg-black text-white py-3 active:opacity-80"
        onClick={() => val && setToken(val)}
      >
        Продолжить
      </button>
    </div>
  );
}
