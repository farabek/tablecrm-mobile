import TokenGate from './components/TokenGate';
import PhoneLookup from './components/PhoneLookup';
import SelectOrg from './components/SelectOrg';
import SelectWarehouse from './components/SelectWarehouse';
import SelectPriceType from './components/SelectPriceType';
import SelectAccount from './components/SelectAccount';
import ProductPicker from './components/ProductPicker';
import Cart from './components/Cart';
import SubmitBar from './components/SubmitBar';
import { useSaleStore } from './store/useSaleStore';

export default function App() {
  const token = useSaleStore((s) => s.token);

  return (
    <main className="mx-auto max-w-[480px] min-h-screen bg-white">
      <TokenGate />
      {token && (
        <>
          <PhoneLookup />
          <SelectOrg />
          <SelectWarehouse />
          <SelectPriceType />
          <SelectAccount />
          <ProductPicker />
          <Cart />
          <div className="h-20" />
          <SubmitBar />
        </>
      )}
    </main>
  );
}
