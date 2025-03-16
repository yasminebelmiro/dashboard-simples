import React from "react";
import { SummaryContainer } from "./style";

const Summary = ({ ...props }) => {
  return (
    <SummaryContainer>
      <p>{props.text} </p>
      <h1>{props.amountValue} </h1>
    </SummaryContainer>
  );
};

export default Summary;
