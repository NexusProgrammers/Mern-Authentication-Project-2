import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ children }) => {
  const cookieValue = Cookie.get("token");
  if (cookieValue) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default PublicRoute;
