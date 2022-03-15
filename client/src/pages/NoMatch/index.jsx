import React from "react";
import { Col, Row, Container, Jumbotron } from "reactstrap";

function NoMatch() {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron className="text-center">
            <h1>404 Page Not Found...</h1>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default NoMatch;
