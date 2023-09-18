"use client";

import { useEffect, useState } from "react";

interface Props {
  addressId: string;
}

interface Transaction {
  from: string;
  to: string;
  value: string;
  hash: string;
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
    <div>
      {transactions.map((transaction, index) => (
        <div key={transaction.hash}>
          <p>From: {transaction.from}</p>
          <p>To: {transaction.to}</p>
          <p>Value: {transaction.value}</p>
          <p>Transaction Hash: {transaction.hash}</p>
        </div>
      ))}
    </div>
  );
};
