import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./signin.css";

import data from "../../../../data/pages/signin";
import { setupLogin } from "../../../../helpers/auth";
import { login } from "../../../../redux/apiCall";
import { loginSuccess } from "../../../../redux/userSlice";
import WebService, { msSingleSign } from "../../../../utils/webService";

export const Card = () => {
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
    window.location.href = msSingleSign;
  };

  // Get user information the send to API to check if user is registered
  useEffect(() => {
    const getUserInformation = async () => {
      let action = msSingleSign + search;
      // perform get user information
      const data = await WebService.get(action);

      // A check to see if user is registered
      if (data?.registered) {
        setupLogin(data?.token);
        dispatch(loginSuccess(data));
        navigate("/dashboard");
      } else {
        // Send unregistered user to register page where they can perform registration
        navigate("/get-started", {
          state: { user: data?.graphinfo, token: data?.token },
        });
      }
    };

    if (search) getUserInformation();
  }, [search, dispatch]);

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
              value="Submit"
              onClick={handleLogin}
              className="signin-button"
            >
              {data.btn_text}
            </button>
            <p className="signin-text-center">or</p>
            <button onClick={handleMsLogin} className="login-microsoft">
              <img
                src="https://www.freepnglogos.com/uploads/microsoft-window-logo-emblem-0.png"
                className="signin-btn-logo"
                alt=""
              />{" "}
              &nbsp; Log in with Microsoft
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
