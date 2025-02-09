import React from "react";
import { QuestionElementWrapper } from "./style";

export const QuestionElement = ({question, questionNumber}) => {
  return (
   <>
    <QuestionElementWrapper>
      {questionNumber}.{question}
    </QuestionElementWrapper>
     </>
  );
};
