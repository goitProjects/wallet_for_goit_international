import s from "./RemoveTransaction.module.scss";
import { useMediaQuery } from "react-responsive";
import { MOBILE_ONLY } from "assets/constants/MEDIA";
import { useTranslation } from "react-i18next";

import spriteSvg from "assets/images/sprite.svg";
import PropTypes from "prop-types";
import IconButton from "components/IconButton";
import { setModal } from "redux/session";
import { useDispatch } from "react-redux";

const RemoveTransaction = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(MOBILE_ONLY);

  const openModal = () => {
    dispatch(setModal({ isOpen: true, type: "remove", data: { id } }));
  };

  return (
    <IconButton
      onClick={openModal}
      label={t("removeTransaction.remove")}
      className={isMobile ? s.remove : s.button}
    >
      <svg className={isMobile ? s.removeIcon : s.icon}>
        <use href={`${spriteSvg}#bin`}></use>
      </svg>
    </IconButton>
  );
};

RemoveTransaction.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveTransaction;
