import React, { useState } from "react";
import { H1, Span, P } from "../../components/Tags";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import { Jumbotron, Container } from "reactstrap";

function Main() {
  const [formSwitch, setFormSwitch] = useState(false);

  const handleRegisterSwitch = () => {
    setFormSwitch(!formSwitch);
  };

  return (
    <React.Fragment>
      <div fluid className="jumbo bg-dark text-dark p-3 mb-1">
        <Container fluid>
          <div className="mb-0">
            <H1 className="display-5 mb-4 mt-3 text-center text-light">
              Welcome to Ticket Generator
            </H1>
          </div>
        </Container>
      </div>
      {!formSwitch ? (
        <>
          <LoginForm />
          <P className="textLogin text-center" color="light">
            Not registered yet..? Please{" "}
            <Span className="linkSpan" onClick={handleRegisterSwitch}>
              Register
            </Span>
          </P>{" "}
        </>
      ) : (
        <>
          <RegisterForm />
          <P className="textLogin text-center">
            Already registered..? Please{" "}
            <Span className="linkSpan" onClick={handleRegisterSwitch}>
              Login
            </Span>
          </P>
        </>
      )}
    </React.Fragment>
  );
}

export default Main;
