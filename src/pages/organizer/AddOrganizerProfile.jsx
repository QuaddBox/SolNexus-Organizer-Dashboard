import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FileButton, Loader, LoadingOverlay } from "@mantine/core";
import { LuAsterisk } from "react-icons/lu";
import { DashboardHeader } from "../../components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEventVal } from "../../validation/addOrganizerVal";
import { uploadFile } from "../../../services/FirebaseService";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Accounts from "../../../services/Accounts";
import { useEffect } from "react";


const AddOrganizerProfile = () => {
  const [banner,setOrganizerBanner] = useState(null)
  const [fileDataUrl, setFileDataUrl] = useState(null);
  const [isSubmitting,setIsSubmitting] = useState(false)
  const {user,walletAddress,loadingConnection} = useContext(AuthContext)
  const [isUploading,setIsUploading] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(addEventVal),
  });

  async function uploadImage(file){
    console.log(file)
    let fileReader, isCancel = false
    if(file){
      fileReader = new FileReader()
      fileReader.onload = async(e) => {
        const { result } = e.target
        if(result && !isCancel){
          setIsUploading(true)
          const res = await uploadFile(file,file.name)
          setIsUploading(false)
          console.log(res)
          if(res.status === "success"){
            setFileDataUrl(result)
            setOrganizerBanner(res.data)
          }else{
            alert(res.errror_message)
          }
        }
      }
      fileReader.readAsDataURL(file)
    }
  }

  const submitData = async(data, e) => {
    e.preventDefault();
    if(banner){
      setIsSubmitting(true)
      const res = await Accounts.addOrganizerProfile({
        ...user,
        organiserProfile:{
          ...data,
          website:"",
          banner
        }
      },walletAddress)
      setIsSubmitting(false)
      if(res.status === "success"){
        alert("You have successfully updated your organisation profile")
          window.location.assign("/organizations/profile")
      }else{
        alert(res.errror_message)
      }
    }else{
      alert("Please upload your organizer banner")
    }
  };

  useEffect(()=>{
    if(user && user.organiserProfile){
      const {organiserProfile} = user
      setOrganizerBanner(organiserProfile.banner)
      setFileDataUrl(organiserProfile.banner)
      setValue("name",organiserProfile.name)
      setValue("website",organiserProfile.website)
      setValue("bio",organiserProfile.bio)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user,loadingConnection])
  return (
    <div className="">
       <LoadingOverlay pos={"fixed"} visible={isSubmitting} zIndex={1000} overlayProps={{ radius: "sm", blur: 2,color:"#000" }}/>
      <DashboardHeader />
      <div className="">
      <form action="" className="flex-3" method="post" onSubmit={handleSubmit(submitData)}>
        <div className="w-11/12 lg:w-2/3 mx-auto py-4 flex flex-col gap-8">
          <header>
            <Link
              to={"/organizations/home"}
              className="text-primary-color flex items-center"
            >
              <IoChevronBack /> Back Home{" "}
            </Link>
            <h1 className="text-3xl font-bold mt-2">{user?user.organiserProfile?"Update":"Add":"Add"} Organizer Profile</h1>
          </header>
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-xl">Organizer profile image</h2>
            <p className="text-text-color">
              This is the first image attendees will see at the top of your
              profile. Use a high quality square image.
            </p>
            {isUploading?
            (<div className="bg-[#333333] flex items-center justify-center h-56 rounded-md mt-3">
              <div className="text-center">
                <Loader color="purple"/>
                <p>Uploading Image</p>
              </div>
            </div>
            )
            :(
              <FileButton disabled={isUploading} onChange={uploadImage} accept="image/png,image/jpeg">
              {(props) => (
                  <button
                  type="button"
                  {...props}
                  className="bg-[#dddddd6a] relative flex items-center justify-center h-56 rounded-md mt-3"
                >
                  {fileDataUrl ? (
                    <img src={fileDataUrl} alt="" className="w-full h-full" />
                  ) : (
                    <>
                      <FaImage size={40} />
                      <p className="font-medium ml-2">
                        Click to add profile image
                      </p>
                    </>
                  )}
                </button>
              )}
            </FileButton>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-xl">About the organizer</h2>
            <p className="text-text-color">
              Let attendees know who is hosting events.
            </p>
            <div className="mt-2">
              <label htmlFor="" className="flex items-center gap-1">
                Organizer name <LuAsterisk size={10} color="red" />
              </label>
              <input
                type="text"
                placeholder="e.g Solnexus"
                className="bg-inherit border border-text-color rounded-md py-2 px-3 w-full "
                {...register("name")}
              />
              {errors.name?.message && (
                <p className="text-sm font-medium text-error-color">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label htmlFor="" className="flex items-center gap-1">
                Your website
              </label>
              <input
                type="text"
                placeholder="e.g http://solnexus.com"
                className="bg-inherit border border-text-color rounded-md py-2 px-3 w-full "
                {...register("website")}
              />
              {errors.website?.message && (
                <p className="text-sm font-medium text-error-color">
                  {errors.website.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-xl">Organizer Bio</h2>
            <p className="text-text-color">
              Describe who you are, the types of events you host, or your
              mission. The bio is displayed on your organizer profile.
            </p>
            <div className="mt-2 flex flex-col gap-2">
              <textarea
                cols="10"
                rows="5"
                type="text"
                placeholder="e.g Solnexus"
                className="bg-inherit border border-text-color rounded-md py-2 px-3 w-full "
                {...register("bio")}
              ></textarea>
              {errors.bio?.message && (
                <p className="text-sm font-medium text-error-color">
                  {errors.bio.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <footer className="bg-black py-3 px-7 mt-10 sticky bottom-0 flex items-center justify-end gap-3 border-t border-t-[#141414]">
          <button className="border border-primary-color w-fit px-3 py-2 rounded-md text-primary-color">
            Discard
          </button>
          <button type="submit" className="border-none w-fit bg-primary-color px-3 py-2 rounded-md">
            Submit
          </button>
        </footer>
      </form>
      </div>
    </div>
  );
};

export default AddOrganizerProfile;
