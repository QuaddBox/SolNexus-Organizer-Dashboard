/* eslint-disable no-unused-vars */
/** @format */

import idl from "../../utils/idl.json"
import { AnchorProvider, Program, setProvider, } from "@coral-xyz/anchor"
import { useDisclosure } from "@mantine/hooks";


import {useContext, useState } from "react";
import {
	useAnchorWallet,
	useConnection,
	useWallet,
  } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { CustomWalletContext } from "../contexts/WalletContext.jsx";

function useData(){
    // const anchorWallet = useAnchorWallet();
const { connection } = useConnection();

function setWalletProvider(keypair){
	const wallet =  ""
	const provider = new AnchorProvider(connection,wallet,{})
	setProvider(provider)
	console.log(provider)
}

const programId = new PublicKey("AtyoiYTYnCx9DKrvkjQHBkQ8xaScgKQrq3395LfdEex3")
const program = new Program(idl,programId)

// const createAccount_deprecated = async () => {
// 	try {
// 		const provider = getProvider();
// 		const program = new anchor.Program(idl, programID, provider);

// 		let tx = await program.rpc.initialize(
// 			{name: "Godrice",
// 			test: "null",
// 			avatar: "null",
// 			email: "godriceonuwa@gmail.com",
// 			password: "GodriceEichie",
// 			date: "today",},
// 			{

// 				accounts: {
// 					authority: myAccount.publicKey.toString(),
// 					userProfile: provider.wallet.publicKey,
// 					systemProgram: SystemProgram.programId,
// 				},
// 				signers: [myAccount],
// 			},
// 		);
// 		console.log(
// 			"Created a new account with address",
// 			myAccount.publicKey.toString(),
// 		);
// 	} catch (error) {
// 		console.log("Error creating account: ", error);
// 	}
// };

// const { SystemProgram, Keypair } = anchor.web3;

// let myAccount = Keypair.generate();

// const programID = new PublicKey(import.meta.env.VITE_APP_PROGRAM_ID);
// console.log(programID, "program ID set correctly");

// const network = clusterApiUrl("devnet");

// const opts = {
// 	preflightCommitment: "processed",
// };

// const getProvider = () => {
// 	const connection = new Connection(network, opts.preflightCommitment);
// 	const provider = new anchor.AnchorProvider(
// 		connection,
// 		window.solana,
// 		opts.preflightCommitment,
// 	);
// 	console.log(provider, "provider set correctly");
// 	return provider;
// };

//  const Retrieve = async () => {
//   const provider = getProvider()
//   const program = new anchor.Program(idl, programID, provider)
//   const account = await program.account.userProfile.fetch()
//  }

// const program = useMemo(() => {
// 	if (anchorWallet) {
// 		const provider = new anchor.AnchorProvider(
// 			connection,
// 			anchorWallet,
// 			anchor.AnchorProvider.defaultOptions()
// 		);

// 		return new anchor.Program(
// 			idl,
// 			SOLNEXUS_PROGRAM_KEY,
// 			provider
// 		);
// 	}
// }, [connection, anchorWallet]);


const createAccount = async (pubKey) => {
	// if (program && publicKey) {
		const res =  await program.methods.initialize(
						{
							name: "Godrice",
							test: "null",
							avatar: "null",
							email: "godriceonuwa@gmail.com",
							password: "GodriceEichie",
							date: "today",
						}
					)
			.accounts({
				accounts:{
                    authority : pubKey,
                    userProfile : pubKey,
                    systemProgram : programId,
                }
			})
			.rpc();
			console.log(res)
};
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [walletAddress, setWalletAdresss] = useState("");
	const [isOpened, setIsOpened] = useState(false);

	const showModal = () => {
		setModal((modal) => !modal);
	};

	// useEffect(() => {
	//   const onLoad = () => {
	//     checkIfWalletConnected();
	//   };
	//   window.addEventListener("load", onLoad);
	//   return () => window.removeEventListener("load", onLoad);
	// }, []);

	const [opened, { open, close }] = useDisclosure(false);
	const [opened2, { open2, close2 }] = useDisclosure(false);

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

}

export default function useConnectWallet(){
    const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const {walletAddress,addWalletAddress} = useContext(CustomWalletContext)
	const [isOpened, setIsOpened] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const { connection } = useConnection();

    const getProvider = () => {
        const provider = new AnchorProvider(
            connection,
            window.solana,
            {}
        );
        return provider;
    };

    const provider = getProvider()
    const programId = new PublicKey("AtyoiYTYnCx9DKrvkjQHBkQ8xaScgKQrq3395LfdEex3")
    const program = new Program(idl,programId,provider)

    const createAccount = async(pubKey)=>{
        const res =  await program.methods.initialize()
            .accounts({
                authority : provider.wallet,
                userProfile : pubKey,
                systemProgram : programId,
            })
            .rpc();
        console.log(res)
    }
    const connectWallet = async () => {
		const { solana } = window;
		try {
			setLoading(true);
			// const [profilePda, profileBump ] = findProgramAddressSync(
			// 				[utf8.encode("USER_STATE"), publicKey.toBuffer()],
			// 				program.programId
			// 			);
			if (solana) {
				const response = await solana.connect();
				const pubKey = response.publicKey.toString()
                // await createAccount(pubKey)
                addWalletAddress(response.publicKey.toString());
				close();
			} else {
				alert("Please Install Solana's Phantom Wallet");
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

    const disconnectWallet = async () => {
		const { solana } = window;
		try {
			setLoading(true);
			if (solana) {
				await solana.disconnect();
				addWalletAddress("");
			} else {
				alert("Please Install Solana's Phantom Wallet");
			}
		} catch (err) {
			console.log(err);
            alert("Sorry could not connect to wallett try again later")
		} finally {
			setLoading(false);
		}
	};

    return {
        modal,
        loading,
        walletAddress,
        isOpened,
        disconnectWallet,
        connectWallet,
        opened,
        open,
        setIsOpened,
        showModal: () => {
            setModal((modal) => !modal);
        }
    }
}