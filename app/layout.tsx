"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { useState } from "react";

import { BlockchainContext } from "./context/BlockchainContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [blockchain, setBlockchain] = useState("Ethereum");

  return (
    <BlockchainContext.Provider value={{ blockchain, setBlockchain }}>
      <html lang="en">
        <head>
          <title>Frontend Blockchain Assessment</title>
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </BlockchainContext.Provider>
  );
}
