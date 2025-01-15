import { Outlet } from "react-router";

const Auth = () => {
  return (
    <div className="font-montserrat container w-4/5 mx-auto">
      <Outlet></Outlet>
    </div>
  );
};

export default Auth;
