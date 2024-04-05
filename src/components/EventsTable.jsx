/* eslint-disable react/prop-types */
import { Progress } from "@mantine/core";
// import { FaRegImage } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

function getMonthString(month){
   if(month === 11)return "DEC";
   if(month === 10)return "NOV";
   if(month === 9)return "OCT";
   if(month === 8)return "SEPT";
   if(month === 7)return "AUG";
   if(month === 6)return "JUL";
   if(month === 5)return "JUN";
   if(month === 4)return "MAY";
   if(month === 3)return "APR";
   if(month === 2)return "MARCH";
   if(month === 1)return "FEB";
   return "JAN"
}

const EventsTable = (props) => {
  console.log(props)
  const eventStarts = new Date(props.eventStarts.seconds * 1000)
  const eventEnds = new Date(props.eventEnds.seconds * 1000)
  console.log({eventEnds,eventStarts})
  return (
    <table className="eventsTable">
      <thead className="eventsTable__header">
        <th>Event</th>
        <th>Sold</th>
        <th>Gross</th>
        {/* <th>Status</th> */}
        <th></th>
      </thead>
      <tbody className="eventsTable__body">
        <tr>
          <td className="event">
            <div className="date">
              <p>{getMonthString(eventStarts.getMonth())}</p>
              <span>{eventStarts.getDate()}</span>
            </div>
            <span className="h-20 w-20">
              <img className="h-20 w-20 object-cover" src={props.eventBanner} alt="" />
            </span>
            <div className="eventInfo">
              <Link className="title">{props.eventTitle}</Link>
              <p>{props.eventType}</p>
              <p>{eventStarts.toString()}</p>
            </div>
          </td>
          <td className="sold">
            <p>{props.ticketsSold.length}/{props.tickets}</p>
            <Progress size="sm" value={50} />
          </td>
          <td className="gross">
            <p>{props.ticketsSold.length * props.pricePerTicket} SOL</p>
          </td>
          {/* <td className="status">
            <p>Draft</p>
          </td> */}
          <td>
            <BsThreeDotsVertical />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EventsTable;
