import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/dashboardEvent.scss";
import { Input, Select } from "@mantine/core";
import { IoIosSearch } from "react-icons/io";
import { RxCaretDown } from "react-icons/rx";
import { EventsTable } from "../components";

const DashboardEvents = () => {
  const [eventStatus, setEventStatus] = useState("Draft");
  return (
    <div className="dashboardEvents">
      <header>
        <h1>Events</h1>
        <Link to={"/manage/events/create"}>Create Event</Link>
      </header>
      <div className="dashboardEvents__searchbar-container">
        <Input
          w={"100%"}
          leftSection={<IoIosSearch size={20} />}
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
            wrapper:{
              width: "fit-content"
            },
            input: {
              backgroundColor: "#880ad0",
              border: "none",
              color: "white",
              borderRadius: "1rem",
            },
            dropdown:{
              background: "#07000a"
            }
          }}
          classNames={{option: "hover:bg-text-color"}}
          placeholder="Select event status"
          value={eventStatus}
          onChange={(value) => setEventStatus(value)}
          data={["Upcoming events", "Draft", "Past events", "All events"]}
          rightSection={<RxCaretDown size={20} />}
        />
      </div>
      <EventsTable />
    </div>
  );
};

export default DashboardEvents;
