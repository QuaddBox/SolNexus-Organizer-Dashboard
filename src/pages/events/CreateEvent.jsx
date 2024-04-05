/* eslint-disable no-unused-vars */
import {useState,useEffect} from "react";
import EventService from "../../../services/EventService"
import { DashboardHeader } from "../../components";
import "../../assets/styles/createEvent.scss";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { TbCurrencySolana } from "react-icons/tb";

import { DateTimePicker } from "@mantine/dates";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventVal } from "../../validation/createEventVal";
import { APIProvider } from "@vis.gl/react-google-maps";
import { IoMdPin } from "react-icons/io";
import { MdOutlineOnlinePrediction } from "react-icons/md";
import imagePlaceholder from "../../assets/images/event-image-placeholder.jpg";
import { FiUpload } from "react-icons/fi";
import { FileButton } from "@mantine/core";
import idl from '../../../idl.json'
import { Connection, PublicKey } from "@solana/web3.js";
import {web3 } from "@project-serum/anchor"
import {Buffer } from 'buffer'

const {SystemProgram, Keypair } = web3
window.Buffer = Buffer
const programID = new PublicKey(idl.accounts)

const CreateEvent = () => {
  const [eventType, setEventType] = useState("Venue");
  const [file, setFile] = useState(null);
  const [fileDataUrl, setFileDataUrl] = useState(null)
  

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createEventVal),
  });

  const submitData = (data, e) => {
    e.preventDefault()
    console.log(data);
  };

  useEffect(() => {
    let fileReader, isCancel = false
    if(file){
      fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target
        if(result && !isCancel){
          setFileDataUrl(result)
        }
      }
      fileReader.readAsDataURL(file)
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
  }, [file])

  return (
    <>
      <DashboardHeader />
      <APIProvider>
        <main className="createEvent">
          <Link to="/organizations/events" className="eventsLink">
            <IoChevronBack />
            Events
          </Link>
          <form action="" className="form" onSubmit={handleSubmit(submitData)}>
            <div className="form__container">
              <section className="form__inputSection">
                <div className="form__eventImageContainer">
                  <div className={`${fileDataUrl ? "" : "overlay"}`}>
                    <FileButton
                      onChange={setFile}
                      accept="image/png,image/jpeg"
                    >
                      {(props) => (
                        <button type="button" {...props} className={`${fileDataUrl && "hidden"}`}>
                          <FiUpload size={20} />
                          Upload Photo
                        </button>
                      )}
                    </FileButton>
                  </div>
                  <img src={fileDataUrl ? fileDataUrl : imagePlaceholder} alt="" />
                </div>
                <header className="form__inputSection__header">
                  <h2>Basic Info</h2>
                  <p>
                    Name your event and tell event-goers why they should come.
                    Add details that highlight what makes it unique.
                  </p>
                </header>
                <div className="form__fieldContainer">
                  <div className="form__inputContainer">
                    <input
                      type="text"
                      className={`form__input ${
                        errors.eventTitle?.message && "error"
                      }`}
                      id="event-title"
                      placeholder=" "
                      autoComplete="off"
                      name="eventTitle"
                      {...register("eventTitle")}
                    />
                    <label
                      htmlFor="event-title"
                      className="form__label required"
                    >
                      Event Title
                    </label>
                  </div>
                  {errors.eventTitle?.message && (
                    <div className="error">{errors.eventTitle?.message}</div>
                  )}
                </div>
                <div className="form__fieldContainer">
                  <div className="form__inputContainer">
                    <select
                      name="organizer"
                      id="organizer"
                      className={`form__input select ${
                        errors.organizer?.message && "error"
                      }`}
                      {...register("organizer")}
                    >
                      <option value="" style={{ color: "black" }}>
                        Nexus
                      </option>
                    </select>
                    <label htmlFor="organizer" className="form__label">
                      Organizer
                    </label>
                  </div>
                  {errors.organizer?.message && (
                    <div className="error">{errors.organizer?.message}</div>
                  )}
                </div>
                <div className="form__fieldContainer">
                  <div className="form__inputContainer">
                    <select
                      name="category"
                      id="category"
                      className={`form__input select ${
                        errors.category?.message && "error"
                      }`}
                      {...register("category")}
                    >
                      <option value="" style={{ color: "black" }}>
                        Nexus
                      </option>
                    </select>
                    <label htmlFor="category" className="form__label">
                      Event Category
                    </label>
                  </div>
                </div>
              </section>
              <hr className="line" />
          <section className="form__inputSection">
          <header className="form__inputSection__header">
            <h2 className="text-red-500">Location</h2>
            <p>
              Help people in the area discover your event and let attendees know where to show up.
            </p>
            <div className="eventType-container">
              <button
                type="button"
                className={`${eventType === "Venue" && "active"}`}
                onClick={() => setEventType("Venue")}
              >
                <IoMdPin size={20} />
                Venue
              </button>
              <button
                type="button"
                className={`${eventType === "Online Event" && "active"}`}
                onClick={() => setEventType("Online Event")}
              >
                <MdOutlineOnlinePrediction size={20} />
                Online Event
              </button>
            </div>
          </header>
          {eventType === "Venue" ? (
            <div className="form__inputContainer">
              <input
                type="text"
                className={`form__input`}
                id="venue"
                placeholder=" "
                autoComplete="off"
              />
              <label htmlFor="venue" className="form__label required">
                Venue name
              </label>
            </div>
          ) : (
            <div className="form__inputContainer">
              <input
                type="text"
                className={`form__input`}
                id="onlineVenue"
                placeholder=" "
                autoComplete="off"
              />
              <label htmlFor="onlineVenue" className="form__label required">
                Online Venue
              </label>
            
            </div>
          )}
        </section>

              <hr className="line" />
              <section className="form__inputSection">
                <header className="form__inputSection__header">
                  <h2 className="text-red-500">Date and time</h2>
                  <p>
                    Tell event-goers when your event starts and ends so they can
                    make plans to attend.
                  </p>
                </header>
                <div className="form__inputContainer">
                  <DateTimePicker
                    variant="unstyled"
                    label="Events starts"
                    name="eventStarts"
                    className={`required dateTimePicker ${
                      errors.eventStarts?.message && "error"
                    }`}
                  />
                </div>
                <div className="form__fieldContainer">
                  <div className="form__inputContainer">
                    <DateTimePicker
                      variant="unstyled"
                      label="Events ends"
                      className={`required dateTimePicker ${
                        errors.eventEnds?.message && "error"
                      }`}
                      name="eventEnds"
                    />
                    {errors.eventEnds?.message && (
                      <div className="error">{errors.eventEnds?.message}</div>
                    )}
                  </div>
                </div>
              </section>
            </div>
            <footer className="createEvent__footer">
              <button className="discardBtn">Discard</button>
              <button type="submit" className="submitBtn">
                Submit
              </button>
            </footer>
          </form>
        </main>
      </APIProvider>
    </>
  );
};

export default CreateEvent;
