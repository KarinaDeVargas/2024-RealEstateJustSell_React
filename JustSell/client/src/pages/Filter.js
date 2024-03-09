import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Filter() {
  let navigate = useNavigate();

  const [listOfProperties, setListProperties] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [errors, setErrors] = useState({});
  const validationSchema = Yup.object().shape({
    location: Yup.string().max(50, "Must be 50 characters or less"),
  });
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.get(
        "https://justsell-app-f94be96079f5.herokuapp.com/properties/search",
        { params: values }
      );
      console.log("Response data:", response.data);
      setListProperties(response.data);
      setSearchPerformed(true);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);

      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <div className="listingsFilter">
        <div className="center">
          <section className="filters" style={{ paddingBottom: 0 }}>
            <Formik
              initialValues={{
                location: "",
                sellOption: "sale",
                propertyType: "apartment",
                bedrooms: "1",
                minBudget: "0",
                maxBudget: "50000",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="form">
                <div id="close-filter">
                  <i className="fas fa-times"></i>
                </div>
                <h3>Filter your search</h3>
                <div className="flex">
                  <div className="box">
                    <p>Location</p>
                    <Field
                      type="text"
                      name="location"
                      required
                      maxLength="50"
                      placeholder="Search by city or Postal code"
                      className="input"
                    />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="box">
                    <p>Offer type</p>
                    <Field
                      as="select"
                      name="sellOption"
                      className="input"
                      required
                    >
                      <option value="sale">Sale</option>
                      <option value="resale">Resale</option>
                      <option value="leasing">Leasing</option>
                    </Field>
                  </div>
                  <div className="box">
                    <p>Property type</p>
                    <Field
                      as="select"
                      name="propertyType"
                      className="input"
                      required
                    >
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="duplexTriplex">Duplex or Triplex</option>
                      <option value="condo">Condo</option>
                      <option value="commercialBuilding">
                        Commercial Building
                      </option>
                    </Field>
                  </div>
                  <div className="box">
                    <p>Bedrooms</p>
                    <Field
                      as="select"
                      name="bedrooms"
                      className="input"
                      required
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6+</option>
                    </Field>
                  </div>
                  <div className="box">
                    <p>Minimum budget</p>
                    <Field as="select" name="min" className="input" required>
                      <option value="0">0</option>
                      <option value="50000">50k</option>
                      <option value="100000">100k</option>
                      <option value="150000">150k</option>
                      <option value="200000">200k</option>
                      <option value="300000">300k</option>
                      <option value="400000">400k</option>
                      <option value="450000">450k</option>
                      <option value="500000">500k</option>
                      <option value="1000000">1M</option>
                    </Field>
                  </div>
                  <div className="box">
                    <p>Maximum budget</p>
                    <Field as="select" name="max" className="input" required>
                      <option value="50000">50k</option>
                      <option value="100000">100k</option>
                      <option value="150000">150k</option>
                      <option value="200000">200k</option>
                      <option value="300000">300k</option>
                      <option value="400000">400k</option>
                      <option value="450000">450k</option>
                      <option value="500000">500k</option>
                      <option value="1000000">1M+</option>
                    </Field>
                  </div>
                </div>
                <button type="submit" className="btn">
                  Search Property
                </button>
              </Form>
            </Formik>
          </section>
          {/* <div id="filter-btn" className="fas fa-filter"></div> */}
        </div>
      </div>

      <section className="listings">
        {searchPerformed ? (
          <>
            {listOfProperties.length > 0 ? (
              <>
                <h1 className="heading">Search Results</h1>
                <div className="box-container">
                  {listOfProperties.map((property) => (
                    <form>
                      <div key={property.propertyID} className="box">
                        <input
                          type="hidden"
                          name="propertyID"
                          value={property.propertyID}
                        />
                        <div className="thumb">
                          <img src={property.imageUrl} alt="Property" />
                        </div>
                      </div>
                      <div className="box">
                        <div className="price">
                          <i className="fas fa-dollar-sign"></i>
                          <span>
                            {property.price
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
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
                              {property.furnished
                                ? "furnished"
                                : "not furnished"}
                            </span>
                          </p>
                          <p>
                            <i className="fas fa-maximize"></i>
                            <span>{property.size}sqft</span>
                          </p>
                        </div>
                        <div className="flex-btn">
                          <div
                            className="btn"
                            onClick={() => {
                              navigate(`/property/${property.propertyID}`);
                            }}
                          >
                            View Details
                          </div>
                          {/* <StripeCheckout
                              stripeKey={process.env.REACT_APP_STRIPE_KEY}
                              token={(token) => makePayment(token, property)}
                              name="Down Payment"
                              amount={property.price}
                            >
                              <button className="btn">Send Offer</button>
                            </StripeCheckout> */}
                        </div>
                      </div>
                    </form>
                  ))}
                </div>
              </>
            ) : (
              <p className="heading">No result found</p>
            )}
          </>
        ) : (
          <h1 className="heading">Find your new Home!</h1>
        )}
      </section>
    </>
  );
}

export default Filter;
