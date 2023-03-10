import { useEffect, lazy } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/Loader";
import PublicRoute from "components/PublicRoute";
import PrivateRoute from "components/PrivateRoute";

import { loggedIn, tokenSelector } from "redux/session";
import { useRefreshQuery } from "redux/wallet";
import { useTranslation } from "react-i18next";

const Home = lazy(() => import("pages/Home"));
const HomeTab = lazy(() => import("components/HomeTab"));
const DiagramTab = lazy(() => import("components/DiagramTab"));
const Registration = lazy(() => import("pages/Registration"));
const Login = lazy(() => import("pages/Login"));
const CurrencyTab = lazy(() => import("components/CurrencyTab"));
const GlobalModal = lazy(() => import("components/GlobalModal"));

const App = () => {
  const token = useSelector(tokenSelector);
  const { isSuccess, isFetching } = useRefreshQuery(null, { skip: !token });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(loggedIn());
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    i18n.changeLanguage("en");
  }, [i18n]);

  if (isFetching) return <Loader />;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          <Route path="home" element={<HomeTab />} />
          <Route path="diagram" element={<DiagramTab />} />
          <Route path="currency" element={<CurrencyTab />} />
        </Route>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
      <GlobalModal />
      <ToastContainer hideProgressBar />
    </>
  );
};
export default App;
