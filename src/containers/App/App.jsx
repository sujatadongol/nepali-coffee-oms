import React from "react";
import MainRoutingComponent from "../../routes/MainRoutingComponent";
import { AppLayoutWrapper } from "./style";
import useAppHooks from "./useAppHooks";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  // this hooks fetch api and provides data,loader and error
  const { loginResponse, loginLoader, isErrorLoading } = useAppHooks();
  return (
    // Provide the client to your App
    <AppLayoutWrapper>
      <MainRoutingComponent />
    </AppLayoutWrapper>
  );
};

export default App;
