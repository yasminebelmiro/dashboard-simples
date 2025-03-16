import React from "react";
import { HomeContainer, Row } from "./Style";
import { FaHouse } from "react-icons/fa6";

import Summary from "../../components/Summary/Summary"
import Card from "../../components/Card/Card"
import Category from "../../components/Category/Category"
const Home = () => {
  return (
    <HomeContainer>
      <Row>
        <Summary text="Saldo" amountValue="R$" />
        <Summary text="Entradas" amountValue="R$" />
        <Summary text="Despesas" amountValue="R$" />
      </Row>
      <div>
        <Row>
          <Card text="Top 5 Entradas por categoria" />
          <Card text="Top 5 Despesas por categoria" />
        </Row>
        <Row>
          <Card text="Evolução mensal: depesas vs entradas" />
          <Card text="Evolução mensal: depesas vs entradas" >
            <Row>
              <Category icon={FaHouse} text="Moradia" amountValue="R$" />
              <Category icon={FaHouse} text="Lazer" amountValue="R$" />
            </Row>
            <Row>
              <Category icon={FaHouse} text="Cartão" amountValue="R$" />
              <Category icon={FaHouse} text="Transporte" amountValue="R$" />
            </Row>
          </Card>
          
        </Row>
      </div>
    </HomeContainer>
  );
};

export default Home;
