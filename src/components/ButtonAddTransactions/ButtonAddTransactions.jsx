import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { setModal } from "redux/session";

import IconButton from "components/IconButton";
import s from "./ButtonAddTransactions.module.scss";

const ButtonAddTransactions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(setModal({ isOpen: true, type: "add" }));
  };
  return (
    <IconButton
      onClick={openModal}
      label={t("modalAddTransaction.addTransaction")}
      className={s.container}
    >
      <span className={s.wrapper}>
        <AiFillPlusCircle className={s.icon} />
      </span>
    </IconButton>
  );
};
export default ButtonAddTransactions;
