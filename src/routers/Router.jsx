import Auth from "@/layouts/Auth";
import Main from "@/layouts/Main";
import Home from "@/pages/Home";
import SignUp from "@/pages/SignUp";
import { Route, Routes } from "react-router";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main></Main>}>
        <Route index element={<Home></Home>}></Route>
      </Route>
      <Route path="/auth" element={<Auth></Auth>}>
        <Route path="/auth/signup" element={<SignUp></SignUp>}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
