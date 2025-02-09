import React from "react";
import { StyledButtonWrapper } from "./style";

const StyledButton = ({ styleObj, onClick, buttonName }) => {
  return (
    <StyledButtonWrapper
      height={styleObj?.height}
      width={styleObj?.width}
      onClick={onClick}>
      {buttonName}
    </StyledButtonWrapper>
  );
};

export default StyledButton;
