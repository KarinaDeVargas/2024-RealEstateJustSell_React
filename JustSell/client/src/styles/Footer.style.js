// https://www.youtube.com/watch?v=1yMrdBsep-A

//color: #e59524;

import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: #666;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 20px; */
`;

export const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px; /* Adjust the max-width as needed */
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

export const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  margin: 5px 0;
  display: flex;
  align-items: center;

  i {
    margin-right: 5px;
  }
`;

export const CreditContainer = styled.div`
  margin-top: 20px;
`;

export const Credit = styled.div`
  color: #e59524;
`;
