import React, { useState, useEffect } from "react";
import { P } from "../../components/Tags";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import MainNav from "../../components/MainNav";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Icon from "../../components/Icon";
import { POST_ERROR } from "../../actions/actions";
import {
  addTicket,
  addImageNewTix,
  postSuccess,
  isLoadingImage,
  clearCurrentImages,
  imageDeleteNewTix,
} from "../../actions/ticketAction";
import { clearErrors } from "../../actions/authAction";
import ImageLoader from "../../components/ImageLoader";

function TicketMain() {
  const user = useSelector((state) => state.authReducer.user);
  const { userTickets, currentImage, isPostSuccess, isLoading } = useSelector(
    (state) => state.ticketReducer
  );
  const error = useSelector((state) => state.errorReducer);
  const history = useNavigate();
  const dispatch = useDispatch();
  const [date] = useState(Date.now());
  const [tixId, setTixId] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [status] = useState("Submitted");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    // console.log("current", currentImage);
    dispatch(isLoadingImage(false));
    generateTixId();
    if (error.id === POST_ERROR) {
      setMsg(error.msg.msg);
      dispatch(clearErrors());
    }

    if (isPostSuccess) {
      setMsg(null);
      dispatch(clearErrors());
      history.push("/user/ticketlist");
      dispatch(postSuccess());
    }
    // console.log("Array", imageArr);
  }, [error, isPostSuccess, currentImage]);

  const handleTicketForm = (e) => {
    e.preventDefault();

    const dataObj = {
      userId: user._id,
      date,
      tixId,
      subject,
      description,
      status,
    };

    dispatch(addTicket(dataObj));
    dispatch(clearCurrentImages());
  };

  const generateTixId = () => {
    let lastIdNum;
    if (userTickets.length === 0) {
      lastIdNum = 0;
    } else {
      const lastId = userTickets.slice(-1)[0].tixId;
      lastIdNum = parseInt(lastId.split("-")[2]);
    }
    const dateObj = new Date();
    const dateFormat =
      dateObj.getFullYear() +
      "" +
      (dateObj.getMonth() + 1) +
      "" +
      dateObj.getDate();
    const fullIdGen =
      dateFormat +
      "-" +
      user.firstName.charAt(0) +
      "" +
      user.lastName.charAt(0) +
      "-" +
      (lastIdNum + 1);
    setTixId(fullIdGen);
  };

  const dateToFormat = date;

  return (
    <React.Fragment>
      <MainNav />

      <Container>
        <Row className="logForm mt-4 mb-4">
          <Col className="p-0" md={12}>
            <Form className="mt-4 pl-4 pr-4 pb-0 pt-4 text-dark">
              <h2 className="display-4 text-dark text-center">
                Request Service Ticket
              </h2>
              {msg ? <Alert color="danger">{msg}</Alert> : null}
              <Row form>
                <Col md={6}>
                  <P className="mt-4">
                    <Moment format="MMMM Do, YYYY">{dateToFormat}</Moment>
                  </P>
                </Col>
                <Col md={6}>
                  <P className="mt-4 text-right">Ticket ID: {tixId}</P>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="ticketSubject">Subject</Label>
                    <Input
                      type="text"
                      name="subject"
                      id="ticketSubject"
                      placeholder="Subject"
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="ticketDescription">Description</Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="ticketDescription"
                      placeholder="Please, describe in detail the issue."
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col className="pl-4 pr-4 pt-0" md={12}>
            <P className="mt-1">Images:</P>
            <ImageLoader
              _id={""}
              images={[]}
              currentImages={currentImage}
              isLoading={isLoading}
              error={error}
              addImageAction={addImageNewTix}
              removeImage={imageDeleteNewTix}
            />
          </Col>

          <Col className="p-4" md={12}>
            <Button
              className="mt-1 mb-4 ml-1"
              onClick={handleTicketForm}
              color="dark"
            >
              Submit Ticket
            </Button>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12} className="text-center">
            <Icon
              className="back-btn far fa-arrow-alt-circle-left fa-2x mt-3 ml-3 text-primary"
              onClick={history.goBack}
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default TicketMain;
