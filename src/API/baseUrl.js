import Constants from "expo-constants";
let baseURL = "";

if (Constants.manifest.extra.envir === "dev") {
  baseURL = Constants.manifest.extra.devURL;
} else {
}

export default baseURL;
