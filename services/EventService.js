/* eslint-disable no-unused-vars */
// import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
// import * as anchor from "@project-serum/anchor";
// import idl from "../utils/idl.json";

import FirebaseService from "./FirebaseService"

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

const firebaseService = new FirebaseService("events")
class EventsService{
    async createEvent(data){
        return firebaseService.create(data)
    }
    async getEvents(){
      return await firebaseService.get()
    }
    async getEventsByEmail(email){
      return await firebaseService.find("email",email)
    }
    async getEventsByHost(email){
      return await firebaseService.find("createdBy",email)
    }
    async getEvent(id){
      return await firebaseService.findById(id)
    }
}

export default new EventsService()
