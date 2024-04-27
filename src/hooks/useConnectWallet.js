/* eslint-disable no-unused-vars */
/** @format */

import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import Accounts from "../../services/Accounts.js";
import Solflare from "@solflare-wallet/sdk";

const checkIfWalletConnected = async () => {
  const { solana } = window;
  try {
    setLoading(true);
    if (solana) {
      if (solana.isPhantom) {
        console.log("phatom is connected");
        const response = await solana.connect({
          onlyIfTrusted: true, //second time if anyone connected it won't show anypop on screen
        });
        setWalletAdresss(response.publicKey.toString());
        console.log("public key", response.publicKey.toString());
        // await createAccount();
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

export default function useConnectWallet() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const {
    opened,
    open,
    close,
    addWalletAddress,
    walletAddress,
    user,
    setUser,
  } = useContext(AuthContext);

  const getProvider = () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (!provider.isPhantom) {
        alert("Please Install Solana's Phantom Wallet");
        throw new Error("Please Install Solana's Phantom Wallet");
      }
      return provider;
    }
  };

  const connectToPhantomWallet = async () => {
    try {
      setLoading(true);
      const provider = getProvider();
      const response = await provider.connect();
      const pubKey = response.publicKey.toString();
      const res = await Accounts.findUser(pubKey);
      // console.log(res)
      const isExisting = res.status === "success";
      addWalletAddress(pubKey);
      localStorage.setItem("wallet", "Phantom");
      if (isExisting) {
        close();
      } else {
        close();
        setIsOpened(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const connectToSolflareWallet = async () => {
    setLoading(true);
    const wallet = new Solflare();
    await wallet.connect();
    const pubKey = wallet.publicKey?.toString();
    console.log(wallet.isConnected);

    wallet.on("connect", () => {
      console.log("connected", pubKey);
    });

    const response = await Accounts.findUser(pubKey);
    // console.log(res)
    const isExisting = response.status === "success";
    addWalletAddress(pubKey);
    localStorage.setItem("wallet", "Solflare");
    if (isExisting) {
      close();
	  console.log(response)
    //   addAccount(pubKey);
    } else {
      close();
      setIsOpened(true);
    }
    setLoading(false);
  };

  const addAccount = async (pubKey) => {
    const res = await Accounts.addAccount(
      {
        name,
        test: "null",
        avatar: "null",
        email,
        pubKey,
        date: new Date().toString(),
      },
      pubKey
    );
    console.log(res);
    if (res.status !== "success") {
      alert(
        "Sorry could not connect to servers at the moment please try again another time"
      );
      throw new Error(res.errror_message);
    }
    addWalletAddress(pubKey);
    setUser({
      name,
      test: "null",
      avatar: "null",
      email,
      pubKey,
      date: "DateTime.now().toString()",
    });
  };

  const disconnectWallet = async () => {
    try {
      setLoading(true);
      const provider = getProvider();
      await provider.disconnect();
      addWalletAddress("");
	  setUser(null)
    } catch (err) {
      console.log(err);
      alert("Sorry could not connect to wallet try again later");
    } finally {
      setLoading(false);
    }
  };

  return {
    modal,
    loading,
    setLoading,
    walletAddress,
    isOpened,
    disconnectWallet,
    opened,
    open,
    close,
    setIsOpened,
    connectToPhantomWallet,
    connectToSolflareWallet,
    email,
    setEmail,
    name,
    setName,
	addAccount,
    showModal: () => {
      setModal((modal) => !modal);
    },
  };
}
