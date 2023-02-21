import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import sprite from "assets/images/sprite.svg";
import { MOBILE_ONLY } from "assets/constants/MEDIA";
import s from "./Navigation.module.scss";

const Navigation = () => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const { t } = useTranslation();
  return (
    <ul className={s.list}>
      <li>
        <NavLink
          to="/home"
          aria-label="Home"
          className={({ isActive }) => (isActive ? s.active : s.link)}
        >
          <svg width="38" height="38" className={s.icon}>
            <use href={`${sprite}#home`}></use>
          </svg>
          {!isMobile && `${t("navigation.homes")}`}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/diagram"
          aria-label="Diagram"
          className={({ isActive }) => (isActive ? s.active : s.link)}
        >
          <svg width="38" height="38" className={s.icon}>
            <use href={`${sprite}#diagram`}></use>
          </svg>
          {!isMobile && `${t("navigation.diagram")}`}
        </NavLink>
      </li>
      <li>
        {isMobile && (
          <NavLink
            to="/currency"
            aria-label="Currency"
            className={({ isActive }) => (isActive ? s.active : s.link)}
          >
            <svg width="38" height="38" className={s.icon}>
              <use href={`${sprite}#currency`}></use>
            </svg>
            {!isMobile && "Currency"}
          </NavLink>
        )}
      </li>
    </ul>
  );
};
export default Navigation;
