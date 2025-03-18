import styled from "styled-components";

export const HomeContainer = styled.section`
width: 100%;
padding:0 50px;
display: flex
flex-direction: column;
align-items: center;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 20px 0;
`;

export const Grid = styled.div`
  padding: 20px 0;
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;
