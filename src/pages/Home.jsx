import { Fragment } from "react";
import { useSelector } from "react-redux";

import { isAuthSelector } from "redux/session";

import Dashboard from "components/Dashboard";
import Login from "./Login";

const Home = () => {
  const isAuth = useSelector(isAuthSelector);
  return (
    <Fragment>
      {isAuth && <Dashboard />}
      {!isAuth && <Login />}
    </Fragment>
  );
};
export default Home;
