import React, { useEffect, useState } from "react"
import {
  helloWorldContract,
  loadCurrentMessage,
  connectWallet,
  getCurrentWalletConnected,
  updateMessage
} from "../api/interact";

import logo from "../images/logo.svg"


const MainCard = () => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("No connection to the network.");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    async function fetchMessage() {
      const message = await loadCurrentMessage();
      setMessage(message);
    }

    fetchMessage();
    addSmartContractListener();

    async function fetchWallet() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
    }
    fetchWallet();
    addWalletListener();
  }, []);

  function addSmartContractListener() {
    helloWorldContract.events.UpdatedMessages({}, (error, data) => {
      if (error) {
        setStatus("😥 " + error.message);
      } else {
        setMessage(data.returnValues[1]);
        setNewMessage("");
        setStatus("🎉 Your message has been updated!");
      }
    })
  }

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  }

  const onUpdatePressed = async () => {
    const { status } = await updateMessage(walletAddress, newMessage);
    setStatus(status);
  }

  return (
    <div className="flex h-screen">
      <div className="sm:border-white m-auto w-full  lg:max-w-[40%] md:max-w-[90%] min-h-[140px] p-[32px] md:border-gray-200 md:border-dashed md:border-4 p-6 rounded-lg">
        <div className="flex flex-col">
          <div className="w-full">
            <img className="md:float-none lg:float-left mt-[-20px] ml-[-18px] w-[210px]" src={logo} />
            <button
              className="sm:float-none md:float-none lg:float-right border-2 font-medium border-blue-600 text-blue-600 px-10 py-2 rounded-lg"
              onClick={connectWalletPressed}
            >
              {walletAddress.length > 0 ? (
                `Connected ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`
              ) : (
                "Connect Wallet"
              )}
            </button>
          </div>

          <div className="mt-12">
            <h1
              className="text-2xl mb-3"
            >
              Current Message:
            </h1>
            <p>{message}</p>
          </div>

          <div className="mt-14">
            <h1
              className="text-2xl mb-3"
            >
              New Message:
            </h1>
            <input
              type="text"
              className="border-b-[2px] outline-0 w-[100%]"
              placeholder="Update the message in the smart contract"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
          </div>

          {status && (
            <span className="text-xs mt-8 font-semibold text-blue-600">
              {status}
            </span>
          )}

          <button
            className="mt-20 w-max font-medium border border-blue-600 bg-blue-600 text-white px-16 py-2 rounded-lg"
            onClick={onUpdatePressed}
          >
            Update
          </button>
        </div>
      </div>
    </div>

  )
}

export default MainCard
