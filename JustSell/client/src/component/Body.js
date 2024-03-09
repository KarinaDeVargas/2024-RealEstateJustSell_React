import React from "react";
import service247Image from "../images/247Service.png";
import buyApartmentImage from "../images/buyApartment.png";
import buyCommercialImage from "../images/buyComercial.png";
import buyHouseImage from "../images/buyHouse.png";
import consultSpecialistImage from "../images/consultSpecialist.jpg";
import sellYourPropertyImage from "../images/sellYourProperty.png";
import HomeFilter from "../pages/HomeFilter";
import {
  FirstInnerContainerBody,
  MainContainerBody,
  SecondInnerContainerBody,
  ThirdInnerContainerBody
} from "../styles/Body.style";




const Body = () => {
    return (
        <MainContainerBody>
          <FirstInnerContainerBody>
        
            <HomeFilter />
          </FirstInnerContainerBody>
    
          <SecondInnerContainerBody>
            <section className="services">
              <h1 className="heading">Our Services</h1>
              <div className="box-container">
                <div className="box">
                  <img src={buyHouseImage} alt="Buy House" />
                  <h3>Buy House</h3>
                  <p>A luxury consumer marketplace connecting discerning buyers with the world's finest homes and the agents representing them.</p>
                </div>
    
                <div className="box">
                  <img src={buyApartmentImage} alt="Buy Apartment" />
                  <h3>Buy Apartment</h3>
                  <p>Are you looking for an apartment to buy? <br /> We have a fine selected list of current properties, check our portfolio.</p>
                </div>
    
                <div className="box">
                  <img src={buyCommercialImage} alt="Buy Commercial" />
                  <h3>Buy Commercial Building</h3>
                  <p>We help companies purchase their real estate. Whatever your company is looking to accomplish with real estate, we can help.</p>
                </div>
    
                <div className="box">
                  <img src={consultSpecialistImage} alt="Consult Specialist" />
                  <h3>Consult Specialist</h3>
                  <p>Need the best realtor to help you buy a property? We are here to help. Contact one of our specialized agents.</p>
                </div>
    
                <div className="box">
                  <img src={sellYourPropertyImage} alt="Sell Your Property" />
                  <h3>Sell Your Property</h3>
                  <p>Just Sell understands that every property is unique and we are happy to discuss the best strategy for a successful sale.</p>
                </div>
    
                <div className="box">
                  <img src={service247Image} alt="24/7 Service" />
                  <h3>24/7 Service</h3>
                  <p>We offer dependable, on-demand support, 24/7 technical and remote support in over 100 countries worldwide.</p>
                </div>
              </div>
            </section>
          </SecondInnerContainerBody>
    
          <ThirdInnerContainerBody>
            
          </ThirdInnerContainerBody>
        </MainContainerBody>
      );
    };
    
export default Body;

