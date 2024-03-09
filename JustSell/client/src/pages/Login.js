import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState(null);
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    const data = { userName: userName, password: password };
    axios
      .post("https://justsell-app-f94be96079f5.herokuapp.com/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          alert("Login failed: " + response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            userName: response.data.userName,
            id: response.data.userID,
            status: true,
            role: response.data.role,
          });
          // Set login message and reset after 5 seconds
          setLoginMessage("You are logged in");
          setTimeout(() => setLoginMessage(null), 5000);
          // Reload the entire page
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Axios Error:", error);
        alert("An error occurred during login. Please try again.");
      });
  };

  return (
    <div className="login">
      <div className="center">
        <div className="box-container">
          <div className="formcontainer">
            <h1 className="heading">User Login</h1>
            <div className="box">
              <label>Username</label>
              <input
                className="input"
                type="text"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>

            <div className="box">
              <label>Password:</label>
              <input
                className="input"
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <button type="submit" className="btn" onClick={login}>
              Login
            </button>

            {/* {loginMessage && (
              <p
                style={{
                  color: "green", 
                  fontWeight: "bold",
                  marginTop: "30px",
                  textAlign: "center",
                  fontSize: "40px",
                  textTransform: "uppercase",
                  letterSpacing: "2px", 
                }}
              >
                {loginMessage}
              </p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
