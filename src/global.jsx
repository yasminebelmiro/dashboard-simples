import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root{
--purple-100: #27005D;
--purple-200: #9400FF;
--blue: #AED2FF;
}

*{
padding: 0;
margin: 0;
box-sizing: border-box;
}

body{
background-color: var(--purple-100);
width: 100wh;
height: 100vh;
}

`;
