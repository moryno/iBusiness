import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    email: "",
    telephone: "",
    phsyicalAddress: "",
    originCountry: "",
    password: "",
  });
  const [confirmPassword, setPassword] = useState("");

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (inputs.password === confirmPassword) {
        const { data } = await axios.post(
          "http://192.168.1.200:7030/register",
          inputs
        );
        navigate("/login");
      } else {
        setError("Password does not match.");
      }
    } catch (error) {
      setError(error.response.data.Message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-bgLight">
      <section className="w-5/6 md:w-1/2 md:min-h-[500px] lg:min-h-[600px] flex bg-white flex-col md:flex-row-reverse rounded-[10px] overflow-hidden">
        <article className="w-full md:w-1/2 bg-bgxLight flex flex-col p-5 text-menu gap-8">
          <h1 className="text-3xl md:text-[50px]">iBusiness.</h1>
          <p className="hidden md:block">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div className="flex items-center gap-1">
            <p className="text-[14px]">Do you have an account?</p>
            <Link to="/login">
              <span className=" w-fit cursor-pointer border-none text-[#663399] font-bold">
                Login
              </span>
            </Link>
          </div>
        </article>
        <article className="w-full md:w-1/2 p-5">
          <h1 className="text-menu text-lg font-semibold">Register</h1>
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <input
              className="outline-none py-1 px-2 border border-gray-300"
              type="text"
              placeholder="Full Name"
              name="fullName"
              onChange={handleChange}
            />
            <input
              className="outline-none py-1 px-2 border border-gray-300"
              type="text"
              placeholder="Username"
              name="userName"
              onChange={handleChange}
            />
            <input
              className="outline-none py-1 px-2 border border-gray-300"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              className="outline-none py-1 px-2 border border-gray-300"
              type="text"
              placeholder="Telephone"
              name="telephone"
              onChange={handleChange}
            />
            <input
              className="outline-none py-1 px-2 border border-gray-300"
              type="text"
              placeholder="Physical Address"
              name="physicalAddress"
              onChange={handleChange}
            />
            <input
              className="outline-none py-1 px-2 border border-gray-300"
              type="text"
              placeholder="Origin Country"
              name="originCountry"
              onChange={handleChange}
            />
            <input
              className="outline-none py-1 px-2 border border-gray-300"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              className="outline-none py-1 px-2 border border-gray-300"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className=" text-red-600 font-medium text-sm">{error}</p>
            )}
            <button className="py-2 px-2.5 w-fit cursor-pointer border-none bg-[#938eef] font-bold">
              Register
            </button>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Register;
