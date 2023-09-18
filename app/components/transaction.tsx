"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";

interface Props {
  addressId: string;
}

interface Transaction {
  from: string;
  to: string;
  value: string;
  hash: string;
  amount: string;
  timeStamp: number;
}

export const TransactionList = ({ addressId }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${addressId}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
      );
      const data = await response.json();
      setTransactions(data.result);
    };

    fetchTransactions();
  }, [addressId]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 p-5 rounded-lg w-full overflow-auto">
      {transactions.map((transaction) => (
        <div
          key={transaction.hash}
          className="bg-white p-2 my-2 rounded-md shadow-md w-full overflow-auto"
        >
          <p>
            <span className="mb-0 font-bold">From:</span> {transaction.from}
          </p>
          <p>
            <span className="mb-0 font-bold">To:</span> {transaction.to}
          </p>
          <p>
            <span className="mb-0 font-bold">Value:</span>{" "}
            {ethers.formatEther(transaction.value)} ETH
          </p>
          <p>
            <span className="mb-0 font-bold">Transaction Hash:</span>{" "}
            {transaction.hash}
          </p>
          <p>
            <span className="mb-0 font-bold">Timestamp:</span>{" "}
            {new Date(transaction.timeStamp * 1000).toLocaleString()}
          </p>
          <p>
            <Link
              href={`https://etherscan.io/tx/${transaction.hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mb-0 font-bold bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded">
                See More Details
              </button>
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
};
