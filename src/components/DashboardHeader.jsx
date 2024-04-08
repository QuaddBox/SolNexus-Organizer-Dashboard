import { useContext } from "react";
import Logo from "./Logo";
import MenuDrawer from "./MenuDrawer";
import UserButton from "./UserButton";
import { AuthContext } from "../contexts/AuthContext";

const DashboardHeader = () => {
  const { addWalletAddress, walletAddress, setUser } = useContext(AuthContext);
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
  return (
    <header className="dashboard__header">
      <Logo />
      <div>
        <MenuDrawer />
        {walletAddress ? (
          <UserButton />
        ) : (
          <button
            onClick={connectWallet}
            className="text-white font-medium bg-[#670c8b] py-[6px] px-4 rounded-[20px] 
            flex justify-center items-center"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
