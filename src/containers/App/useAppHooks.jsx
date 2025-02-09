import { useQuery } from "@tanstack/react-query";
import { loginFunction } from "../../api/appApi";
import { AppConstants } from "./constants";

// this hooks is used to handle all the state management:fetch and update state
// useQuery hooks can be used to to fetch data from server
export default function useAppHooks() {
  const {
    data: loginResponse,
    isLoading: loginLoader,
    isError: isErrorLoading,
  } = useQuery({
    queryKey: [AppConstants.APP_LOGIN], // this is the constant for query keys
    queryFn: () => loginFunction(),
  });
  return {
    loginResponse,
    loginLoader,
    isErrorLoading,
  };
}
