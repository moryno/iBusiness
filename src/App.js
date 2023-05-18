import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Profile from "./pages/dashboard/Profile";
import Home from "./pages/dashboard/Home";
import Layout from "./components/dashboard/Layout";
import { PurchaseOrder } from "./pages/dashboard/purchase-orders/PurchaseOrder";
import Orders from "./pages/dashboard/Orders";
import "./assets/styles.css";
import { LandingPage } from "./pages/landing-page/LandingPage";
import { SignUp } from "./pages/landing-page/GetStarted";
import { SignIn } from "./pages/landing-page/SignIn";
import { Company } from "./pages/landing-page/Company";
import { ProductsView } from "./pages/landing-page/ProductsView";
import { Support } from "./pages/landing-page/Support";

function App() {
  // const currentUser = useSelector((state) => state.user?.currentUser?.user);

  const ProtectedRoute = ({ children }) => {
    // if (!currentUser) {
      // return <Navigate to="/" />;
    // }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/get-started",
      element: <SignUp />,
    },
    {
      path: "/pricing",
      element: <ProductsView />,
    },
    {
      path: "/company",
      element: <Company />,
    },
    {
      path: "/support",
      element: <Support />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/dashboard",
          element: <Home />,
        },
        {
          path: "/dashboard/purchase-order",
          element: <PurchaseOrder orderstate={0} />,
        },
        {
          path: "/dashboard/profile",
          element: <Profile />,
        },
        {
          path: "/dashboard/orders",
          element: <Orders />,
        },
        {
          path: "/dashboard/updateorder/:id",
          element: <PurchaseOrder orderstate={1} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
