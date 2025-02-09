import styled from "styled-components";

export const QuestionElementWrapper = styled.div`
  font-size: ${(props) => props?.anil};
  color: ${(props) => props.theme.colors.themeColor};
  border:${(props)=>props.isQuestion?'1px solid red':'1px solid yellow'};
`;
