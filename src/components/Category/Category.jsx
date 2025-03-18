import React from "react";
import { CategoryContainer, Icon, Row } from "./style";

const Category = ({ icon, text, amountValue }) => {
  return (
    <CategoryContainer>
      <Icon as={icon} />
      <Row>
        <p>{text}</p>
        <h3>{amountValue}</h3>
      </Row>
    </CategoryContainer>
  );
};

export default Category;
