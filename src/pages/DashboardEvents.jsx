import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/dashboardEvent.scss";
import { Input, Select } from "@mantine/core";
import { IoIosSearch } from "react-icons/io";
import { RxCaretDown } from "react-icons/rx";
import { EventsTable } from "../components";
import { useEffect } from "react";
import EventService from "../../services/EventService";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const DashboardEvents = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [eventStatus, setEventStatus] = useState("Upcoming events");

  function isUpcomingEvent(event) {
    const currentDate = new Date();
    const eventStarts = new Date(event.eventStarts.seconds * 1000);
    return eventStarts > currentDate;
  }
  function filterUpcomingEvents(event) {
    if (eventStatus.toLowerCase() === "upcoming events")
      return isUpcomingEvent(event);
    if (eventStatus.toLowerCase() === "past events")
      return !isUpcomingEvent(event);
    return true;
  }
  useEffect(() => {
    async function getEvents() {
      const res = await EventService.getEventsByHost(user.email);
      if (res.status === "success") {
        setEvents(res.data);
      }
    }
    if (user) {
      getEvents();
    }
  }, [user]);
  return (
    <div className="dashboardEvents">
      <header>
        <h1 className="text-2xl">Events</h1>
        <Link to={"/manage/events/create"}>Create Event</Link>
      </header>
      <div className="dashboardEvents__searchbar-container">
        <Input
          w={"100%"}
          leftSection={<IoIosSearch size={20} />}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an event..."
          styles={{
            input: {
              border: "1px solid #9e9e9e",
              background: "none",
              color: "white",
            },
          }}
        />
        <Select
          styles={{
            wrapper: {
              width: "fit-content",
            },
            input: {
              backgroundColor: "transparent",
              border: "1px solid #880ad0",
              color: "white",
              borderRadius: "1rem",
            },
            dropdown: {
              background: "#07000a",
            },
          }}
          classNames={{ option: "hover:bg-text-color" }}
          placeholder="Select event status"
          value={eventStatus}
          onChange={(value) => setEventStatus(value)}
          data={["Upcoming events", "Past events", "All events"]}
          rightSection={<RxCaretDown size={20} />}
        />
      </div>
      {events
        .filter((e) => e.eventTitle.toLowerCase().includes(query.toLowerCase()))
        .filter(filterUpcomingEvents).length == 0 ? (
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <p className="text-3xl font-medium text-gray-300 mb-4">
            {/* You have not added a organization profile details */}
            No events found
          </p>
        </div>
      ) : (
        events
          .filter((e) =>
            e.eventTitle.toLowerCase().includes(query.toLowerCase())
          )
          .filter(filterUpcomingEvents)
          .map((event) => {
            return <EventsTable key={event.id} {...event} />;
          })
      )}
    </div>
  );
};

export default DashboardEvents;
