import React, { useContext, useEffect, useState } from "react";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import { getTransactionSender } from "../utils/transactionHistory";
import { ethers } from "ethers";

const TransactionsCard = ({ to, from, value, hash }) => {


  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3" onClick={() => {
        window.open("https://sepolia.etherscan.io/tx/" + hash, "_blank")
      }}>
        <div className="display-flex justify-start w-full mb-6 p-2">
          <p className="text-white text-base">From: {shortenAddress(from)}</p>
          <p className="text-white text-base">To: {shortenAddress(to)}</p>
          <p className="text-white text-base">Amount: {value} ETH</p>
        </div>

      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  const [tx, setTx] = useState([]);


  useEffect(() => {
    const address = localStorage.getItem('address');
    getTransactionSender(address).then((response) => {
      console.log(response)
      setTx(response)
    });
  }, [])

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...tx].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
