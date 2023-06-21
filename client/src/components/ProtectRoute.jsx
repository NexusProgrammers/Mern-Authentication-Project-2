import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

// eslint-disable-next-line react/prop-types
const ProtectRoute = ({ children }) => {
  const cookieValue = Cookie.get("token");
  if (!cookieValue) {
    return <Navigate to={"/login"} replace />;
  }
  return children
};

export default ProtectRoute;
