// https://www.youtube.com/watch?v=1yMrdBsep-A

import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavbarContainer = styled.nav`
  width: 100%;
  height: ${(props) =>
    props.extendNavbar ? "100vh" : "80px"}; // find solution
  background-color: black;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 3;

  @media (min-width: 700px) {
    height: 80px;
  }
`;

// Navbar divided in left and right
export const LeftContainer = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;
  padding-left: 5%;
`;

export const RightContainer = styled.div`
  flex: 30%;
  display: flex;
  justify-content: flex-end;
  padding-right: 50px;
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  position: fixed;
`;

// div that contains the links
export const NavbarLinkContainer = styled.div`
  display: flex;
`;

// slyle for the links
export const NavbarLink = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 5px;
  padding: 10px;

  &:hover {
    background-color: rgb(3, 59, 81);
    color: black;
    border-radius: 5px;
    padding: 10px;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
`;

export const Logo = styled.img`
  margin: 5px;
  max-width: 200px;
  height: auto;
`;

export const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 45px;
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 700px) {
    display: none;
  }
`;

export const LoggedInContainer = styled.div`
  height: 80%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

export const LogoutBtn = styled.div`
  padding-left: 60px;
  padding-right: 60px;
  /* background-color: rgb(3, 59, 81); */
  /* flex: 50%;
  height: 80%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer; */
`;

export const WelcomeContainer = styled.div`
  //background-color: rgb(3, 59, 81);
  padding-top: 15px;
  color: white;
  font-size: large;
  font-family: Arial, Helvetica, sans-serif;
`;
