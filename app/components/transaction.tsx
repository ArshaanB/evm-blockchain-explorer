"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";

interface Props {
  addressId: string;
  blockchain: string;
}

interface Transaction {
  from: string;
  to: string;
  value: string;
  hash: string;
  amount: string;
  timeStamp: number;
}

export const TransactionList = ({
  addressId,
  blockchain = "Ethereum"
}: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      let url = `https://api.etherscan.io/api?module=account&action=txlist&address=${addressId}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
      if (blockchain === "Polygon") {
        url = `https://api.polygonscan.com/api?module=account&action=txlist&address=${addressId}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc&apikey=${process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setTransactions(data.result);
    };

    fetchTransactions();
  }, [addressId, blockchain]);

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
            <span className="mb-0 font-bold">Amount:</span>{" "}
            {ethers.formatEther(transaction.value)}{" "}
            {blockchain === "Ethereum" ? "ETH" : "MATIC"}
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
            <Link href={`/transactionDetails/${transaction.hash}`}>
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
