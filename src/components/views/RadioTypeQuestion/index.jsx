import React, { useState } from "react";
import { QuestionElement } from "../../elements/QuestionElement";
import RadioElement from "../../elements/RadioElement";

export const RadioTypeQuestion = ({values,onChangeValue}) => {
  return (
    <div><QuestionElement question={values?.question} questionNumber={values?.qn}/>
      {values?.value}
      <RadioElement
        optionsList={values?.optionsList}
        value={values?.value}
        onChangeValue={(v)=>onChangeValue(v,values?.qn)}
      />
    </div>
  );
};
