/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import EventService from "../../../services/EventService";
import { DashboardHeader } from "../../components";
import "../../assets/styles/createEvent.scss";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { IoChevronBack } from "react-icons/io5";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventVal } from "../../validation/createEventVal";
import { APIProvider } from "@vis.gl/react-google-maps";
import { IoMdPin } from "react-icons/io";
import { MdOutlineOnlinePrediction } from "react-icons/md";
import imagePlaceholder from "../../assets/images/event-image-placeholder.jpg";
import { FiUpload } from "react-icons/fi";
import {
  FileButton,
  Dialog,
  LoadingOverlay,
  Loader,
  Autocomplete,
} from "@mantine/core";
import FirebaseService, { uploadFile } from "../../../services/FirebaseService";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { PiCaretDown } from "react-icons/pi";
import { Country, State } from "country-state-city";
import { LuAsterisk } from "react-icons/lu";

const CreateEvent = () => {
  const [eventType, setEventType] = useState("Venue");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileDataUrl, setFileDataUrl] = useState(null);
  const [eventBanner, setEventBanner] = useState(null);
  const [opened, { toggle, close }] = useDisclosure(false);
  const { user, walletAddress } = useContext(AuthContext);
  const [isUploading, setIsUploading] = useState(false);
  const [states, setStates] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [category, setCategory] = useState();

  const countries = Country.getAllCountries().map((country) => country.name);
  const allStates = states?.map((state) => state.name);
  useEffect(() => {
    setStates(
      State.getStatesOfCountry(
        Country.getAllCountries().filter((item) => {
          return item.name == country;
        })[0]?.isoCode
      )
    );
  }, [country]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createEventVal),
  });

  const submitData = async (data, e) => {
    e.preventDefault();
    const { organiserProfile } = user;
    if (!fileDataUrl) {
      toggle();
      return alert("Please provide an event banner");
    }
    setIsSubmitting(true);
    const res = await EventService.createEvent({
      ...data,
      eventBanner,
      host: organiserProfile ? organiserProfile.name : user.name,
      organiserProfile: organiserProfile ? organiserProfile : null,
      ticketsSold: [],
      eventType,
      createdBy: user.email,
      refundPolicy: false,
      walletAddress,
    });
    console.log(res);
    setIsSubmitting(false);
    if (res.status === "success") {
      alert("You have successfully created your event");
      setTimeout(() => {
        window.location.assign("/organizations/events");
      }, 6000);
    } else {
      alert(res.errror_message);
    }
  };

  async function uploadImage(file) {
    console.log(file);
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setIsUploading(true);
          const res = await uploadFile(file, file.name);
          setIsUploading(false);
          console.log(res);
          if (res.status === "success") {
            setFileDataUrl(result);
            setEventBanner(res.data);
          } else {
            alert(res.errror_message);
          }
        }
      };
      fileReader.readAsDataURL(file);
    }
  }

  return (
    <>
      <DashboardHeader />
      <APIProvider>
        <LoadingOverlay
          pos={"fixed"}
          visible={isSubmitting}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2, color: "#000" }}
        >
          <p>Creating Event</p>
        </LoadingOverlay>
        <Dialog opened={false} onClose={close}>
          <p className="text-red">Please add event banner</p>
        </Dialog>
        <main className="createEvent">
          <Link to="/organizations/events" className="eventsLink">
            <IoChevronBack />
            Events
          </Link>
          <form action="" className="form" onSubmit={handleSubmit(submitData)}>
            <div className="form__container">
              <section className="form__inputSection">
                {isUploading ? (
                  <div className="bg-[#333333] flex items-center justify-center h-56 rounded-md mt-3">
                    <div className="text-center">
                      <Loader color="purple" />
                      <p>Uploading Image</p>
                    </div>
                  </div>
                ) : (
                  <div className="form__eventImageContainer">
                    <div className={`${fileDataUrl ? "" : "overlay"}`}>
                      <FileButton
                        onChange={uploadImage}
                        accept="image/png,image/jpeg"
                      >
                        {(props) => (
                          <button
                            type="button"
                            {...props}
                            className={`${fileDataUrl && "hidden"}`}
                          >
                            <FiUpload size={20} />
                            Upload Photo
                          </button>
                        )}
                      </FileButton>
                    </div>
                    <img
                      src={fileDataUrl ? fileDataUrl : imagePlaceholder}
                      alt=""
                    />
                  </div>
                )}
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
                <div className="mt-2 flex flex-col gap-2">
                  <p>Event Description</p>
                  <textarea
                    cols="10"
                    rows="5"
                    type="text"
                    placeholder="e.g I want to be able to teach people to fly"
                    className="bg-inherit border border-text-color rounded-md py-2 px-3 w-full "
                    {...register("description")}
                  ></textarea>
                  {errors.description?.message && (
                    <p className="text-sm font-medium text-error-color">
                      {errors.description.message}
                    </p>
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
                      <option value="Nexus" style={{ color: "black" }}>
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
                    <div className="form__inputContainer">
                      <label
                        htmlFor=""
                        className="flex items-center gap-1 text-[15px] mb-1"
                      >
                        Event Category <LuAsterisk size={10} color="red" />
                      </label>
                      <Autocomplete
                        size="md"
                        placeholder={`Select category`}
                        value={category}
                        onChange={(category) => {
                          setCategory(category);
                          setValue("category", category);
                        }}
                        styles={{
                          input: {
                            backgroundColor: "#07000a",
                            border: "2px solid #9e9e9e",
                            borderRadius: "8px",
                            padding: "1.25rem",
                            color: "white",
                          },
                          dropdown: {
                            backgroundColor: "#07000a",
                          },
                        }}
                        data={["Gaming", "Food", "Technology", "Music", "Visual Art", "Nightlife", "Culture"]}
                        rightSectionPointerEvents="none"
                        rightSection={<PiCaretDown />}
                        className=""
                        classNames={{
                          option: "select-option",
                          input: `dropdown ${
                            errors.category?.message && "error"
                          }`,
                        }}
                      />
                      {errors.category?.message && (
                        <div className="error text-red-500 capitalize text-sm">
                          {errors.categpry?.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
              <hr className="line" />
              <section className="form__inputSection">
                <header className="form__inputSection__header">
                  <h2>Location</h2>
                  <p>
                    Help people in the area discover your event and let
                    attendees know where to show up.
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
                  <>
                    <div className="form__inputContainer">
                      <input
                        type="text"
                        className={`form__input`}
                        id="venue"
                        placeholder=" "
                        {...register("venue")}
                        autoComplete="off"
                      />
                      <label htmlFor="venue" className="form__label required">
                        Venue name
                      </label>
                    </div>
                    <div className="form__inputContainer">
                      <label
                        htmlFor=""
                        className="flex items-center gap-1 text-[15px] mb-1"
                      >
                        Country <LuAsterisk size={10} color="red" />
                      </label>
                      <Autocomplete
                        size="md"
                        placeholder={`Select country`}
                        value={country}
                        onChange={(country) => {
                          setCountry(country);
                          setValue("country", country);
                        }}
                        styles={{
                          input: {
                            backgroundColor: "#07000a",
                            border: "2px solid #9e9e9e",
                            borderRadius: "8px",
                            padding: "1.25rem",
                            color: "white",
                          },
                          dropdown: {
                            backgroundColor: "#07000a",
                          },
                        }}
                        data={countries}
                        rightSectionPointerEvents="none"
                        rightSection={<PiCaretDown />}
                        classNames={{
                          input: "dropdown",
                          option: "select-option",
                        }}
                      />
                      {errors.country?.message && (
                        <div className="error text-red-500 capitalize text-sm">
                          {errors.country?.message}
                        </div>
                      )}
                    </div>
                    <div className="form__inputContainer mt-5 mb-10">
                      <label
                        htmlFor=""
                        className="flex items-center gap-1 text-[15px] mb-1"
                      >
                        State <LuAsterisk size={10} color="red" />
                      </label>
                      <Autocomplete
                        size="md"
                        placeholder={`Select state`}
                        value={state}
                        onChange={(state) => {
                          setState(state);
                          setValue("state", state);
                        }}
                        styles={{
                          input: {
                            backgroundColor: "#07000a",
                            border: "2px solid #9e9e9e",
                            borderRadius: "8px",
                            padding: "1.25rem",
                            color: "white",
                          },
                          dropdown: {
                            backgroundColor: "#07000a",
                          },
                        }}
                        data={allStates}
                        rightSectionPointerEvents="none"
                        rightSection={<PiCaretDown />}
                        classNames={{
                          input: "dropdown",
                          option: "select-option",
                        }}
                        disabled={country ? false : true}
                      />
                      {errors.state?.message && (
                        <div className="error text-red-500 capitalize text-sm">
                          {errors.state?.message}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="form__inputContainer">
                    <input
                      type="text"
                      className={`form__input`}
                      id="onlineVenue"
                      placeholder=" "
                      {...register("venue")}
                      autoComplete="off"
                    />
                    <label
                      htmlFor="onlineVenue"
                      className="form__label required"
                    >
                      Online Venue
                    </label>
                  </div>
                )}
              </section>
              <section>
                <header className="form__inputSection__header">
                  <h2>Tickets Info</h2>
                  <p>
                    Provide the number of tickets you wish to sell for this
                    event
                  </p>
                </header>
                <br />
                <div className="form__inputContainer">
                  <input
                    type="number"
                    className={`form__input`}
                    id="tickets"
                    onChange={(e) =>
                      setValue(
                        "tickets",
                        parseInt(e.target.value ? e.target.value : "0")
                      )
                    }
                    // {...register("tickets")}
                    placeholder=" "
                    autoComplete="off"
                  />
                  <label htmlFor="tickets" className="form__label required">
                    Number of Tickets
                  </label>
                </div>
                {errors.tickets?.message && (
                  <div className="error text-red-500 capitalize text-sm">
                    {errors.tickets?.message}
                  </div>
                )}
                <br />
                <div className="form__inputContainer">
                  <input
                    type="number"
                    className={`form__input`}
                    id="price"
                    placeholder=" "
                    onChange={(e) =>
                      setValue(
                        "pricePerTicket",
                        parseFloat(e.target.value ? e.target.value : "0")
                      )
                    }
                    // {...register("pricePerTicket")}
                    autoComplete="off"
                  />
                  <label htmlFor="price" className="form__label required">
                    Price Per Ticket(SOL)
                  </label>
                </div>
                {errors.pricePerTicket?.message && (
                  <div className="error text-red-500 capitalize text-sm">
                    {errors.pricePerTicket?.message}
                  </div>
                )}
              </section>

              <hr className="line" />
              <section className="form__inputSection">
                <header className="form__inputSection__header">
                  <h2>Date and time</h2>
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
                    onChange={(date) => setValue("eventStarts", date)}
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
                      onChange={(date) => setValue("eventEnds", date)}
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
              <button
                disabled={isSubmitting}
                type="submit"
                className="submitBtn"
              >
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
