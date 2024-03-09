import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate, useParams } from "react-router-dom";

const Property = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const deleteImage = async (id) => {
    await axios.delete(
      `https://justsell-app-f94be96079f5.herokuapp.com/images/${id}`
    );
    setImages(images.filter((image) => image.imageID !== id));
  };

  const [authState, setAuthState] = useState({
    username: "",
    userID: 0,
    status: false,
    role: "",
  });

  const [realtorInfo, setRealtorInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authResponse = await axios.get(
          "https://justsell-app-f94be96079f5.herokuapp.com/auth/auth",
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        );

        if (!authResponse.data.error) {
          setAuthState((prevState) => ({
            username: authResponse.data.userName,
            userID: authResponse.data.userID,
            status: true,
            role: authResponse.data.role,
          }));

          const propertyResponse = await axios.get(
            `https://justsell-app-f94be96079f5.herokuapp.com/properties/byId/${id}`,
            {
              params: { include: "user" },
            }
          );

          setProperty(propertyResponse.data);

          if (propertyResponse.data.userID) {
            const realtorResponse = await axios.get(
              `https://justsell-app-f94be96079f5.herokuapp.com/auth/${propertyResponse.data.userID}`
            );
            setRealtorInfo(realtorResponse.data);
          }

          const imagesResponse = await axios.get(
            `https://justsell-app-f94be96079f5.herokuapp.com/images/${id}`
          );

          setImages(imagesResponse.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const renderImages = () => {
    return (
      <Swiper
        navigation={true}
        modules={[Navigation]}
        centeredSlides={true}
        className="mySwiper  images-container "
      >
        {images.map((image) => (
          <SwiperSlide>
            <img
              key={image.imageID}
              src={image.imageUrl}
              alt="Missing the property picture"
            />
            {isPropertyRealtor && (
              <button
                className="btn"
                onClick={() => deleteImage(image.imageID)}
              >
                delete
              </button>
            )}
          </SwiperSlide>
        ))}
        ;
      </Swiper>
    );
  };

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "payment was successful",
      time: 3000,
    });
  };

  const handleFailure = () => {
    MySwal.fire({
      icon: "error",
      title: "payment was cancled",
      time: 3000,
    });
  };

  const makePayment = (token) => {
    const body = {
      token,
      property,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch("https://justsell-app-f94be96079f5.herokuapp.com/payment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) {
          handleSuccess();
          const data = { propertyID: id };
          axios
            .post(
              "https://justsell-app-f94be96079f5.herokuapp.com/payment/payment",
              data,
              {
                headers: { accessToken: localStorage.getItem("accessToken") },
              }
            )
            .then((response) => {
              console.log("payment complete");
            });
        }
      })
      .catch((err) => {
        handleFailure();
        console.log(err);
      });
  };

  const renderAmenities = () => {
    // Assuming property.Amenities is a string with amenities separated by commas
    const amenitiesList = property.amenities
      ? property.amenities.split(",")
      : [];

    return amenitiesList.map((amenity, index) => (
      <p key={index}>
        <i className="fas fa-check"></i>
        <span>{amenity.trim()}</span>
      </p>
    ));
  };

  const renderDetails = () => {
    return (
      <div className="details">
        {renderImages()}
        <h3 className="name">{property.propertyType}</h3>
        <p className="location">
          <i className="fas fa-map-marker-alt"></i>
          <span>{`${property.streetNum} ${property.streetName}, ${property.city}, ${property.province}, ${property.postal}`}</span>
        </p>
        <div className="info">
          <p>
            <i className="fas fa-dollar-sign"></i>
            <span>{new Intl.NumberFormat("en-US").format(property.price)}</span>
          </p>
          <p>
            <i className="fas fa-building"></i>
            <span>{property.propertyType}</span>
          </p>
          <p>
            <i className="fas fa-house"></i>
            <span>{property.sellOption}</span>
          </p>
          <p>
            <i className="fas fa-calendar"></i>
            <span>{property.constructionStatus}</span>
          </p>
        </div>
        <h3 className="title">Details</h3>
        <div className="flex">
          <div className="box">
            <p>
              <i>Down Payment (1%) :</i>
              <span>
                <span
                  className="fas fa-dollar-sign"
                  style={{ marginRight: ".5rem" }}
                ></span>
                {new Intl.NumberFormat("en-US").format(property.price / 100)}
              </span>
            </p>
            <p>
              <i>Bedroom :</i>
              <span>{property.bedrooms}</span>
            </p>
            <p>
              <i>Bathroom :</i>
              <span>{property.bathrooms}</span>
            </p>
          </div>
          <div className="box">
            <p>
              <i>Built in :</i>
              <span>{property.yearOfBuilt}</span>
            </p>
            <p>
              <i>Total Floors :</i>
              <span>{property.floors}</span>
            </p>
            <p>
              <i>Furnished :</i>
              <span>
                {property.furnished === 1 ? "Furnished" : "Not Furnished"}
              </span>
            </p>
          </div>
        </div>
        <h3 className="title">Amenities</h3>
        <div className="flex">
          <div className="box">{renderAmenities()}</div>
        </div>
        <h3 className="title">Description</h3>
        <p className="description">{property.description}</p>
        <h3 className="title">Realtor Information</h3>
        <div className="info">
          <p>
            <i className="fas fa-user"></i>
            <span>
              Name: {realtorInfo.firstName} {realtorInfo.lastName}
            </span>
          </p>
          <p>
            <i className="fas fa-phone"></i>
            <span>Contact Number: {realtorInfo.Phone}</span>
          </p>
          <p>
            <i className="fas fa-building"></i>
            <span>Company: {realtorInfo.company}</span>
          </p>
        </div>

        {isPropertyRealtor && (
          <div className="flex-btn">
            <div className="btn" onClick={editProperty}>
              Edit Property
            </div>
            <div className="btn" onClick={deleteProperty}>
              Delete Property
            </div>
          </div>
        )}
        {isClient && (
          <div className="flex-btn">
            <StripeCheckout
              stripeKey={process.env.REACT_APP_STRIPE_KEY}
              token={makePayment}
              name="Down Payment"
              amount={property.price}
            >
              <div className="btn " id="offerbtn">
                Send Offer
              </div>
            </StripeCheckout>
          </div>
        )}
      </div>
    );
  };

  const isRealtor = authState.role === "Realtor";
  const isClient = authState.role === "Client";
  const isPropertyRealtor = isRealtor && property.userID === authState.userID;

  useEffect(() => {
    const fetchRealtorInfo = async (userID) => {
      try {
        const response = await axios.get(
          `https://justsell-app-f94be96079f5.herokuapp.com/auth/${userID}`
        );
        setRealtorInfo(response.data);
      } catch (error) {
        console.error("Error fetching realtor information:", error);
      }
    };

    const getPropertyDetails = async () => {
      try {
        const propertyResponse = await axios.get(
          `https://justsell-app-f94be96079f5.herokuapp.com/properties/byId/${id}`,
          {
            params: { include: "user" },
          }
        );

        setProperty(propertyResponse.data);

        if (propertyResponse.data.userID) {
          // Use propertyResponse.data.userID to fetch realtorInfo
          fetchRealtorInfo(propertyResponse.data.userID);
        }

        const imagesResponse = await axios.get(
          `https://justsell-app-f94be96079f5.herokuapp.com/images/${id}`
        );

        setImages(imagesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching property details:", error);
        setLoading(false);
      }
    };

    // Check if there's an authenticated user
    const isAuthenticated = async () => {
      try {
        const response = await axios.get(
          "https://justsell-app-f94be96079f5.herokuapp.com/auth/auth",
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        );

        if (!response.data.error) {
          setAuthState((prevState) => ({
            username: response.data.userName,
            userID: response.data.userID,
            status: true,
            role: response.data.role,
          }));
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    getPropertyDetails();
    isAuthenticated();
  }, [id]);

  const editProperty = () => {
    navigate(`/editProperty/${id}`);
  };

  const deleteProperty = () => {
    axios
      .delete(
        `https://justsell-app-f94be96079f5.herokuapp.com/properties/${id}`
      )
      .then(() => {
        window.alert("Property deleted successfully!");
        navigate("/listings");
      })
      .catch((error) => {
        console.error("Error deleting property:", error);
      });
  };

  return (
    <section className="view-property">
      <h1 className="heading">Property Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : property.propertyID ? (
        renderDetails()
      ) : (
        <p className="empty">Property not found! </p>
      )}
    </section>
  );
};

export default Property;
