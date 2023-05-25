import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import Profile from "./pages/dashboard/Profile";
import Home from "./pages/dashboard/Home";
import Layout from "./layout/Layout";
import { PurchaseOrder } from "./pages/dashboard/purchase-orders/PurchaseOrder";
import Orders from "./pages/dashboard/Orders";
import "./assets/styles.css";
import { LandingPage } from "./pages/landing-page/LandingPage";
import { Company } from "./pages/landing-page/Company";
import { ProductsView } from "./pages/landing-page/ProductsView";
import { Support } from "./pages/landing-page/Support";
import Onboarding from "./pages/landing-page/Onboarding";
import FrontendLayout from "./layout/FrontendLayout";
import Booking from "./pages/dashboard/Booking";

function App() {
  // const currentUser = useSelector((state) => state.user?.currentUser?.user);
  console.log(useSelector((state) => state.user?.currentUser));

  const ProtectedRoute = ({ children }) => {
    // if (!currentUser) {
    //   return <Navigate to="/" />;
    // }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <FrontendLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
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
          path: "/onboarding",
          element: <Onboarding />,
        },
      ],
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
          path: "/dashboard/bookings",
          element: <Booking />,
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
