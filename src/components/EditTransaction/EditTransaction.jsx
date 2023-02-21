import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { setModal } from "redux/session/session-slice";

import spriteSvg from "assets/images/sprite.svg";
import { MOBILE_ONLY } from "assets/constants/MEDIA";

import IconButton from "components/IconButton";

import s from "./EditTransaction.module.scss";

const EditTransaction = ({ transaction }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClickEdit = () => {
    dispatch(setModal({ isOpen: true, type: "edit", data: transaction }));
  };

  const isMobile = useMediaQuery(MOBILE_ONLY);

  return (
    <IconButton
      onClick={handleClickEdit}
      className={isMobile ? s.edit : s.button}
      label={t("modalEditTransaction.editTransaction")}
    >
      <svg className={isMobile ? s.iconMobile : s.icon}>
        <use href={`${spriteSvg}#icon_pencil2`}></use>
      </svg>
    </IconButton>
  );
};

export default EditTransaction;
