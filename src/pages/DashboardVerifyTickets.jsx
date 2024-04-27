import React, { useContext, useEffect, useState } from "react";
import "../assets/styles/dashboardOrder.scss";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Link } from "react-router-dom";
import successImg from '../assets/images/success.svg'
import { AuthContext } from "../contexts/AuthContext";
import TicketService from "../../services/TicketService";
import { Modal, ModalBody } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const DashboardVerifyTickets = () => {
  const [scanResult, setscanResult] = useState(null);
  const { user } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 4,
    });
    const success = (result) => {
      scanner.clear();
      setscanResult(result);
      console.log(result)
      findTicketById(result)
    };

    const error = (err) => {
      console.warn(err);
    };
    scanner.render(success, error);
  }, []);

  const findTicketById = async (result) => {
    // console.log(user.email)
    // const res = await EventService.getTickets("1GywGw95RO363ZgqMA0T")
    console.log(scanResult)
    const res = await TicketService.findTicket(result);
    console.log(res);
    if(res.status == 'success'){
      open()
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        styles={{
          header: { backgroundColor: "#07000a" },
          body: { backgroundColor: "#07000a" },
          content: { border: "1px solid white" },
        }}
        className={{ root: "bg-transparent" }}
        onClose={close}
        centered
      >
        <ModalBody>
          <div className="flex flex-col items-center justify-center">
            <img src={successImg} alt="" className="w-20"/>
            <h1 className="text-2xl mt-3 font-semibold">Success!</h1>
            <p className="text-gray-300">Ticket has been successfully verified</p>
          </div>

        </ModalBody>
      </Modal>
      <div id="reader"></div>
      {/* {scanResult ? (
        <Link to={`${scanResult}`}>{scanResult}</Link>
      ) : (
        
      )} */}
    </>
  );
};

export default DashboardVerifyTickets;
