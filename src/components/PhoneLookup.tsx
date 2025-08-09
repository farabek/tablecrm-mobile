import { useState } from 'react';
import { useSaleStore } from '../store/useSaleStore';
import { makeApi } from '../api/tablecrm';

export default function PhoneLookup() {
  const token = useSaleStore((s) => s.token)!;
  const setClient = useSaleStore((s) => s.setClient);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any[]>([]);

  const search = async () => {
    if (!phone) return;
    setLoading(true);
    setError(null);
    try {
      const api = makeApi(token);
      const { data } = await api.findClientByPhone(phone);
      setResult(data?.items ?? data ?? []);
    } catch (e: any) {
      setError('Не удалось найти клиента');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-3">
      <div className="font-medium">Телефон клиента</div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border px-3 py-2"
          placeholder="+7 900 000-00-00"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          className="rounded bg-gray-900 text-white px-4"
          onClick={search}
          disabled={loading}
        >
          Найти
        </button>
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="space-y-2">
        {result.map((c: any) => (
          <button
            key={c.id}
            className="w-full text-left p-3 border rounded active:bg-gray-50"
            onClick={() =>
              setClient({ id: String(c.id), phone: c.phone, name: c.name })
            }
          >
            <div className="font-medium">{c.name ?? 'Клиент'}</div>
            <div className="text-xs text-gray-500">{c.phone}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
