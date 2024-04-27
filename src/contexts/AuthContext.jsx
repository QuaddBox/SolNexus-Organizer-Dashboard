/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import AccountService from "../../services/Accounts";
import { useDisclosure } from "@mantine/hooks";

export const AuthContext = createContext({
  walletAddress: null,
  loadingConnection: true,
  addWalletAddress: (address) => {
    console.log(address);
  },
  user: null,
  setUser: () => null,
});

export default function AuthContextProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const addWalletAddress = (value) => {
    setWalletAddress(value);
  };

  const connectWallet = async () => {
    try {
      // setLoading(true);
      if (solana) {
        if (solana.isPhantom) {
          console.log("phantom is connected");
          const response = await solana.connect();
          const res = await AccountService.findUser(
            response.publicKey.toString()
          );
          console.log(res);
          addWalletAddress(response.publicKey.toString());
          setUser(res.data);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkIfWalletConnected = async () => {
      const { solana } = window;
      try {
        // setLoading(true);
        if (solana) {
          if (solana.isPhantom) {
            console.log("phantom is connected");
            const response = await solana.connect({
              onlyIfTrusted: true, //second time if anyone connected it won't show anypop on screen
            });
            const res = await AccountService.findUser(
              response.publicKey.toString()
            );
            console.log(res);
            addWalletAddress(response.publicKey.toString());
            setUser(res.data);
            // if (res.status !== "success") {
            //   window.location.assign(
            //     "https://sol-nexus-organizer.vercel.app/organizations/home"
            //   );
            // } else {
            //   addWalletAddress(response.publicKey.toString());
            //   setUser(res.data);
            //   // console.log(res.data)
            //   //  console.log("public key", response.publicKey.toString());
            // }
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    // checkIfWalletConnected();
    if (walletAddress == "" || null) {
      open()
    }
  }, []);

  useEffect(() => {
    const checkWalletAddress = async () => {
      if (walletAddress) {
        const res = await AccountService.findUser(walletAddress);
        console.log(res);
        setUser(res.data);
      }
    };
    checkWalletAddress();
  }, [walletAddress]);

  return (
    <AuthContext.Provider
      value={{
        walletAddress,
        addWalletAddress,
        loadingConnection: loading,
        user,
        setUser,
        opened,
        open,
        close
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
