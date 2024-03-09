import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Listings() {
  const [listOfProperties, setListOfProperties] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://justsell-app-f94be96079f5.herokuapp.com/properties"
        );
        const updatedProperties = response.data;
        setListOfProperties(updatedProperties);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <section className="listings">
        <div className="listings-box">
          <h1 class="heading">All Listings</h1>
          <div className="box-container">
            {listOfProperties.map((property) => (
              <form key={property.propertyID} action="" method="POST">
                <div className="box">
                  {/* Review input existence .kvp */}
                  <input
                    type="hidden"
                    name="PropertyID"
                    value={property.propertyID}
                  />
                  <div className="thumb">
                    <img src={property.imageUrl} alt="the property picture" />
                  </div>
                </div>
                <div className="box">
                  <div className="price">
                    <i className="fas fa-dollar-sign"></i>
                    <span>
                      {new Intl.NumberFormat("en-US").format(property.price)}
                    </span>
                  </div>
                  <h3 className="name">{property.propertyType}</h3>
                  <p className="location">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{property.city}</span>
                  </p>
                  <div className="flex">
                    <p>
                      <i className="fas fa-house"></i>
                      <span>{property.propertyType}</span>
                    </p>
                    <p>
                      <i className="fas fa-bed"></i>
                      <span>{property.bedrooms}</span>
                    </p>
                    <p>
                      <i className="fas fa-trowel"></i>
                      <span>{property.constructionStatus}</span>
                    </p>
                    <p>
                      <i className="fas fa-couch"></i>
                      <span>
                        {property.furnished === 1
                          ? "Furnished"
                          : "Not Furnished"}
                      </span>
                    </p>
                    <p>
                      <i className="fas fa-maximize"></i>
                      <span>{property.size} sqft</span>
                    </p>
                  </div>
                  <div class="flex-btn">
                    <div
                      class="btn"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/property/${property.propertyID}`);
                      }}
                    >
                      View Details
                    </div>
                  </div>
                </div>
              </form>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Listings;
