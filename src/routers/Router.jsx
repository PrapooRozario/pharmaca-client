import Main from "@/layouts/Main";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router";

const Router = () => {
  return (
    <Routes>
          <Route path="/" element={<Main></Main>}>
            <Route index element={<Home></Home>}></Route>
          </Route>
    </Routes>
  );
};

export default Router;
