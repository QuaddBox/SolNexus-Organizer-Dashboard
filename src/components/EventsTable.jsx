import React from "react";
import { Progress } from "@mantine/core";
import { FaRegImage } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

const EventsTable = () => {
  return (
    <table className="eventsTable">
      <thead className="eventsTable__header">
        <th>Event</th>
        <th>Sold</th>
        <th>Gross</th>
        <th>Status</th>
        <th></th>
      </thead>
      <tbody className="eventsTable__body">
        <tr>
          <td className="event">
            <div className="date">
              <p>MAR</p>
              <span>3</span>
            </div>
            <span className="placeholder-image">
              <FaRegImage />
            </span>
            <div className="eventInfo">
              <Link className="title">Demystifying Solana Blockchain</Link>
              <p>Online event</p>
              <p>Sunday, March 3, 2024 at 7:00PM WAT</p>
            </div>
          </td>
          <td className="sold">
            <p>0/0</p>
            <Progress size="sm" value={50} />
          </td>
          <td className="gross">
            <p>$0.00</p>
          </td>
          <td className="status">
            <p>Draft</p>
          </td>
          <td>
            <BsThreeDotsVertical />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EventsTable;
