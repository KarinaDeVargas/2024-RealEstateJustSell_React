import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
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
        const response = await axios.get("https://justsell-app-f94be96079f5.herokuapp.com/auth/auth", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        });
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
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthState((prevState) => ({ ...prevState, status: false }));
        setError("Error checking authentication. Please try again.");
      }
    };
    checkAuthentication();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authState.status) {
          setError("You are not logged in. Please log in to access this page.");
          return;
        }

        if (authState.role !== "Admin") {
          setError("You do not have permission to access this page.");
          return;
        }

        const response = await axios.get("https://justsell-app-f94be96079f5.herokuapp.com/auth");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users. Please try again.");
      }
    };

    if (authState.status) {
      fetchData();
    }
  }, [authState.status, authState.role]);

  const deleteUser = async (userID) => {
    try {
      await axios.delete(`https://justsell-app-f94be96079f5.herokuapp.com/auth/${userID}`);
      const response = await axios.get("https://justsell-app-f94be96079f5.herokuapp.com/auth");
      setUsers(response.data);
      window.alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error deleting user. Please try again.");
    }
  };

  return (
    <div className="usersPanel">
      <div className="usersContainer">
        <div className="usersTable">
          {error && (
            <p style={{ fontSize: "25px", color: "red", textAlign: "center" }}>
              {error}
            </p>
          )}
          {!error && (
            <>
              <h1 className="usersHeading">Manage Users Account</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                    <th>Company</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.userID}>
                      <td>{user.userID}</td>
                      <td>{user.userName}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.Phone}</td>
                      <td>{user.role}</td>
                      <td>{user.company}</td>
                      <td>
                        <Link to={`/editUser/${user.userID}`}>
                          <button className="btn">Edit</button>
                        </Link>
                        <button
                          className="btn"
                          onClick={() => deleteUser(user.userID)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
