/* eslint-disable react/prop-types */
import { LoadingOverlay, Progress } from "@mantine/core";
// import { FaRegImage } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import EventService from "../../services/EventService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

function getMonthString(month) {
  if (month === 11) return "DEC";
  if (month === 10) return "NOV";
  if (month === 9) return "OCT";
  if (month === 8) return "SEPT";
  if (month === 7) return "AUG";
  if (month === 6) return "JUL";
  if (month === 5) return "JUN";
  if (month === 4) return "MAY";
  if (month === 3) return "APR";
  if (month === 2) return "MARCH";
  if (month === 1) return "FEB";
  return "JAN";
}

const EventsTable = ({ query, setQuery, eventStatus, setEventStatus }) => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  // const [query, setQuery] = useState("");
  // const [eventStatus, setEventStatus] = useState("Upcoming events");

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
        setLoading(false);
      }
      
    }
    if (user) {
      setLoading(true);
      getEvents();

    }
    
  }, [user]);
  return (
    <table className="eventsTable">
      {!loading ? (
        <>
          <thead className="eventsTable__header">
            <th>Event</th>
            <th>Sold</th>
            <th>Gross</th>
            {/* <th>Status</th> */}
            <th></th>
          </thead>
          <tbody className="eventsTable__body ">
            {events
              .filter((e) =>
                e.eventTitle.toLowerCase().includes(query.toLowerCase())
              )
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
                  return (
                    <tr>
                      <td className="event">
                        <div className="date">
                          <p>
                            {getMonthString(
                              new Date(
                                event.eventStarts.seconds * 1000
                              ).getMonth()
                            )}
                          </p>
                          <span>
                            {new Date(
                              event.eventStarts.seconds * 1000
                            ).getDate()}
                          </span>
                        </div>
                        <span className="h-20 w-20">
                          <img
                            className="h-20 w-20 object-cover"
                            src={event.eventBanner}
                            alt=""
                          />
                        </span>
                        <div className="eventInfo">
                          <Link className="title">{event.eventTitle}</Link>
                          <p>{event.eventType}</p>
                          <p>
                            {new Date(
                              event.eventStarts.seconds * 1000
                            ).toString()}
                          </p>
                        </div>
                      </td>
                      <td className="sold">
                        <p>
                          {event.ticketsSold.length}/{event.tickets}
                        </p>
                        <Progress size="sm" value={50} />
                      </td>
                      <td className="gross">
                        <p>
                          {event.ticketsSold.length * event.pricePerTicket} SOL
                        </p>
                      </td>
                      {/* <td className="status">
              <p>Draft</p>
            </td> */}
                      <td>
                        <BsThreeDotsVertical />
                      </td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </>
      ) : (
        <div className="h-[60vh] w-full relative">
          <LoadingOverlay
            visible={true}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{color: "violet"}}
            styles={{
              overlay:{
                backgroundColor: "transparent"
              }
            }}
          />
        </div>
      )}
    </table>
  );
};

export default EventsTable;
