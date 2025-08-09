import { useState, useCallback } from 'react';
import { useSaleStore } from '../store/useSaleStore';
import { makeApi } from '../api/tablecrm';
import type { Client } from '../entities/tablecrm.types';
import { asList } from '../utils/normalize';
import { normalizePhone } from '../utils/phone';

export default function PhoneLookup() {
  const token = useSaleStore((s) => s.token)!;
  const setClient = useSaleStore((s) => s.setClient);

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Client[]>([]);

  const search = useCallback(async () => {
    const phoneQuery = normalizePhone(phone);
    if (!phoneQuery) return;

    setLoading(true);
    setError(null);
    try {
      const api = makeApi(token);
      const { data } = await api.findClientByPhone(phoneQuery);
      setResult(asList<Client>(data));
    } catch {
      setError('Не удалось найти клиента');
      setResult([]);
    } finally {
      setLoading(false);
    }
  }, [phone, token]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) search();
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
          onKeyDown={onKeyDown}
          inputMode="tel"
          autoComplete="tel"
        />
        <button
          className="rounded bg-gray-900 text-white px-4 disabled:opacity-50"
          onClick={search}
          disabled={loading || !normalizePhone(phone)}
        >
          {loading ? 'Поиск…' : 'Найти'}
        </button>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="space-y-2">
        {result.map((c) => (
          <button
            key={c.id}
            className="w-full text-left p-3 border rounded active:bg-gray-50"
            onClick={() =>
              setClient({
                id: String(c.id),
                phone: c.phone ?? '', // ← подставляем пустую строку, если undefined
                name: c.name,
              })
            }
          >
            <div className="font-medium">{c.name ?? 'Клиент'}</div>
            <div className="text-xs text-gray-500">{c.phone ?? '—'}</div>
          </button>
        ))}
        {!loading && !error && result.length === 0 && normalizePhone(phone) && (
          <div className="text-sm text-gray-500">Ничего не найдено</div>
        )}
      </div>
    </div>
  );
}
