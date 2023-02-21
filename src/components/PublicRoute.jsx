import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";

import { isAuthSelector } from "redux/session";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuth = useSelector(isAuthSelector);
  return !isAuth ? children : <Navigate to="/home" replace={true} />;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
