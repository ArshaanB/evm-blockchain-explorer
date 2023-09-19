"use client";

import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { ethers } from "ethers";

import { BlockchainContext } from "../context/BlockchainContext";

interface TransactionListProps {
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

export const TransactionList = ({ addressId }: TransactionListProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { blockchain, setBlockchain } = useContext(BlockchainContext);

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

interface TransactionDetailProps {
  transactionId: string;
}

interface TransactionDetail {
  from: string;
  to: string;
  value: string;
  hash: string;
  amount: string;
  blockNumber: number;
  isConfirmed: boolean;
  gas: string;
  gasPrice: string;
}

interface TransactionReceipt {
  gasUsed: string;
  status: string;
}

async function getBlockTimestamp(blockNumberHex: string, blockchain: string) {
  let url = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumberHex}&boolean=true&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
  if (blockchain === "Polygon") {
    url = `https://api.polygonscan.com/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumberHex}&boolean=true&apikey=${process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  const timestamp = parseInt(data.result?.timestamp, 16);
  const date = new Date(timestamp * 1000);
  return date;
}

function getTransactionFee(gasUsed: string, gasPrice: string) {
  const gasUsedBigInt = BigInt(gasUsed);
  const gasPriceBigInt = BigInt(gasPrice);

  const transactionFeeWei = gasUsedBigInt * gasPriceBigInt;
  const transactionFeeEther = ethers.formatEther(transactionFeeWei);

  return transactionFeeEther;
}

export const TransactionDetail = ({
  transactionId
}: TransactionDetailProps) => {
  const [transactionDetail, setTransactionDetail] =
    useState<TransactionDetail | null>(null);
  const [transactionReceipt, setTransactionReceipt] =
    useState<TransactionReceipt | null>(null);
  const [blockTimestamp, setBlockTimestamp] = useState<Date | null>(null);
  const { blockchain } = useContext(BlockchainContext);
  const [confirmationStatus, setConfirmationStatus] = useState<string>("");

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      let url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${transactionId}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
      let urlForReceipt = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${transactionId}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
      if (blockchain === "Polygon") {
        url = `https://api.polygonscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${transactionId}&apikey=${process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY}`;
        urlForReceipt = `https://api.polygonscan.com/api?module=proxy&action=eth_getTransactionReceipt&txhash=${transactionId}&apikey=${process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      const responseForReceipt = await fetch(urlForReceipt);
      const dataForReceipt = await responseForReceipt.json();

      // Check if the transaction is pending
      if (data.result.blockNumber === null) {
        setConfirmationStatus("Loading");
      } else {
        parseInt(dataForReceipt.result.status, 16) === 1
          ? setConfirmationStatus("Successful")
          : setConfirmationStatus("Failed");
      }

      setTransactionDetail(data.result);
      setTransactionReceipt(dataForReceipt.result);

      // Fetch block timestamp
      const date = await getBlockTimestamp(data.result.blockNumber, blockchain);
      setBlockTimestamp(date);
    };

    fetchTransactionDetail();
  }, [transactionId, blockchain]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 p-5 rounded-lg w-full overflow-auto">
      {transactionDetail && (
        <div
          key={transactionDetail.hash}
          className="bg-white p-2 my-2 rounded-md shadow-md w-full overflow-auto"
        >
          <p>
            <span className="mb-0 font-bold">From:</span>{" "}
            {transactionDetail.from}
          </p>
          <p>
            <span className="mb-0 font-bold">To:</span> {transactionDetail.to}
          </p>
          <p>
            <span className="mb-0 font-bold">Amount:</span>{" "}
            {parseFloat(ethers.formatEther(transactionDetail.value)).toFixed(2)}{" "}
            {blockchain === "Ethereum" ? "ETH" : "MATIC"}
          </p>
          <p>
            <span className="mb-0 font-bold">Transaction Hash:</span>{" "}
            {transactionDetail.hash}
          </p>
          {confirmationStatus !== "Loading" && (
            <p>
              <span className="mb-0 font-bold">Date:</span>{" "}
              {blockTimestamp?.toLocaleString()}
            </p>
          )}
          <p>
            <span className="mb-0 font-bold">Confirmation Status:</span>{" "}
            {confirmationStatus}
          </p>
          {confirmationStatus !== "Loading" && (
            <p>
              <span className="mb-0 font-bold">Transaction Fee:</span>{" "}
              {getTransactionFee(
                transactionReceipt.gasUsed,
                transactionDetail.gasPrice
              )}{" "}
              {blockchain === "Ethereum" ? "ETH" : "MATIC"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
