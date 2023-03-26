import React, { useState } from "react";
import "./getstarted.css";
import data from "../../../../data/pages/getstarted";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const GetStarted = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    email: "",
    telephone: "",
    phsyicalAddress: "",
    originCountry: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (inputs.password === inputs.confirmPassword) {
        await axios.post(
          "https://bookingapptrial.azurewebsites.net/register",
          inputs
        );
        navigate("/sign-in");
      } else {
        setError("Password does not match.");
      }
    } catch (error) {
      setError(error.response.data.Message);
    }
  };

  return (
    <main className="register-container">
      <div className="gs-container">
        <div className="gs-info">
          <p className="gs-header">{data.header}</p>
          <p className="gs-description">{data.subheader}</p>
          <ul className="gs-list">
            {data.functions.map((func) => (
              <li key={func}>
                <FontAwesomeIcon icon={faCheck} />
                &nbsp;&nbsp;{func}
              </li>
            ))}
          </ul>
        </div>
        <div className="gs-form">
          <p className="gs-subheader">{data.s_subheader}</p>
          <div className="gs-inputs">
            {data.fields.map((input) => (
              <input
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                onChange={handleChange}
                className="gs-form-control"
              />
            ))}
            <button value="Submit" onClick={handleSubmit} className="gs-button">
              {data.btn_text}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
