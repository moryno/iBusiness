import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./signin.css";
import data from "../../../../data/pages/signin";
import { Link, useLocation } from "react-router-dom";
import request, {
  msSingleSign,
  homeWebsite,
} from "../../../../helpers/requestMethod";
import { setupLogin } from "../../../../helpers/auth";
import { login } from "../../../../redux/apiCall";
import { loginSuccess } from "../../../../redux/userSlice";

export const Card = () => {
  const { search } = useLocation();
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    login(dispatch, inputs);
  };

  const handleMsLogin = async (event) => {
    event.preventDefault();
    window.location.href = msSingleSign;
  };

  useEffect(() => {
    const getUserInformation = async () => {
      const { data } = await request.get(msSingleSign + search);
      setupLogin(data?.token);
      dispatch(loginSuccess(data));
      window.location.href = homeWebsite + "#token=" + data?.token;
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
