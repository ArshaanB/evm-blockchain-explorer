import Link from "next/link";

export default function AddressPage() {
  const defaultAddress = "0x53b603BE58cae7e614394c429f0616b9Fed107Be";

  return (
    <div>
      <head>
        <meta
          http-equiv="refresh"
          content={`0;url=/address/${defaultAddress}`}
        />
      </head>
      Redirecting... If you are not redirected,
      <Link href={`/address/${defaultAddress}`}>click here</Link>.
    </div>
  );
}
