import React from "react";
import { CardContainer } from "./style";

const Card = ({ ...props }) => {
  return (
    <CardContainer>
      <p>{props.text}</p>
      {props.children}
    </CardContainer>
  );
};

export default Card;
