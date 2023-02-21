import { Navigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Container from "components/Container";
import Currency from "components/Currency";

import { MOBILE_ONLY } from "assets/constants/MEDIA";
import s from "./CurrencyTab.module.scss";

const CurrencyTab = () => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  return isMobile ? (
    <Container>
      <div className={s.center}>
        <Currency />
      </div>
    </Container>
  ) : (
    <Navigate to="/home" replace={true} />
  );
};
export default CurrencyTab;
