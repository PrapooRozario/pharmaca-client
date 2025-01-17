import Auth from "@/layouts/Auth";
import Main from "@/layouts/Main";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import { Route, Routes } from "react-router";
import AuthPrivateRoute from "./AuthPrivateRoute";
import Shop from "@/pages/Shop";
import CategoryDetails from "@/pages/CategoryDetails";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main></Main>}>
        <Route index element={<Home></Home>}></Route>
        <Route path="/shop" element={<Shop></Shop>}></Route>
        <Route path="/category/:category" element={<CategoryDetails></CategoryDetails>}></Route>
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
    </Routes>
  );
};

export default Router;
