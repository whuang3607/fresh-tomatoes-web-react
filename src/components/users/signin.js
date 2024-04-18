import * as client from "./client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { useAuth } from "./authenticateUser";

function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [showError, setShowError] = useState(false);
  const { signin, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const handleSignin = async () => {
    try{
        const user = await signin(credentials);
        console.log(user)
        setCurrentUser(user);
        navigate("/");
    }
    catch (error) {
        console.log("error", error);
        if (error.response && error.response.status === 401) {

            setShowError("Incorrect username or password. Please try again.");
        } else {
            setShowError("Sign-in failed. Please try again later.");
        }
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <button className="close-button" onClick={handleCancel}>
          &#10006;
        </button>
        <h1>Sign In</h1>
        <div className="row mb-2">
            <div className="col">
                <label>Username:</label>
            </div>
            <div className="col">
                <input
                type="text"
                className="form-control"
                value={credentials.username}
                onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                }
                />
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <label>Password:</label>
            </div>
            <div className="col">
                <input
                type="password"
                className="form-control mb-2"
                value={credentials.password}
                onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                }/>
            </div>
        </div>
        <br/>
        <button onClick={handleSignin} className="btn btn-signin-color mt-3">
          Sign In
        </button>

        <p>Don't have an account? Sign up <Link to="/signup">here</Link></p>

        {showError && (
          <div className="error-modal">
            <div className="error-content">
              <p>Sign-in failed. Please check your credentials and try again.</p>
              <button onClick={handleCloseError}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Signin;