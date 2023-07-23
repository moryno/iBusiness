import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/styles.css";
import Profile from "./pages/dashboard/SAD/Users/Profile";
import Home from "./pages/dashboard/Home";
import { PurchaseOrder } from "./pages/dashboard/P2P/purchase-orders/PurchaseOrder";
import Orders from "./pages/dashboard/P2P/purchase-orders/Orders";
import { LandingPage } from "./pages/landing-page/LandingPage";
import { Company } from "./pages/landing-page/Company";
import { ProductsView } from "./pages/landing-page/ProductsView";
import { Support } from "./pages/landing-page/Support";
import Onboarding from "./pages/landing-page/Onboarding";
import FrontendLayout from "./layout/FrontendLayout";
import Booking from "./pages/dashboard/bookings/Booking";
import ProtectedRoute from "./components/dashboard/Shared/ProtectedRoute";
import ScrollToTop from "./components/frontend/ScrollToTop";
import { NotFound } from "./pages/landing-page/NotFound";
import BookingDetail from "./pages/dashboard/bookings/BookingDetail";
import OrderDetail from "./pages/dashboard/P2P/purchase-orders/OrderDetail";
import SecurityGroup from "./pages/dashboard/SAD/SecurityGroup/SecurityGroup";
import User from "./pages/dashboard/SAD/Users/User";
import UserGroup from "./pages/dashboard/SAD/UserGroup/UserGroup";
import SecurityDetails from "./pages/dashboard/SAD/SecurityGroup/SecurityDetails";
import UserGroupDetails from "./pages/dashboard/SAD/UserGroup/UserGroupDetails";
import GroupRoles from "./pages/dashboard/SAD/GroupRoles/GroupRoles";
import Roles from "./pages/dashboard/SAD/Roles/Roles";
import RolesDetails from "./pages/dashboard/SAD/Roles/RolesDetails";
import UserDetails from "./pages/dashboard/SAD/Users/UserDetails";
import GroupRolesDetails from "./pages/dashboard/SAD/GroupRoles/GroupRolesDetails";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route
            path="/"
            element={
              <FrontendLayout>
                <LandingPage />
              </FrontendLayout>
            }
          />
          <Route
            path="/pricing"
            element={
              <FrontendLayout>
                <ProductsView />
              </FrontendLayout>
            }
          />
          <Route
            path="/company"
            element={
              <FrontendLayout>
                <Company />
              </FrontendLayout>
            }
          />
          <Route
            path="/support"
            element={
              <FrontendLayout>
                <Support />
              </FrontendLayout>
            }
          />
          <Route
            path="/onboarding"
            element={
              <FrontendLayout>
                <Onboarding />
              </FrontendLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/bookings"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/bookings/:id/view"
            element={
              <ProtectedRoute>
                <BookingDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/orders/:id/view"
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/orders/new"
            element={
              <ProtectedRoute>
                <PurchaseOrder orderstate={0} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/orders/:id/update"
            element={
              <ProtectedRoute>
                <PurchaseOrder orderstate={1} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/SAD/users"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/SAD/users/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/SAD/users/:id/view"
            element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/SAD/security-groups"
            element={
              <ProtectedRoute>
                <SecurityGroup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/SAD/security-groups/:id/view"
            element={
              <ProtectedRoute>
                <SecurityDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/SAD/user-groups"
            element={
              <ProtectedRoute>
                <UserGroup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/SAD/user-groups/:id/view"
            element={
              <ProtectedRoute>
                <UserGroupDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/SAD/roles"
            element={
              <ProtectedRoute>
                <Roles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/SAD/roles/:id/view"
            element={
              <ProtectedRoute>
                <RolesDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/SAD/group-roles"
            element={
              <ProtectedRoute>
                <GroupRoles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/SAD/group-roles/:id/view"
            element={
              <ProtectedRoute>
                <GroupRolesDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <FrontendLayout>
                <NotFound />
              </FrontendLayout>
            }
          />
        </Routes>
      </ScrollToTop>
    </Router>
  );
}
export default App;
