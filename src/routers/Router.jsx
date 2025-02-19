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
import DashboardSalesReport from "@/pages/DashboardSalesReport";
import DashboardManageBannerAdvertise from "@/pages/DashboardManageBannerAdvertise";
import AdminRoute from "./AdminRoute";
import DashboardManageMedicines from "@/pages/DashboardManageMedicines";
import SellerRoute from "./SellerRoute";
import DashboardPaymentHistory from "@/pages/DashboardPaymentHistory";
import DashboardAddBanner from "@/pages/DashboardAddBanner";
import DashboardUserPaymentHistory from "@/pages/DashboardUserPaymentHistory";
import ErrorPage from "@/pages/ErrorPage";

const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      <Route path="/" element={<Main></Main>}>
        <Route
          index
          element={<Home></Home>}
        ></Route>
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
          element={
            <AdminRoute>
              <DashboardManageUsers></DashboardManageUsers>
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/dashboard/manage-category"
          element={
            <AdminRoute>
              <DashboardManageCategory></DashboardManageCategory>
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/dashboard/payment-management"
          element={
            <AdminRoute>
              <DashboardPaymentManagement></DashboardPaymentManagement>
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/dashboard/sales-report"
          element={
            <AdminRoute>
              <DashboardSalesReport></DashboardSalesReport>
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/dashboard/manage-banner"
          element={
            <AdminRoute>
              <DashboardManageBannerAdvertise></DashboardManageBannerAdvertise>
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/dashboard/manage-medicines"
          element={
            <SellerRoute>
              <DashboardManageMedicines></DashboardManageMedicines>
            </SellerRoute>
          }
        ></Route>
        <Route
          path="/dashboard/payment-history"
          element={
            <SellerRoute>
              <DashboardPaymentHistory></DashboardPaymentHistory>
            </SellerRoute>
          }
        ></Route>
        <Route
          path="/dashboard/advertisement"
          element={
            <SellerRoute>
              <DashboardAddBanner></DashboardAddBanner>
            </SellerRoute>
          }
        ></Route>
        <Route
          path="/dashboard/payment-history/me"
          index
          element={
            <PrivateRoute>
              <DashboardUserPaymentHistory></DashboardUserPaymentHistory>
            </PrivateRoute>
          }
        ></Route>
      </Route>
    </Routes>
  );
};

export default Router;
