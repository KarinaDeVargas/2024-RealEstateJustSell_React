import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

function EditProperty() {
  const { id } = useParams();
  const [propertyObject, setPropertyObject] = useState({});
  const [editedData, setEditedData] = useState({
    streetNum: 0,
    streetName: "",
    city: "",
    province: "",
    postal: "",
    description: "",
    price: 0.0,
    bathrooms: 0,
    bedrooms: 0,
    floors: 0,
    size: 0.0,
    furnished: 0,
    propertyType: "",
    yearOfBuilt: 0,
    amenities: "",
    sellOption: "",
    constructionStatus: "",
  });
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [isPrimaryPicture, setIsPrimaryPicture] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://justsell-app-f94be96079f5.herokuapp.com/properties/byId/${id}`
      )
      .then((response) => {
        setPropertyObject(response.data);
        setEditedData(response.data);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    axios
      .put(
        `https://justsell-app-f94be96079f5.herokuapp.com/properties/${id}`,
        editedData
      )
      .then(() => {
        navigate(`/property/${id}`);
      })
      .catch((error) => {
        console.error("Error updating property:", error);
        alert("Failed to update property. Please try again.");
      });
  };
  const submitImage = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("description", description);
      formData.append("propertyID", id);
      formData.append("isPrimaryPicture", isPrimaryPicture);

      await axios.post(
        "https://justsell-app-f94be96079f5.herokuapp.com/images",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Image submitted successfully!");

      navigate("/");
    } catch (error) {
      console.error("Error submitting image:", error);
      alert("Failed to submit image. Please try again.");
    }
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  return (
    <>
      <div className="home">
        <section className="center">
          <Formik
            initialValues={editedData}
            enableReinitialize={true}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form>
              <h3>Edit Property</h3>

              <div className="box">
                <p>Street Number: </p>
                <Field
                  className="input"
                  id="inputCreatePost"
                  name="streetNum"
                  value={editedData.streetNum}
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  name="streetNum"
                  component="span"
                  className="error"
                />
              </div>

              <div className="box">
                <p>Street Name: </p>
                <Field
                  className="input"
                  id="inputCreatePost"
                  name="streetName"
                  value={editedData.streetName}
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  name="streetName"
                  component="span"
                  className="error"
                />
              </div>

              <div className="box">
                <p>City: </p>
                <Field
                  className="input"
                  id="inputCreatePost"
                  name="city"
                  value={editedData.city}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="city" component="span" className="error" />
              </div>

              <div className="box">
                <p>Province: </p>
                <Field
                  className="input"
                  id="inputCreatePost"
                  name="province"
                  value={editedData.province}
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  name="province"
                  component="span"
                  className="error"
                />
              </div>

              <div className="box">
                <p>Postal Code: </p>
                <Field
                  className="input"
                  id="inputCreatePost"
                  name="postal"
                  value={editedData.postal}
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  name="postal"
                  component="span"
                  className="error"
                />
              </div>

              <div className="box">
                <p>Description: </p>
                <Field
                  className="input"
                  id="inputCreatePost"
                  name="description"
                  value={editedData.description}
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  name="description"
                  component="span"
                  className="error"
                />
              </div>

              <div className="box">
                <p>Price: </p>
                <Field
                  className="input"
                  id="inputCreatePost"
                  type="number"
                  name="price"
                  value={editedData.price}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="price" component="span" className="error" />
              </div>

              <div className="box">
                <p>Bathrooms: </p>
                <Field
                  className="input"
                  id="inputCreatePost"
                  type="number"
                  name="bathrooms"
                  value={editedData.bathrooms}
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  name="bathrooms"
                  component="span"
                  className="error"
                />
              </div>

              <div className="box">
                <p>Bedrooms: </p>
                <Field
                  className="input"
                  id="inputCreatePost"
                  type="number"
                  name="bedrooms"
                  value={editedData.bedrooms}
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  name="bedrooms"
                  component="span"
                  className="error"
                />
              </div>

              <div className="box">
                <p>Floors: </p>
                <Field
                  className="input"
                  id="inputCreatePost"
                  type="number"
                  name="floors"
                  value={editedData.floors}
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  name="floors"
                  component="span"
                  className="error"
                />
              </div>

              <div className="box">
                <p>Size: </p>
                <Field
                  className="input"
                  id="inputCreatePost"
                  type="number"
                  name="size"
                  value={editedData.size}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="size" component="span" className="error" />
              </div>

              <div className="box">
                <p>Furnished: </p>
                <Field
                  className="input"
                  as="select"
                  id="inputCreatePost"
                  name="furnished"
                  value={editedData.furnished}
                  onChange={handleInputChange}
                >
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </Field>
              </div>

              <div className="box">
                <p>Property Type: </p>
                <Field
                  className="input"
                  as="select"
                  id="inputCreatePost"
                  name="propertyType"
                  value={editedData.propertyType}
                  onChange={handleInputChange}
                >
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Duplex or Triplex">Duplex or Triplex</option>
                  <option value="Condo">Condo</option>
                  <option value="Commercial Building">
                    Commercial Building
                  </option>
                </Field>
              </div>

              <div className="box">
                <p>Year of Built: </p>
                <Field
                  className="input"
                  id="inputCreatePost"
                  type="number"
                  name="yearOfBuilt"
                  value={editedData.yearOfBuilt}
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  name="yearOfBuilt"
                  component="span"
                  className="error"
                />
              </div>

              <div className="box">
                <p>Amenities: </p>
                <Field
                  className="input"
                  id="inputCreatePost"
                  name="amenities"
                  value={editedData.amenities}
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  name="amenities"
                  component="span"
                  className="error"
                />
              </div>

              <div className="box">
                <p>Offer Type: </p>
                <Field
                  className="input"
                  as="select"
                  id="inputCreatePost"
                  name="sellOption"
                  value={editedData.sellOption}
                  onChange={handleInputChange}
                >
                  <option value="Sale">Sale</option>
                  <option value="Resale">Resale</option>
                  <option value="Leasing">Leasing</option>
                </Field>
              </div>

              <div className="box">
                <p>Construction Status: </p>
                <Field
                  className="input"
                  as="select"
                  id="inputCreatePost"
                  name="constructionStatus"
                  value={editedData.constructionStatus}
                  onChange={handleInputChange}
                >
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                </Field>
              </div>

              <button type="button" className="btn" onClick={handleEditClick}>
                Update Property
              </button>
            </Form>
          </Formik>
        </section>
      </div>
      <div className="home">
        <section className="center">
          <form onSubmit={submitImage}>
            <h3>Attach Image to Property</h3>
            <div className="box">
              <p>Property ID: </p>
              <input
                className="input"
                type="hidden"
                name="propertyID"
                value={id}
              />
            </div>

            <div className="box">
              <p>Image: </p>
              <input
                onChange={fileSelected}
                accept="image/* "
                className="input"
                type="file"
                name="image"
              />
            </div>

            <div className="box">
              <p>Description: </p>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input"
                type="text"
                name="description"
                placeholder="description of the image"
              />
            </div>
            <div className="box">
              <p>Is this primary picture? </p>
              <label>
                <input
                  type="radio"
                  name="isPrimaryPicture"
                  value="true"
                  checked={isPrimaryPicture === true}
                  onChange={() => setIsPrimaryPicture(true)}
                />
                True
              </label>
              <label>
                <input
                  type="radio"
                  name="isPrimaryPicture"
                  value="false"
                  checked={isPrimaryPicture === false}
                  onChange={() => setIsPrimaryPicture(false)}
                />
                False
              </label>
            </div>

            <input className="btn" type="submit" value="Submit" />
          </form>
        </section>
      </div>
    </>
  );
}

export default EditProperty;
