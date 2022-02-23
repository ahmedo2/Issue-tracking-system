import axios from "axios";
import {
  LOAD_TICKETS,
  LOAD_USER_TICKETS,
  POST_TICKET,
  DELETE_TICKET,
  CLEAR_TICKETS,
  POST_ERROR,
  POST_SUCCESS,
  CURRENT_TICKET,
  POST_COMMENT,
  COMMENT_ERROR,
  POST_IMAGE,
  IMAGE_ERROR,
  IS_LOADING,
  POST_SINGLE_IMAGE,
} from "../actions/actions";
import { tokenConfig, returnErrors } from "./authAction";

export const loadAllTickets = () => (dispatch) => {
  axios.get("/api/tickets").then((data) => {
    dispatch({
      type: LOAD_TICKETS,
      payload: data,
    });
  });
};

export const loadUserTickets = () => (dispatch, getState) => {
  axios.get("/api/users/user", tokenConfig(getState)).then((data) => {
    dispatch({
      type: LOAD_USER_TICKETS,
      payload: data.data.tickets,
    });
  });
};

export const addComment = (id, data) => (dispatch) => {
  // console.log("id", id);
  // console.log("data", data);

  axios
    .post("/api/ticket/comment/" + id, data)
    .then((data) => {
      dispatch({
        type: POST_COMMENT,
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, COMMENT_ERROR)
      );
    });
};

export const clearTickets = () => {
  return {
    type: CLEAR_TICKETS,
  };
};

export const currentTicket = (id) => {
  return {
    type: CURRENT_TICKET,
    payload: id,
  };
};

export const addImage = (data, config) => (dispatch) => {
  axios
    .post("/api/ticket/image/upload", data, config)
    .then((data) => {
      console.log(data.data);

      dispatch({
        type: POST_IMAGE,
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, IMAGE_ERROR)
      );
    });
};

export const addImageNewTix = (data, config) => (dispatch) => {
  axios
    .post("/api/tickets/newimage/upload", data, config)
    .then((data) => {
      console.log(data.data);

      dispatch({
        type: POST_SINGLE_IMAGE,
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, IMAGE_ERROR)
      );
    });
};

export const isLoadingImage = (status) => {
  return {
    type: IS_LOADING,
    payload: status,
  };
};

export const addTicket = (data) => (dispatch) => {
  axios
    .post("/api/tickets", data)
    .then((data) => {
      dispatch({
        type: POST_TICKET,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, POST_ERROR)
      );
    });
};

export const postSuccess = () => {
  return {
    type: POST_SUCCESS,
  };
};
