import React, { useEffect } from "react";
import Moment from "react-moment";
import { Container, Row, Col } from "reactstrap";
import { H1, P } from "../../components/Tags";
import MainNav from "../../components/MainNav";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Icon from "../../components/Icon";
import { changeMessageStatus } from "../../actions/messageAction";
// import "./style.css";

function AdminTicketDetail() {
  const messages = useSelector((state) => state.messageReducer.messages);
  let { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const current = messages.filter((item) => item._id === id);

  const { date, subject, description, userId } = current[0];
  const { firstName, lastName, email } = userId;

  useEffect(() => {
    if (current[0].isMessageNew) {
      const objData = {
        isMessageNew: false,
      };
      dispatch(changeMessageStatus(id, objData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <MainNav />
      <Container>
        <Row className="global justify-content-center listRow">
          <Col md={12}>
            <H1 className="display-4 text-center mt-4 mb-1">
              Contact Messages
            </H1>
          </Col>
          <Col className="p-4" md={12}>
            <Row form className="detail-container">
              <Col className="pl-2" md={10}>
                <P>
                  <strong>Date Submitted: </strong>
                  <Moment format="MMMM Do, YYYY">{date}</Moment>
                </P>
                <P>
                  <strong>From: </strong>
                  {`${firstName} ${lastName}`}
                </P>
                <P>
                  <strong>Email: </strong>
                  <a href={`mailto:${email}`}>{email}</a>
                </P>
              </Col>

              <Col className="pr-1" md={2}>
                <P className="status-text">
                  <Icon className="" />
                  <strong></strong>
                </P>
              </Col>
            </Row>
            <Row>
              <Col className="pl-1 mt-2" md={12}>
                <P>
                  <strong>Subject:</strong>{" "}
                </P>
              </Col>
              <Col className="p-0" md={12}>
                <P className="subject-box-wrapper">{subject}</P>
              </Col>
              <Col className="pl-1" md={12}>
                <P>
                  <strong>Description:</strong>
                </P>
              </Col>
              <Col className="p-0" md={12}>
                <P className="detail-box-wrapper">{description}</P>
              </Col>
            </Row>
          </Col>
          <Col md={12} className="text-center">
            <Icon
              className="back-btn far fa-arrow-alt-circle-left fa-2x mt-3 ml-3 mb-4 text-primary"
              onClick={history.goBack}
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default AdminTicketDetail;
