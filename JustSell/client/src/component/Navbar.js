import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LogoImg from "../images/logo.png";
import { AuthContext } from "../helpers/AuthContext";
import {
  LeftContainer,
  LoggedInContainer,
  Logo,
  LogoutBtn,
  NavbarContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLink,
  NavbarLinkContainer,
  NavbarLinkExtended,
  OpenLinksButton,
  RightContainer,
  WelcomeContainer,
} from "../styles/Navbar.style";

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      userName: "",
      userID: 0,
      status: false,
    });
  };
  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/">Home Page</NavbarLink>
            <NavbarLink to="/search">Search</NavbarLink>
            <NavbarLink to="/listings">Listings</NavbarLink>

            {authState.status && authState.role === "Realtor" && (
              <NavbarLink to="/createProperty">Create Property</NavbarLink>
            )}

            {authState.status && authState.role === "Admin" && (
              <NavbarLink to="/admin">Admin</NavbarLink>
            )}

            {!authState.status && (
              <>
                <NavbarLink to="/login"> Login</NavbarLink>
                <NavbarLink to="/registration"> Registration</NavbarLink>
              </>
            )}
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          {authState.status ? (
            <LoggedInContainer>
              <WelcomeContainer>
                <h3>Welcome! {authState.userName}</h3>
              </WelcomeContainer>

              <LogoutBtn>
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              </LogoutBtn>
            </LoggedInContainer>
          ) : null}

          <Logo src={LogoImg}></Logo>
        </RightContainer>
      </NavbarInnerContainer>

      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/">Home Page</NavbarLinkExtended>
          <NavbarLinkExtended to="/search">Search</NavbarLinkExtended>
          <NavbarLinkExtended to="/listings">Listings</NavbarLinkExtended>

          {authState.status && authState.role === "Realtor" && (
            <NavbarLinkExtended to="/createProperty">
              Create Property
            </NavbarLinkExtended>
          )}

          {authState.status && authState.role === "Admin" && (
            <NavbarLinkExtended to="/admin">Admin</NavbarLinkExtended>
          )}

          <NavbarLinkExtended to="/login">Login</NavbarLinkExtended>
          <NavbarLinkExtended to="/registration">
            Registration
          </NavbarLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
