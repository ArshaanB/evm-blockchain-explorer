"use client";

import { useContext } from "react";
import Link from "next/link";

import { BlockchainContext } from "../../context/BlockchainContext";
import { TransactionDetail } from "../../components/transaction";

export default function Page({
  params
}: {
  params: { transactionId: string };
}) {
  const { blockchain } = useContext(BlockchainContext);

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl text-center font-bold text-gray-800">
        Viewing transaction details for hash&nbsp;
        <Link
          href={`https://${
            blockchain === "Ethereum" ? "etherscan.io" : "polygonscan.com"
          }/tx/${params.transactionId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600"
        >
          <pre>
            {`${params.transactionId.substring(
              0,
              6
            )}...${params.transactionId.substring(
              params.transactionId.length - 4
            )}`}
          </pre>
        </Link>
        &nbsp;on {blockchain}
      </h1>
      <TransactionDetail transactionId={params.transactionId} />
    </div>
  );
}
