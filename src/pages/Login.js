import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../redux/apiCall";

const Login = () => {
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

  return (
    <main className="h-screen flex items-center justify-center bg-bgLight">
      <section className="w-5/6 md:w-1/2 md:min-h-[500px] min-h-[500px] flex bg-white flex-col-reverse md:flex-row-reverse rounded-[10px] overflow-hidden">
        <article className="w-full md:w-1/2 p-5">
          <h1 className="text-menu text-lg font-semibold">Login</h1>
          <form className="flex flex-col gap-8" onSubmit={handleLogin}>
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
            <button className="py-2 px-2.5 w-fit cursor-pointer border-none bg-[#938eef] font-bold">
              Login
            </button>
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
