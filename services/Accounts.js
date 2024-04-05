import FirebaseService from "./FirebaseService";

const firebaseService = new FirebaseService("accounts")

class Accounts{
    async addAccount(data,pubKey){
        return firebaseService.createWithID(data,pubKey)
    }
    async findUser(pubKey){
        return firebaseService.findById(pubKey)
    }
    async addOrganizerProfile(data,pubkey){
        return firebaseService.update(pubkey,data)
    }
}

export default new Accounts()