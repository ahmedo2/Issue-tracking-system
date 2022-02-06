import React, { useState } from "react";
import { P } from "../../components/Text";
import API from "../../utils/API";



function TicketMain() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [date, setDate] = useState("04052020");
  const [tixId, setTixId] = useState("0001-JA-0420");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleTicketForm = (e) => {
    e.preventDefault();

    const dataObj = {
      userId: "5e896a49229be085c8f0b62e",
      date,
      tixId,
      subject,
      description
    }

    API.addTicket(dataObj)
      .then(data => {
        console.log(data);

      })
      .catch(err => console.log(err));
  }


  return (
    <React.Fragment>
      User Ticket Main
    </React.Fragment>
  )
}

export default TicketMain; 