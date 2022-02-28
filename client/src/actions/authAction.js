import axios from "axios";
import {
  UPDATE_PROFILE,
  UPDATE_ERROR,
  UPDATE_SUCCESS,
  UPDATE_PROFILE_IMAGE,
  UPDATE_PROFILE_IMAGE_ERROR,
  PROFILE_IMAGE_LOADING,
  DELETE_PROFILE_IMAGE,
} from "../actions/actions";

// Return errors
export const returnErrors = (msg, status, id = null) => {
  return {
    type: "GET_ERRORS",
    payload: { msg, status, id },
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: "CLEAR_ERRORS",
  };
};

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: "USER_LOADING" });

  axios
    .get("/api/users/user", tokenConfig(getState))
    .then((data) =>
      dispatch({
        type: "USER_LOADED",
        payload: data.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: "AUTH_ERROR",
      });
    });
};

// Update profile info
export const updateProfile = (id, data) => (dispatch, getState) => {
  axios
    .put("/api/users/user/update/" + id, data, tokenConfig(getState))
    .then((data) => {
      console.log(data);
      dispatch({
        type: UPDATE_PROFILE,
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, UPDATE_ERROR)
      );
      dispatch({
        type: UPDATE_ERROR,
      });
    });
};

export const updateProfileImage = (data, config) => (dispatch, getState) => {
  axios
    .post("/api/users/user/image/upload", data, config)
    .then((data) => {
      console.log(data.data);

      dispatch({
        type: UPDATE_PROFILE_IMAGE,
        payload: data.data.image,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          UPDATE_PROFILE_IMAGE_ERROR
        )
      );
    });
};

export const isLoadingProfileImage = (status) => {
  return {
    type: PROFILE_IMAGE_LOADING,
    payload: status,
  };
};

export const deleteProfileImage = (filename, userId) => (dispatch) => {
  console.log("delete IMG Action", userId);
  console.log("delete IMG Action");

  axios
    .delete("/api/ticket/image/" + userId + "/" + filename)
    .then((data) => {
      console.log(data);

      dispatch({
        type: DELETE_PROFILE_IMAGE,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          UPDATE_PROFILE_IMAGE_ERROR
        )
      );
    });
};

export const updateSuccess = () => {
  return {
    type: UPDATE_SUCCESS,
  };
};

// Register User
export const login =
  ({ email, password, role }) =>
  (dispatch) => {
    // headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // Request Body
    const body = JSON.stringify({ email, password, role });

    axios
      .post("/api/users/auth", body, config)
      .then((res) =>
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({
          type: "LOGIN_FAIL",
        });
      });
  };

export const register =
  ({
    firstName,
    lastName,
    email,
    address,
    address2,
    city,
    state,
    zip,
    phoneNumber,
    password,
    confirmPassword,
    role,
  }) =>
  (dispatch) => {
    // headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // Request Body
    const body = JSON.stringify({
      firstName,
      lastName,
      email,
      address,
      address2,
      city,
      state,
      zip,
      phoneNumber,
      password,
      confirmPassword,
      role,
    });

    axios
      .post("/api/users/register", body, config)
      .then((res) =>
        dispatch({
          type: "REGISTER_SUCCESS",
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({
          type: "REGISTER_FAIL",
        });
      });
  };

export const logout = () => {
  return {
    type: "LOGOUT_SUCCESS",
  };
};

// Setup Config/headers and token
export const tokenConfig = (getState) => {
  //get token from local storage
  const token = getState().authReducer.token;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
