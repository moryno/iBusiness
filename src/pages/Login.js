import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { login } from "../redux/apiCall";
import axios from "axios";
import request, { msSingleSign } from "../helpers/requestMethod";
import { setupLogin } from "../helpers/auth";
import { loginSuccess } from "../redux/userSlice";

const Login = () => {
  const { hash } = useLocation();
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });
  const token = hash.split("&")[0].split("=")[1];

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
      const { data } = await request.get("/user/gettoken", {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      });
      setupLogin(data?.token);
      dispatch(loginSuccess(data));
      window.location.replace("/");
    };
    if (token) getUserInformation();
  }, [token, dispatch]);

  return (
    <main className="h-screen flex items-center justify-center bg-bgLight">
      <section className="w-5/6 md:w-1/2 md:min-h-[500px] min-h-[500px] flex bg-white flex-col-reverse md:flex-row-reverse rounded-[10px] overflow-hidden">
        <article className="w-full md:w-1/2 p-5">
          <h1 className="text-menu text-lg font-semibold">Login</h1>
          <form className="flex flex-col gap-8">
            <input
              className="outline-none py-1 px-2 border border-gray-300"
              type="text"
              placeholder="Username"
              name="userName"
              onChange={handleChange}
            />
            <input
              className="outline-none py-1 px-2 border border-gray-300"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {error && (
              <p className=" text-red-600 font-medium text-sm">{error}</p>
            )}
            <div className="flex flex-col gap-3 items-center">
              <span
                onClick={handleLogin}
                className="py-2 px-2.5 w-full cursor-pointer text-white  border-none  bg-button  font-bold"
              >
                Login
              </span>
              <p className="">or</p>
              <span
                onClick={handleMsLogin}
                className="py-2 px-2.5 flex items-center justify-center gap-4 w-full cursor-pointer  border border-menu font-bold"
              >
                <img
                  className="w-7"
                  src="https://banner2.cleanpng.com/20190417/sxw/kisspng-microsoft-windows-portable-network-graphics-logo-t-aevinel-reino-maldito-descarga-5cb6fb279ba648.3641279715554957196376.jpg"
                  alt="microsoft"
                />{" "}
                Login with Microsoft
              </span>
            </div>
          </form>
        </article>
        <article className="w-full md:w-1/2 bg-bgxLight flex flex-col p-5 text-menu gap-8">
          <h1 className="text-3xl md:text-[50px]">Welcome.</h1>
          <p className="hidden md:block">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div className="flex items-center gap-1">
            <p className="text-[14px]">Don't you have an account?</p>
            <Link to="/register">
              <span className=" w-fit cursor-pointer border-none text-[#663399] font-bold">
                Register
              </span>
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Login;
