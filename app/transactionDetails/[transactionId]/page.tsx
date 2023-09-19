export default function Page({
  params
}: {
  params: { transactionId: string };
}) {
  return (
    <div className="flex min-h-screen flex-col items-center  p-24">
      <h1 className="text-4xl text-center font-bold text-gray-800">
        Viewing transaction details for hash
        <pre className="text-gray-600">{params.transactionId}</pre>
      </h1>
    </div>
  );
}
