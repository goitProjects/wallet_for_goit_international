import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useRefreshQuery } from "redux/wallet";
import { useSelector } from "react-redux";
import { isAuthSelector } from "redux/session";
import { getIsButtonShown } from "redux/session";

// import LanguageSwitcher from "components/LanguageSwitcher";
import Container from "components/Container";
import Navigation from "components/Navigation";
import Balance from "components/Balance";
import Currency from "components/Currency";
import ButtonAddTransactions from "components/ButtonAddTransactions";

import { MOBILE_ONLY } from "assets/constants/MEDIA";
import s from "./Dashboard.module.scss";
import Header from "components/Header";

const Dashboard = () => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const isShown = useSelector(getIsButtonShown);

  const isAuth = useSelector(isAuthSelector);
  const { data: userData } = useRefreshQuery(null, {
    skip: !isAuth,
  });
  return (
    <Fragment>
      <Header />
      <section className={s.blur_container}>
        {/* <LanguageSwitcher /> */}
        <Container className={s.container}>
          <div className={s.sidebar}>
            <div className={s.wrapper}>
              <Navigation />
              {!isMobile && <Balance balance={userData.balance} />}
            </div>
            {!isMobile && <Currency />}
          </div>
          <Outlet />
        </Container>
      </section>
      {isShown && !isMobile && <ButtonAddTransactions />}
    </Fragment>
  );
};
export default Dashboard;
