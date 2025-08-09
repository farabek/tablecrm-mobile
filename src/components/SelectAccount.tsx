import { useEffect, useState } from 'react';
import { useSaleStore } from '../store/useSaleStore';
import { makeApi } from '../api/tablecrm';
import type { Account } from '../entities/tablecrm.types';
import { asList } from '../utils/normalize';

export default function SelectAccount() {
  const token = useSaleStore((s) => s.token)!;
  const accountId = useSaleStore((s) => s.accountId);
  const setAccount = useSaleStore((s) => s.setAccount);
  const [items, setItems] = useState<Account[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await makeApi(token).getAccounts();
      // setItems(data?.items ?? data ?? []);
      setItems(asList<Account>(data));
    })();
  }, [token]);

  return (
    <div className="p-4 space-y-2">
      <div className="font-medium">Счёт</div>
      <select
        className="w-full rounded border px-3 py-2"
        value={accountId ?? ''}
        onChange={(e) => setAccount(e.target.value)}
      >
        <option value="" disabled>
          Выберите счёт
        </option>
        {items.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>
    </div>
  );
}
