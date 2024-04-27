import React, { useContext, useEffect, useState } from "react";
import "../assets/styles/dashboardOrder.scss";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Link } from "react-router-dom";
import successImg from '../assets/images/success.svg'
import { AuthContext } from "../contexts/AuthContext";
import TicketService from "../../services/TicketService";
import { Modal, ModalBody } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoWarningOutline } from "react-icons/io5";

const DashboardVerifyTickets = () => {
  const [scanResult, setScanResult] = useState(null);
  const { walletAddress } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [isOpened, setIsOpened] = useState(false)
  useEffect(() => {
    if(walletAddress){
      const scanner = new Html5QrcodeScanner("reader", {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 4,
        disableFlip: false
      });
      const success = (result) => {
        scanner.getRunningTrackSettings().facingMode
        scanner.clear();
        setScanResult(result);
        console.log(result)
        findTicketById(result)
      };
  
      const error = (err) => {
        console.warn(err);
      };
      scanner.render(success, error);
    }else{
      setIsOpened(true)
    }
  }, [walletAddress]);

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
            <p className="text-gray-300 text-center">Ticket has been successfully verified</p>
          </div>

        </ModalBody>
      </Modal>
      <Modal
        opened={isOpened}
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
        onClose={( ) => setIsOpened(false)}
        centered
      >
        <ModalBody>
          <div className="flex flex-col items-center justify-center">
            <IoWarningOutline className="text-red-500" size={50}/>
            <p className="text-red-100 text-center text-xl mt-3">You must connect wallet before verifying users' tickets</p>
          </div>

        </ModalBody>
      </Modal>
      {
        walletAddress && <div id="reader"></div> 
      }
      
    </>
  );
};

export default DashboardVerifyTickets;
