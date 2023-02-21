import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import sprite from "assets/images/sprite.svg";
import s from "./Logo.module.scss";

const Logo = ({ wrapperClassName = "" }) => {
  const { t } = useTranslation();
  return (
    <div className={`${s.logo} ${wrapperClassName}`}>
      <svg className={s.icon}>
        <use href={`${sprite}#wallet`}></use>
      </svg>
      <span className={s.title}>{t("logo.wallet")}</span>
    </div>
  );
};
Logo.propTypes = {
  wrapperClassName: PropTypes.string,
};

export default Logo;
