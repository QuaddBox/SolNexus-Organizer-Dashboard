import { useContext } from "react";
import Logo from "./Logo";
import MenuDrawer from "./MenuDrawer";
import UserButton from "./UserButton";
import { AuthContext } from "../contexts/AuthContext";
import AccountService from "../../services/Accounts";
import { Loader, Modal, ModalBody } from "@mantine/core";
import phantomIcon from "../assets/images/phantomIcon.svg";
import solflareIcon from "../assets/images/solflare-white-logo.svg";
import useConnectWallet from "../hooks/useConnectWallet";

const DashboardHeader = () => {
  const { addWalletAddress, walletAddress, setUser } = useContext(AuthContext);
  const {
    connectToPhantomWallet,
    connectToSolflareWallet,
    isOpened,
    setIsOpened,
    close,
    open,
    opened,
    email,
    setEmail,
    name,
    setName,
    loading,
    addAccount,
  } = useConnectWallet();
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await connectWallet()
    addAccount(walletAddress);
    setIsOpened(false);
  };
  return (
    <header className="dashboard__header">
      <Logo />
      <Modal
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        title="Register"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        // classNames={{root: ""}}
        styles={{
          header: { backgroundColor: "#07000a" },
          body: { backgroundColor: "#07000a" },
          content: { border: "1px solid white" },
        }}
        centered
      >
        {/* Modal content */}

        <ModalBody>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent border border-gray-400 rounded-md py-1.5 px-2 placeholder:text-sm"
                placeholder="Enter your name"
                type="text"
                name=""
                minLength={3}
                required
                id=""
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border border-gray-400 rounded-md py-1.5 px-2 placeholder:text-sm"
                placeholder="Enter your email"
                type="email"
                name=""
                id=""
                required
              />
            </div>
            <button
              disabled={loading}
              className="bg-[#670c8b] disabled:cursor-not-allowed  mt-3 py-2 rounded-md"
            >
              {loading ? <Loader color="white" size={24} /> : "Connect Wallet"}
            </button>
          </form>
        </ModalBody>
      </Modal>
      <Modal
        opened={opened}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        styles={{
          header: { backgroundColor: "#07000a" },
          body: { backgroundColor: "#07000a" },
          content: { border: "1px solid white" },
        }}
        className={{ root: "bg-transparent" }}
        onClose={close}
        centered
      >
        <ModalBody>
          <h1 className="text-center mb-3 font-semibold text-xl">
            Connect a wallet on Solana to continue
          </h1>

          <button
            onClick={connectToSolflareWallet}
            className="mt-5 bg-[#141414] text-lg w-full px-4 py-3 flex items-center justify-center gap-3 font-medium rounded-lg"
          >
            {loading ? (
              <Loader size={20} color="white" />
            ) : (
              <>
                <img src={solflareIcon} alt="" className="w-9 rounded-md" />
                <p>Solflare Wallet (Recommended)</p>
              </>
            )}
          </button>
          <button
            onClick={connectToPhantomWallet}
            className="bg-[#141414] text-lg mt-5 w-full px-4 py-3 flex items-center justify-center gap-3 font-medium rounded-lg"
          >
            <img src={phantomIcon} alt="" className="w-7 rounded-md" />
            Phantom Wallet
          </button>
        </ModalBody>
      </Modal>
      <div>
        <MenuDrawer />
        {walletAddress ? (
          <UserButton />
        ) : (
          <button
            onClick={open}
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
