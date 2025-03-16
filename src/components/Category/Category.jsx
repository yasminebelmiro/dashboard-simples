import React from "react";
import { CategoryContainer, Icon, Row } from "./style";

const Category = ({ icon, text, amountValue }) => {
  return (
    <CategoryContainer>
      <Icon as={icon} />
      <Row>
        <p>{text}</p>
        <h1>{amountValue}</h1>
      </Row>
    </CategoryContainer>
  );
};

export default Category;
