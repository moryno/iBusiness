import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./signin.css";

import data from "../../../../data/pages/signin";
import { setUpToken } from "../../../../helpers/auth";
import { login } from "../../../../redux/apiCall";
import { loginSuccess } from "../../../../redux/userSlice";

import axios from "axios";
import LoadingIndicator from "../../../dashboard/LoadingIndicator";
import { signUpInURL } from "../../../../axios/webService";

export const Card = () => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get the search params from the browser address
  const { search } = useLocation();

  // Get user information from the form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  // Login user function the set their state using redux
  const handleLogin = async (event) => {
    event.preventDefault();
    login(dispatch, inputs);
  };

  // Function to call on endpoint that will redirect user to Microsoft platform to log in
  const handleMsLogin = async (event) => {
    event.preventDefault();
    window.location.href = signUpInURL;
  };

  // Get user information the send to API to check if user is registered
  useEffect(() => {
    const getUserInformation = async () => {
      setLoading(true);
      try {
        // perform get user information
        const { data } = await axios.get(signUpInURL + search);

        // A check to see if user is registered
        if (data?.registered) {
          setUpToken(data?.token);
          dispatch(loginSuccess(data));
          setLoading(false);
          navigate("/dashboard");
        } else {
          // Send unregistered user to register page where they can perform registration
          setLoading(false);
          navigate("/get-started", {
            state: { user: data?.graphinfo, token: data?.token },
          });
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    if (search) getUserInformation();
  }, [search, dispatch, navigate]);

  return (
    <main className="card-container">
      <div className="signin-container">
        <div className="signin-info">
          <p className="signin-header">{data.header}</p>
          <p className="signin-description">{data.subheader}</p>
          <div className="info-footer">
            <p className="signin-text">{data.newcust_text}</p>
            <Link to="/get-started">
              <button className="signin-gs-btn">{data.newcust_btn}</button>
            </Link>
          </div>
        </div>
        <div className="signin-form">
          <p className="signin-subheader">{data.s_subheader}</p>
          <div className="signin-inputs">
            {data.fields.map((input) => (
              <input
                key={input.name}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                onChange={handleChange}
                className="gs-form-control"
              />
            ))}
            <button
              disabled
              value="Submit"
              onClick={handleLogin}
              className="signin-button"
            >
              {data.btn_text}
            </button>
            <p className="signin-text-center">or</p>
            <button onClick={handleMsLogin} className="login-microsoft">
              {loading ? (
                <LoadingIndicator />
              ) : (
                <div className="flex items-center gap-1">
                  <img
                    src="https://www.freepnglogos.com/uploads/microsoft-window-logo-emblem-0.png"
                    className="signin-btn-logo"
                    alt=""
                  />
                  <p>Log in with Microsoft</p>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
