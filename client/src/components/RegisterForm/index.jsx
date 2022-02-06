/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { P } from "../Text";
import API from "../../utils/API";
import { Link } from "react-router-dom";


function Register() {
  const history = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateReg, setStateReg] = useState("");
  const [zip, setZip] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const dataObj = {
      firstName,
      lastName,
      email,
      address,
      address2,
      city,
      state: stateReg,
      zip,
      phoneNumber,
      password,
      role: "resident"
    };

    API.register(dataObj)
      .then(data => {
        console.log(data);
        history.push("/dashboard");

      })
      .catch(err => console.log(err));
  }


  return (
    <div>Register</div>
  )
}

export default Register; 