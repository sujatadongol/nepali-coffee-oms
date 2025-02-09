import APIEndPoints from "../global/globalConstants";
import TokenHandler from "../global/TokenHandler";
import request from "../utils/request";

// here is the helper function for the api where we do actual api calls and returns the result
export const loginFunction = async () => {
  try {
    const endpoint = APIEndPoints.FETCH_DATA;
    console.log("ABCD-here");
    const options = {
      method: "GET",
      headers: TokenHandler.authHeadersTypeJSON(),
    };
    const response = await request(endpoint, options);

    if (response?.error) {
      return error;
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
