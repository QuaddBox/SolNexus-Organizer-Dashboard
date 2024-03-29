import React, { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FileButton } from "@mantine/core";
import { LuAsterisk } from "react-icons/lu";
import { DashboardHeader } from "../../components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEventVal } from "../../validation/addOrganizerVal";

const AddOrganizerProfile = () => {
  const [file, setFile] = useState(null);
  const [fileDataUrl, setFileDataUrl] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addEventVal),
  });

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataUrl(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);
  const submitData = (data, e) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <div className="">
      <DashboardHeader />
      <form action="" method="post" onSubmit={handleSubmit(submitData)}>
        <div className="w-11/12 lg:w-2/3 mx-auto py-4 flex flex-col gap-8">
          <header>
            <Link
              to={"/organizations/home"}
              className="text-primary-color flex items-center"
            >
              <IoChevronBack /> Back Home{" "}
            </Link>
            <h1 className="text-3xl font-bold mt-2">Add Organizer Profile</h1>
          </header>
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-xl">Organizer profile image</h2>
            <p className="text-text-color">
              This is the first image attendees will see at the top of your
              profile. Use a high quality square image.
            </p>
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => (
                <button
                  type="button"
                  {...props}
                  className="bg-[#dddddd6a] flex items-center justify-center h-56 rounded-md mt-3"
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
                {...register("organizerName")}
              />
              {errors.organizerName?.message && (
                <p className="text-sm font-medium text-error-color">
                  {errors.organizerName.message}
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
              />
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
                {...register("organizerBio")}
              ></textarea>
              {errors.organizerBio?.message && (
                <p className="text-sm font-medium text-error-color">
                  {errors.organizerBio.message}
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
  );
};

export default AddOrganizerProfile;
