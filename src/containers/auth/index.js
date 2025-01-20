import { Routes, Route } from "react-router-dom";
import Login from "./login";
import ResetPassword from "./reset-password";

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/reset-password" Component={ResetPassword} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
