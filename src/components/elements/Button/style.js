import styled from "styled-components";

export const StyledButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.height || "40px"};
  width: ${(props) => props.width || "120px"};
  background-color: ${(props) =>
    props?.theme?.colors?.hoverBgColor || "#2563eb"};
  color: ${(props) => props.color || "#fff"};
  font-size: 1rem;
  border-radius: ${(props) => props.fontWeight || 500};
  border-radius: ${(props) => props.radius || "6px"};
  transition: background-color 0.2s;
  &:hover {
    background-color: ${(props) =>
      props?.theme?.colors?.hoverBgColor || "#2563eb"};
  }
  &:disabled {
    background-color: ${(props) =>
      props?.theme?.colors?.disabledBgColor || "#2563eb"};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
