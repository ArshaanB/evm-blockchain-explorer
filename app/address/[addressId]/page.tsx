"use client";

import { TransactionList } from "../../components/transaction";
import { useState } from "react";

export default function Page({ params }: { params: { addressId: string } }) {
  const [blockchain, setBlockchain] = useState("Ethereum");

  return (
    <div className="flex min-h-screen flex-col items-center  p-24">
      <h1 className="text-4xl text-center font-bold text-gray-800">
        Viewing transactions for address
        <pre className="text-gray-600">{params.addressId}</pre>
        on&nbsp;
        <div className="relative inline-flex">
          <select
            value={blockchain}
            onChange={(e) => setBlockchain(e.target.value)}
            className="border border-gray-300 rounded text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
            style={{
              background:
                "url(\"data:image/svg+xml;utf8,<svg fill='%23333' viewBox='0 0 140 140' width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M35 55l35 35 35-35z'/></svg>\") no-repeat",
              backgroundPosition: "right -0.5rem center",
              backgroundSize: "1.5em"
            }}
          >
            <option value="Ethereum">Ethereum</option>
            <option value="Polygon">Polygon</option>
          </select>
        </div>
      </h1>
      <div className="mt-2"></div>
      <div className="mt-6">
        <TransactionList addressId={params.addressId} blockchain={blockchain} />
      </div>
    </div>
  );
}
