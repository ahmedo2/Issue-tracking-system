import React, { useState, useEffect } from "react";
import { Span, P } from "../../components/Text";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

function Main() {
  const [formSwitch, setFormSwitch] = useState(false);

  const handleRegisterSwitch = () => {
    setFormSwitch(!formSwitch);
  }

  return (
    <React.Fragment>
      <div className="">
        <h1 className="">Welcome to Ticket Generator</h1>
      </div>
      {!formSwitch ?
        <>
          <LoginForm />
          <P className="textLogin text-center" color="light">
            Not registered yet..? Please 
            <Span className="linkSpan" onClick={handleRegisterSwitch}>
              Register
            </Span>
          </P> 
        </> :
        <>
          <RegisterForm />
          <P className="textLogin text-center">
            <Span className="linkSpan" onClick={handleRegisterSwitch}>
              Back
            </Span>
          </P>
        </>
      }
    </React.Fragment>
  )
}


export default Main; 