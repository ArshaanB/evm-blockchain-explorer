import { TransactionList } from "../../components/transaction";

export default function Page({ params }: { params: { addressId: string } }) {
  return (
    <div className="flex min-h-screen flex-col items-center  p-24">
      <h1 className="text-4xl text-center font-bold text-gray-800">
        Viewing transactions for address:{" "}
        <pre className="text-gray-600">{params.addressId}</pre>
      </h1>
      <div className="mt-6">
        <TransactionList addressId={params.addressId} />
      </div>
    </div>
  );
}
