export default function Page({ params }: { params: { addressId: string } }) {
  return <h1>{params.addressId}</h1>;
}
