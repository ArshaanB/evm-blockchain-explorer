export default function Page({ params }: { params: { addressId: string } }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Page:
      {params.addressId}
    </div>
  );
}
