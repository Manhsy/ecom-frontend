import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import baseURL from "../../API/baseUrl";
import axios from "axios";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = async (user, dispatch) => {
  let email = user.email;
  let pw = user.password;

  try {
    const response = await baseURL.post("users/login", {
      email: email,
      password: pw,
    });

    const token = response.data.token;
    AsyncStorage.setItem("jwt", token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded, user));
  } catch (err) {
    console.log(error);
    Toast.show({
      topOffset: 60,
      type: "error",
      text1: "Please provide correct credentials",
      text2: "",
    });
    logoutUser(dispatch);
  }
};

export const getUserProfile = async (id) => {
  try {
    const response = await baseURL.get(`users/${id}`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = (dispatch) => {
  AsyncStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    UserProfile: user,
  };
};
