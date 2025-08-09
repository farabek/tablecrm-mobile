import { useEffect, useState } from 'react';
import { useSaleStore } from '../store/useSaleStore';
import { makeApi } from '../api/tablecrm';
import type { Organization } from '../entities/tablecrm.types';
import { asList } from '../utils/normalize';

export default function SelectOrg() {
  const token = useSaleStore((s) => s.token)!;
  const orgId = useSaleStore((s) => s.orgId);
  const setOrg = useSaleStore((s) => s.setOrg);

  const [items, setItems] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const { data } = await makeApi(token).getOrganizations();
        setItems(asList<Organization>(data));
      } catch {
        setErr('Не удалось загрузить организации');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <div className="p-4 space-y-2">
      <div className="font-medium">Организация</div>
      <select
        className="w-full rounded border px-3 py-2 disabled:opacity-60"
        value={orgId ?? ''}
        onChange={(e) => setOrg(e.target.value)}
        disabled={loading || !!err}
      >
        <option value="" disabled>
          Выберите организацию
        </option>
        {items.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
      {loading && <div className="text-sm text-gray-500">Загрузка…</div>}
      {err && <div className="text-sm text-red-600">{err}</div>}
    </div>
  );
}
