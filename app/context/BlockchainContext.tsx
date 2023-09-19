"use client";

import { createContext } from "react";

type BlockchainContextType = {
  blockchain: string;
  setBlockchain: (value: string) => void;
};

export const BlockchainContext = createContext<BlockchainContextType>({
  blockchain: "Ethereum",
  setBlockchain: () => {}
});
