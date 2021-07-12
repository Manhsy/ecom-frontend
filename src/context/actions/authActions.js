import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import axios from "axios";

let baseURL = "";
if (Constants.manifest.extra.envir === "dev") {
  baseURL = Constants.manifest.extra.devURL;
} else {
}

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = async (user, dispatch) => {
  let email = user.email;
  let pw = user.password;

  axios
    .post(`${baseURL}/users/login`, { email: email, password: pw })
    .then((response) => {
      const token = response.data.token;
      AsyncStorage.setItem("jwt", token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded, user));
    })
    .catch((err) => {
      console.log(error);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please provide correct credentials",
        text2: "",
      });
      logoutUser(dispatch);
    });
};

export const getUserProfile = async (id) => {
  axios
    .get(`${baseURL}users/${id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(error);
    });
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
