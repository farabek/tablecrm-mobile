import { useEffect, useState } from 'react';
import { useSaleStore } from '../store/useSaleStore';
import { makeApi } from '../api/tablecrm';

export default function SelectOrg() {
  const token = useSaleStore((s) => s.token)!;
  const orgId = useSaleStore((s) => s.orgId);
  const setOrg = useSaleStore((s) => s.setOrg);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await makeApi(token).getOrganizations();
      setItems(data?.items ?? data ?? []);
    })();
  }, [token]);

  return (
    <div className="p-4 space-y-2">
      <div className="font-medium">Организация</div>
      <select
        className="w-full rounded border px-3 py-2"
        value={orgId ?? ''}
        onChange={(e) => setOrg(e.target.value)}
      >
        <option value="" disabled>
          Выберите организацию
        </option>
        {items.map((o: any) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
}
