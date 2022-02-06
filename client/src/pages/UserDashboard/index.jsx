import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { P } from "../../components/Text";
import API from "../../utils/API";


function UserDashboard() {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // useEffect(() => {
  //     API.getUser()
  //         .then(data => console.log(data))
  //         .catch(err => console.log(err));
  // })

  return (
    <React.Fragment>
      User dashboard
    </React.Fragment>



  )

}

export default UserDashboard;