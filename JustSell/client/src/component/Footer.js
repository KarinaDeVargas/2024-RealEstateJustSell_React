// https://www.youtube.com/watch?v=wTs6Oa4m47o

import React, { useState } from "react";
import {
  FooterColumn,
  FooterContainer,
  FooterContent
} from "../styles/Footer.style";

function Footer() {
  const [extendFooter, setExtendFooter] = useState(false);

  return (

  <FooterContainer>
  <FooterContent>
    <FooterColumn>
      <div className="footerbox">
        <a><i className="fas fa-phone"></i><span>(514) 909-0909</span></a>
        <a><i className="fas fa-fax"></i><span>(514) 909-8889</span></a>
        <a><i className="fas fa-envelope"></i><span>JustSell@gmail.com</span></a>
        <a><i className="fas fa-map-marker-alt"></i><span>Montreal, Quebec - H1X 1A1</span></a>
      </div>
    </FooterColumn>

    <FooterColumn>
      <div className="footerbox">
        <a><i className="fab fa-facebook-f"></i><span>Facebook</span></a>
        <a><i className="fab fa-twitter"></i><span>Twitter</span></a>
        <a><i className="fab fa-linkedin"></i><span>Linkedin</span></a>
        <a><i className="fab fa-instagram"></i><span>Instagram</span></a>
      </div>
      </FooterColumn>
      </FooterContent>

      {/* <CreditContainer>
        <Credit>&copy; copyright by <span>JustSell.fake.org.jac</span> | All Rights Reserved!</Credit>
      </CreditContainer> */}
    </FooterContainer>
  );
}

export default Footer;
