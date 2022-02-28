import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import { H1, P } from "../../components/Tags";
import MainNav from "../../components/MainNav";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addComment,
  postSuccess,
  addImage,
  isLoadingImage,
} from "../../actions/ticketAction";
import { COMMENT_ERROR } from "../../actions/actions";
import { clearErrors } from "../../actions/authAction";
import Icon from "../../components/Icon";
import ImageLoader from "../../components/ImageLoader";

function UserTicketDetail(props) {
  const user = useSelector((state) => state.authReducer.user);
  const { currentTicket, isPostSuccess, isLoading } = useSelector(
    (state) => state.ticketReducer
  );
  // const isPostSuccess = useSelector(
  //   (state) => state.ticketReducer.isPostSuccess
  // );
  const error = useSelector((state) => state.errorReducer);
  const { _id, tixId, date, subject, description, status, comments, images } =
    currentTicket;
  // const { isLoading } = ticket;
  const history = useNavigate();
  const dispatch = useDispatch();

  const [commentPost, setCommentPost] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [msgComment, setMsgComment] = useState(null);

  const { firstName, lastName } = user;

  useEffect(() => {
    if (error.id === COMMENT_ERROR) {
      setMsgComment(error.msg.msg);
      dispatch(isLoadingImage(false));
      dispatch(clearErrors());
    }
    if (isPostSuccess) {
      setMsgComment(null);
      dispatch(clearErrors());
      dispatch(postSuccess());
    }
  }, [error, isPostSuccess]);

  const handleCommentsForm = (e) => {
    e.preventDefault();

    const commentObj = {
      date: Date.now(),
      text: commentPost,
      from: `${firstName} ${lastName}`,
    };

    dispatch(addComment(_id, commentObj));
    setIsLoaded(!isLoaded);
    setCommentPost("");
  };

  // const clearAndBack = () => {
  //   setMsgComment(null);
  //   dispatch(clearErrors());
  //   history.goBack();
  //   dispatch(postSuccess());
  // };

  const statusIcon = () => {
    if (status === "Submitted") {
      return `fas fa-file-import fa-1x ml-2 mr-2 text-primary`;
    } else if (status === "In Progress") {
      return `fas fa-spinner fa-1x ml-2 mr-2 text-warning`;
    } else {
      return `test`;
    }
  };

  return (
    <React.Fragment>
      <MainNav />
      <Container>
        <Row className="global justify-content-center listRow">
          <Col md={12}>
            <H1 className="display-4 text-center mt-4 mb-1">Ticket Details</H1>
          </Col>
          <Col className="p-4" md={12}>
            <Row form className="detail-container">
              <Col className="pl-2" md={6}>
                <P>
                  <strong>Ticket Id:</strong> {tixId}
                </P>
                <P>
                  <strong>Date Submitted: </strong>
                  <Moment format="MMMM Do, YYYY">{date}</Moment>
                </P>
              </Col>
              <Col className="pr-1" md={6}>
                <P className="status-text">
                  <Icon className={statusIcon()} />
                  <strong>{status}</strong>
                </P>
              </Col>
            </Row>

            <Col className="pl-1 mt-2" md={12}>
              <P>
                <strong>Subject:</strong>{" "}
              </P>
            </Col>
            <Col className="p-0" md={12}>
              <P className="subject-box-wrapper"> {subject} </P>
            </Col>
            <Col className="pl-1" md={12}>
              <P>
                <strong>Description:</strong>
              </P>
            </Col>
            <Col className="p-0" md={12}>
              <P className="detail-box-wrapper"> {description} </P>
            </Col>
            <Col className="pl-1" md={12}>
              <P>
                <strong>Comments:</strong>
              </P>
            </Col>
            <Col className="p-0" md={12}>
              <div className="detail-box-wrapper">
                {comments.map((comment, i) => (
                  <Row key={i} className="comment-wrapper">
                    <Col md={6} className="p-0">
                      <P className="comment-text">
                        <strong>From:</strong> {comment.from}
                      </P>
                    </Col>
                    <Col md={6} className="p-0">
                      <P className="comment-text text-right">
                        <strong>Date posted:</strong>{" "}
                        <Moment format="MMMM Do, YYYY">{comment.date}</Moment>
                      </P>
                    </Col>
                    <Col md={12} className="p-0">
                      <P className="comment-text">
                        <strong>Comment: </strong>
                        {comment.text}{" "}
                      </P>
                    </Col>
                  </Row>
                ))}
              </div>
            </Col>
            <Col className="pl-1" md={12}>
              <P>
                <strong>Images:</strong>
              </P>
            </Col>
            <Col className="p-0" md={12}>
              <ImageLoader
                _id={_id}
                images={images}
                currentImages={[]}
                isLoading={isLoading}
                error={error}
                addImageAction={addImage}
              />
            </Col>

            <Col className="p-0 mt-3" md={12}>
              <Form className="logForm text-dark">
                {msgComment ? <Alert color="danger">{msgComment}</Alert> : null}
                <Row className="p-3" form>
                  <Col md={12}>
                    <FormGroup>
                      <Label className="pl-1" for="ticketComments">
                        <strong>Add Comments</strong>
                      </Label>
                      <Input
                        type="textarea"
                        name="comments"
                        id="ticketComments"
                        placeholder="Please, add a any comments. They will be sent as messages to the administrator."
                        onChange={(e) => {
                          setCommentPost(e.target.value);
                        }}
                        value={commentPost}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="text-center" md={12}>
                    <Button
                      className="ml-2"
                      onClick={handleCommentsForm}
                      color="dark"
                    >
                      Submit Comments
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
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

export default UserTicketDetail;
