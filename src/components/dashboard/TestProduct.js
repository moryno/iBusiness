import { useEffect, useState } from "react";
import OnboardingService from "../../axios/onboardingRequest";
import axios from "axios";

const TestProduct = () => {
  const [products, setProducts] = useState([]);

  const [inputs, setInputs] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url =
      process.env.REACT_APP_BASE_URL +
      process.env.REACT_APP_API_VERSION +
      "/test";

    const formData = {
      title: inputs,
    };

    const response = await axios.post(url, formData, { withCredentials: true });
    setProducts([...products, response.data]);
  };

  useEffect(() => {
    const getProduct = async () => {
      const url = "/test";
      const response = await OnboardingService.get(url);
      setProducts(response);
    };
    getProduct();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={(e) => setInputs(e.target.value)}
            placeholder="item 1"
          />
        </div>
        <button>submit</button>
      </form>
      <div>
        <ul>
          {products.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestProduct;
