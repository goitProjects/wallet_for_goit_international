import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";

import { isAuthSelector } from "redux/session";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector(isAuthSelector);
  return isAuth ? children : <Navigate to="/login" replace={true} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
