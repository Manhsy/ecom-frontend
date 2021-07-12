import { SET_CURRENT_USER } from "../actions/authActions";
import isEmpty from "../../API/is-empty";

export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        userProfile: action.userProfile,
      };
    default:
      return state;
  }
}
