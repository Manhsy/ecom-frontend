import axios from "axios";

export default axios.create({
  //baseURL = ngrok, remember to update it every eight hours
  //to establish ngrok connection: ngrok http portNumberOfAPI
  baseURL: "http://13ba1990d6e2.ngrok.io",
});
