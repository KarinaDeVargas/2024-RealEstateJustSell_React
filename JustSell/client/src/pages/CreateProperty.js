import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProperty() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [authState, setAuthState] = useState({
    username: "",
    userID: 0,
    status: false,
    role: "",
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          "https://justsell-app-f94be96079f5.herokuapp.com/auth/auth",
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        );
        if (response.data.error) {
          setAuthState((prevState) => ({ ...prevState, status: false }));
          setError("You are not logged in. Please log in to access this page.");
        } else {
          setAuthState((prevState) => ({
            ...prevState,
            username: response.data.userName,
            userID: response.data.userID,
            status: true,
            role: response.data.role,
          }));
          setError("");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthState((prevState) => ({ ...prevState, status: false }));
        setError("Error checking authentication. Please try again.");
      }
    };
    checkAuthentication();
  }, []);

  const initialValues = {
    streetNum: "",
    streetName: "",
    city: "",
    province: "",
    postal: "",
    description: "",
    price: "",
    bathrooms: "",
    bedrooms: "",
    floors: "",
    size: "",
    furnished: "",
    propertyType: "",
    yearOfBuilt: "",
    amenities: "",
    sellOption: "",
    constructionStatus: "",
  };

  const validationSchema = Yup.object().shape({
    streetNum: Yup.number().required("Street Number is required field.").min(0),
    streetName: Yup.string().required("Street Name is required field."),
    city: Yup.string().required("City is required field."),
    province: Yup.string().required("Province is required field."),
    postal: Yup.string().required("Postal Code is required field."),
    description: Yup.string().required("Description is required field."),
    price: Yup.number().required("Price is required field.").min(0),
    bathrooms: Yup.number().required("Bathrooms is required field.").min(0),
    bedrooms: Yup.number().required("Bedrooms is required field.").min(0),
    floors: Yup.number().required("Floors is required field.").min(0),
    size: Yup.number().required("Size is required field.").min(0),
    furnished: Yup.number().required("Please select the option."),
    propertyType: Yup.string().required("Please select the option."),
    yearOfBuilt: Yup.number()
      .required("Year of Built is required field.")
      .min(0),
    amenities: Yup.string().required("Amenities is required field."),
    sellOption: Yup.string().required("Please select the option."),
    constructionStatus: Yup.string().required("Please select the option."),
  });

  const onSubmit = (data) => {
    const propertyData = { ...data, userID: authState.userID };
    axios
      .post(
        "https://justsell-app-f94be96079f5.herokuapp.com/properties",
        propertyData
      )
      .then((response) => {
        navigate("/listings");
      })
      .catch((error) => {
        console.error("Error creating property:", error);
        setError("Error creating property. Please try again.");
      });
  };

  if (!authState.status) {
    return (
      <div className="usersPanel">
        <section className="center">
          <p style={{ fontSize: "25px", color: "red", textAlign: "center" }}>
            You are not logged in. Please log in to access this page.
          </p>
        </section>
      </div>
    );
  }

  if (authState.role !== "Realtor") {
    return (
      <div className="usersPanel">
        <section className="center">
          <p style={{ fontSize: "25px", color: "red", textAlign: "center" }}>
            You do not have permission to access this page.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="home">
      <section className="center">
        {error && (
          <p style={{ fontSize: "25px", color: "red", textAlign: "center" }}>
            {error}
          </p>
        )}
        {!error && (
          <>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <h3>Creating Property</h3>

                <div className="box">
                  <p>Street Number: </p>
                  <Field
                    className="input"
                    id="inputCreatePost"
                    name="streetNum"
                  />
                  <ErrorMessage
                    name="streetNum"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>Street Name: </p>
                  <Field
                    className="input"
                    id="inputCreatePost"
                    name="streetName"
                  />
                  <ErrorMessage
                    name="streetName"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>City: </p>
                  <Field className="input" id="inputCreatePost" name="city" />
                  <ErrorMessage
                    name="city"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>Province: </p>
                  <Field
                    className="input"
                    id="inputCreatePost"
                    name="province"
                  />
                  <ErrorMessage
                    name="province"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>Postal Code: </p>
                  <Field className="input" id="inputCreatePost" name="postal" />
                  <ErrorMessage
                    name="postal"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>Description: </p>
                  <Field
                    className="input"
                    id="inputCreatePost"
                    name="description"
                  />
                  <ErrorMessage
                    name="description"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>Price: </p>
                  <Field
                    className="input"
                    id="inputCreatePost"
                    type="number"
                    name="price"
                  />
                  <ErrorMessage
                    name="price"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>Bathrooms: </p>
                  <Field
                    className="input"
                    id="inputCreatePost"
                    type="number"
                    name="bathrooms"
                  />
                  <ErrorMessage
                    name="bathrooms"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>Bedrooms: </p>
                  <Field
                    className="input"
                    id="inputCreatePost"
                    type="number"
                    name="bedrooms"
                  />
                  <ErrorMessage
                    name="bedrooms"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>Floors: </p>
                  <Field
                    className="input"
                    id="inputCreatePost"
                    type="number"
                    name="floors"
                  />
                  <ErrorMessage
                    name="floors"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>Size: </p>
                  <Field
                    className="input"
                    id="inputCreatePost"
                    type="number"
                    name="size"
                  />
                  <ErrorMessage
                    name="size"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>Furnished: </p>
                  <Field
                    className="input"
                    as="select"
                    id="inputCreatePost"
                    name="furnished"
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </Field>
                  <ErrorMessage
                    name="furnished"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>Property Type: </p>
                  <Field
                    className="input"
                    as="select"
                    id="inputCreatePost"
                    name="propertyType"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Duplex or Triplex">Duplex or Triplex</option>
                    <option value="Condo">Condo</option>
                    <option value="Commercial Building">
                      Commercial Building
                    </option>
                  </Field>
                  <ErrorMessage
                    name="propertyType"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>Year of Built: </p>
                  <Field
                    className="input"
                    id="inputCreatePost"
                    type="number"
                    name="yearOfBuilt"
                  />
                  <ErrorMessage
                    name="yearOfBuilt"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>Amenities: </p>
                  <Field
                    className="input"
                    id="inputCreatePost"
                    name="amenities"
                  />
                  <ErrorMessage
                    name="amenities"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>Offer Type: </p>
                  <Field
                    className="input"
                    as="select"
                    id="inputCreatePost"
                    name="sellOption"
                  >
                    <option value="Sale">Sale</option>
                    <option value="Resale">Resale</option>
                    <option value="Leasing">Leasing</option>
                  </Field>
                  <ErrorMessage
                    name="sellOption"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <div className="box">
                  <p>Construction Status: </p>
                  <Field
                    className="input"
                    as="select"
                    id="inputCreatePost"
                    name="constructionStatus"
                  >
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">
                      Under Construction
                    </option>
                  </Field>
                  <ErrorMessage
                    name="constructionStatus"
                    component="span"
                    className="error"
                    style={{ fontSize: "15px", color: "red" }}
                  />
                </div>

                <button type="submit" className="btn">
                  Create Property
                </button>
              </Form>
            </Formik>
          </>
        )}
      </section>
    </div>
  );
}

export default CreateProperty;
