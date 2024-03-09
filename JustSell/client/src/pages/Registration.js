import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Registration() {
  let navigate = useNavigate();
  const initialValues = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    Phone: "",
    streetNum: 0,
    streetName: "",
    city: "",
    province: "",
    postal: "",
    company: "",
    role: "Client",
    isRealtorApproved: 0,
    realtorCertification: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().min(3).max(15).required("Username is required."),
    firstName: Yup.string().required("First Name is required."),
    lastName: Yup.string().required("Last Name is required."),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    password: Yup.string().min(4).max(20).required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match.")
      .required("Please confirm password."),
    Phone: Yup.string().required("Phone Number is required"),
    role: Yup.string().required("Please select the option."),
  });

  const onSubmit = (data) => {
    axios
      .post("https://justsell-app-f94be96079f5.herokuapp.com/auth", data)
      .then(() => {
        // handle success
        console.log(data);
        alert("Registered successfully!");
        navigate("/login");
      })
      .catch((error) => {
        // handle error
        console.error("AxiosError:", error);
      });
  };

  return (
    <div className="login">
      <div className="center">
        <div className="box-container">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ handleChange, values }) => (
              <Form className="formContainer">
                <h3>Registration</h3>

                <div className="box">
                  <label htmlFor="userName">Username:</label>
                  <Field
                    className="input"
                    id="userName"
                    name="userName"
                    placeholder="Enter your username"
                  />
                  <ErrorMessage
                    name="userName"
                    component="span"
                    className="errorMessage"
                  />
                </div>

                <div className="box">
                  <label htmlFor="password">Password:</label>
                  <Field
                    className="input"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="errorMessage"
                  />
                </div>

                <div className="box">
                  <label htmlFor="confirmPassword">Confirm Password:</label>

                  <Field
                    className="input"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="span"
                    className="errorMessage"
                  />
                </div>

                <div className="box">
                  <label htmlFor="firstName">First Name:</label>

                  <Field
                    className="input"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="span"
                    className="errorMessage"
                  />
                </div>

                <div className="box">
                  <label htmlFor="lastName">Last Name:</label>

                  <Field
                    className="input"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="span"
                    className="errorMessage"
                  />
                </div>

                <div className="box">
                  <label htmlFor="email">Email:</label>

                  <Field
                    className="input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="errorMessage"
                  />
                </div>

                <div className="box">
                  <label htmlFor="Phone">Phone Number:</label>

                  <Field
                    className="input"
                    id="Phone"
                    name="Phone"
                    placeholder="Enter your phone number"
                  />
                  <ErrorMessage
                    name="Phone"
                    component="span"
                    className="errorMessage"
                  />
                </div>

                <div className="box">
                  <label htmlFor="role">User Role:</label>

                  <Field
                    as="select"
                    className="input"
                    id="role"
                    name="role"
                    onChange={handleChange}
                  >
                    <option value="Client">Client</option>
                    <option value="Realtor">Realtor</option>
                  </Field>
                  <ErrorMessage
                    name="role"
                    component="span"
                    className="errorMessage"
                  />
                </div>

                {/* Conditionally render fields based on the selected role */}
                {values.role === "Realtor" && (
                  <>
                    <div className="box">
                      <label htmlFor="company">Company:</label>
                      <ErrorMessage name="company" component="span" />
                      <Field
                        className="input"
                        id="company"
                        name="company"
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div className="box">
                      <label htmlFor="realtorCertification">
                        Upload Realtor Certification:
                      </label>
                      <ErrorMessage
                        name="realtorCertification"
                        component="span"
                      />
                      <Field
                        className="input"
                        type="file"
                        id="realtorCertification"
                        name="realtorCertification"
                        // onChange={handleUpload}
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="btn"
                  value="Register Now"
                  onChange={onSubmit}
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default Registration;
