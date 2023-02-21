import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import {
  loggedOff,
  closeModal,
  modalDataSelector,
  modalTypeSelector,
} from "redux/session";
import { useDeleteTransactionMutation, useLogoutMutation } from "redux/wallet";

import ModalTransaction from "components/ModalTransaction";
import ModalConfrim from "components/ModalConfrim";

export const TYPES = {
  ADD: "add",
  EDIT: "edit",
  REMOVE: "remove",
  LOGOUT: "logout",
};

const GlobalModal = () => {
  const type = useSelector(modalTypeSelector);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const [remove] = useDeleteTransactionMutation();
  const data = useSelector(modalDataSelector);
  const { t } = useTranslation();

  const id = data?.id;

  const removeItem = async () => {
    try {
      const response = await remove(id).unwrap();
      if (response) {
        toast.success(t("removeTransaction.success"));
      }
    } catch (error) {
      toast.error(t("removeTransaction.error"));
    } finally {
      cancel();
    }
  };

  const confirmLogout = async () => {
    try {
      await logout();
      dispatch(loggedOff());
    } catch (error) {
      toast.error(t("modalLogout.error"));
    } finally {
      cancel();
    }
  };

  const cancel = () => {
    dispatch(closeModal());
  };

  if (type === TYPES.ADD) {
    return <ModalTransaction />;
  }

  if (type === TYPES.EDIT) {
    return <ModalTransaction editModal={true} />;
  }

  if (type === TYPES.REMOVE) {
    return (
      <ModalConfrim
        text={t("removeTransaction.pleaseConfirm")}
        confirm={removeItem}
        cancel={cancel}
      />
    );
  }

  if (type === TYPES.LOGOUT) {
    return (
      <ModalConfrim
        text={t("modalLogout.logout")}
        confirm={confirmLogout}
        cancel={cancel}
      />
    );
  }
  return null;
};
export default GlobalModal;
