import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

import Admin from "./pages/Admin";
import CreateProperty from "./pages/CreateProperty";
import EditProperty from "./pages/EditProperty";
import EditUser from "./pages/EditUser";
import Filter from "./pages/Filter";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Login from "./pages/Login";
import Property from "./pages/Property";
import Registration from "./pages/Registration";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    userID: 0,
    role: "",
    status: false,
  });

  useEffect(() => {
    axios
      .get("https://justsell-app-f94be96079f5.herokuapp.com/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log("Server Response:", response);
        if (response.data.error) {
          setAuthState({ ...authState, status: false }); //destructor the object
        } else {
          setAuthState({
            userName: response.data.userName,
            userID: response.data.userID,
            status: true,
            role: response.data.role,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Filter />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/createProperty" element={<CreateProperty />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/property/:id" element={<Property />} />
            <Route path="/editProperty/:id" element={<EditProperty />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/editUser/:userID" element={<EditUser />} />
          </Routes>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
