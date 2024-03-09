import React from "react";
import { useNavigate } from "react-router-dom";

function Filter() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleListingsClick = () => {
    navigate("/listings");
  };

  return (
    <div className="home">
      <div className="center">
        <div className="box-container">
          <div className="formcontainer">
            <h1 className="heading">Find your home here!</h1>
            <div className="button-container">
              <button className="btn" onClick={handleSearchClick}>
                Search your perfect home
              </button>
              <button className="btn" onClick={handleListingsClick}>
                See our listings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
