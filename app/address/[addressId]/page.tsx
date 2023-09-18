import { TransactionList } from "../../components/transaction";

export default function Page({ params }: { params: { addressId: string } }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <TransactionList addressId={params.addressId} />
    </div>
  );
}
