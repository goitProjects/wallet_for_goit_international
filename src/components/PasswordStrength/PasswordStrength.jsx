import PasswordStrengthBar from "react-password-strength-bar";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import s from "./PasswordStrength.module.scss";

const PasswordStrength = ({ password }) => {
  const { t } = useTranslation();
  return (
    <PasswordStrengthBar
      className={s.bar}
      password={password}
      shortScoreWord={t("passwordStrength.short")}
      scoreWords={[
        t("passwordStrength.weak"),
        t("passwordStrength.weak"),
        t("passwordStrength.okay"),
        t("passwordStrength.good"),
        t("passwordStrength.strong"),
      ]}
    />
  );
};

PasswordStrength.propTypes = {
  password: PropTypes.string,
};

export default PasswordStrength;
