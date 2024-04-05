import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"
import { useRef } from "react"
import { useEffect } from "react"

export default function OrganizerProfile(){
    const {user,loadingConnection} = useContext(AuthContext)
    const imageRef = useRef(null)
    useEffect(()=>{
        if(user && user.organiserProfile){
            const {organiserProfile} = user
            imageRef.current.src = organiserProfile.banner
        }
    },[user])
    if(loadingConnection){
        return <p>Loading</p>
    }
    if(user && user.organiserProfile){
        
        const {organiserProfile} = user
        console.log(organiserProfile.banner)
        return(
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="h-40 w-40 mx-auto border flex items-center justify-center border-primary-color bg-[#333333] rounded-full">
                  <img ref={imageRef} src={organiserProfile.banner} className="w-40 rounded-full h-40 object-cover" alt="" />
                </div>
                <div className="my-4">
                    <p className="uppercase text-sm">Organizer Name</p>
                    <p className="p-3 rounded-md text-gray-300 font-bold bg-[#141414] border border-gray-800">{organiserProfile.name}</p>
                </div>
                <div className="my-4">
                    <p className="uppercase text-sm">Organizer website</p>
                    <p className="p-3 rounded-md text-gray-300 font-bold bg-[#141414] border border-gray-800">{organiserProfile.website?organiserProfile.website:"N/A"}</p>
                </div> 
                <div className="my-4">
                    <p className="uppercase text-sm">Organizer Bio</p>
                    <p className="p-3 rounded-md text-gray-300 font-bold bg-[#141414] border border-gray-800">{organiserProfile.bio}</p>
                </div>
                <footer className="bg-black py-3 px-7 mt-10 sticky bottom-0 flex items-center justify-end gap-3 border-t border-t-[#141414]">
                    <Link to="/organizations/info/profile">
                        <button type="submit" className="border-none w-fit bg-primary-color px-3 py-2 rounded-md">
                            Update Profile
                        </button>
                    </Link>
                </footer>
            </div>
        )
    }
    return (
        <div className="text-center h-[80vh] flex items-center justify-center">
            <div className="flex-1 max-w-lg">
                <p className="text-3xl font-medium text-white mb-4">You have not added a organization profile details</p>
                <Link to="/organizations/info/profile">
                <button type="submit" className="border-none w-fit text-lg bg-primary-color px-3 py-2 rounded-md">
                    Add Profile
                </button>
                </Link>
            </div>
        </div>
    )
}