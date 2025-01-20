import Auth from "@/layouts/Auth";
import Main from "@/layouts/Main";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import { Route, Routes } from "react-router";
import AuthPrivateRoute from "./AuthPrivateRoute";
import Shop from "@/pages/Shop";
import CategoryDetails from "@/pages/CategoryDetails";
import Cart from "@/pages/Cart";
import PrivateRoute from "./PrivateRoute";
import Checkout from "@/pages/Checkout";
import Invoice from "@/pages/Invoice";
import Dashboard from "@/layouts/Dashboard";
import DashboardHome from "@/pages/DashboardHome";
import DashboardManageUsers from "@/pages/DashboardManageUsers";
import DashboardManageCategory from "@/pages/DashboardManageCategory";
import DashboardPaymentManagement from "@/pages/DashboardPaymentManagement";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main></Main>}>
        <Route index element={<Home></Home>}></Route>
        <Route path="/shop" element={<Shop></Shop>}></Route>
        <Route
          path="/category/:category"
          element={<CategoryDetails></CategoryDetails>}
        ></Route>
        <Route
          path="/products/cart"
          element={
            <PrivateRoute>
              <Cart></Cart>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout></Checkout>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/payment/invoice"
          element={
            <PrivateRoute>
              <Invoice></Invoice>
            </PrivateRoute>
          }
        ></Route>
      </Route>
      <Route path="/auth" element={<Auth></Auth>}>
        <Route
          path="/auth/signup"
          element={
            <AuthPrivateRoute>
              <SignUp></SignUp>
            </AuthPrivateRoute>
          }
        ></Route>
        <Route
          path="/auth/login"
          element={
            <AuthPrivateRoute>
              <Login></Login>
            </AuthPrivateRoute>
          }
        ></Route>
      </Route>
      <Route path="/dashboard" element={<Dashboard></Dashboard>}>
        <Route
          path="/dashboard"
          element={<DashboardHome></DashboardHome>}
        ></Route>
        <Route
          path="/dashboard/manage-users"
          element={<DashboardManageUsers></DashboardManageUsers>}
        ></Route>
        <Route
          path="/dashboard/manage-category"
          element={<DashboardManageCategory></DashboardManageCategory>}
        ></Route>
        <Route
          path="/dashboard/payment-management"
          element={<DashboardPaymentManagement></DashboardPaymentManagement>}
        ></Route>
      </Route>
    </Routes>
  );
};

export default Router;
