// https://www.youtube.com/watch?v=1yMrdBsep-A
import styled from "styled-components";
import downloadapp from "../images/download_app02.jpg";



// Main Container
export const MainContainerBody = styled.div`    
    background-color: white;
`;

export const FirstInnerContainerBody = styled.div`
    height: 40%;
    background-color: pink;
`;

export const SecondInnerContainerBody = styled.div`
    height: 80%;
    background-color: white;
`;

export const ThirdInnerContainerBody = styled.div`
  background: url(${downloadapp}) no-repeat center;
  background-size: cover;
  height: 70%;
  min-height: 800px;
  background-color: white;
  margin-bottom: 1%;

  @media (max-width: 1200px) {
    height: 60%;
    min-height: 600px;
  }

  @media (max-width: 992px) {
    height: 50%;
    min-height: 500px;
  }

  @media (max-width: 768px) {
    height: 40%;
    min-height: 400px;
  }

  @media (max-width: 768px) {
    height: 30%;
    min-height: 300px;
  }
`;