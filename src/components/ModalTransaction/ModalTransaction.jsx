import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { GrClose } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { closeModal as setCloseModal } from "redux/session/session-slice";
import {
  useAddTransactionMutation,
  useEditTransactionMutation,
} from "redux/wallet";
import { modalDataSelector } from "redux/session";

import { MOBILE_ONLY } from "assets/constants/MEDIA";
import TransactionSchema from "assets/schemas/transactionSchema";
import useCategoriesLocale from "assets/hooks/useCategoriesLocale";
import useDatePickerLocale from "assets/hooks/useDatePickerLocale";

import Modal from "components/Modal/Modal";
import IconButton from "components/IconButton";
import Select from "components/Select";
import DatePickerField from "components/DatePickerField";
import Button, { STYLE_TYPE } from "components/Button";

import s from "./ModalTransaction.module.scss";

const TYPES = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
};

const prepareDate = (date) => {
  return date.toISOString();
};

const handleAmount = (value) => {
  if (!value || Number.isNaN(Number(value))) return value;
  const length = value.length;
  const dotIndex = value.indexOf(".");

  if (dotIndex < 0) {
    return value.concat(".00");
  }

  if (dotIndex < length - 3) {
    return value.slice(0, dotIndex + 3);
  }

  if (dotIndex > length - 3) {
    return value.padEnd(dotIndex + 3, "0");
  }

  return value;
};

const ModalTransaction = ({ editModal }) => {
  const { t } = useTranslation();
  const categories = useCategoriesLocale();
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const dispatch = useDispatch();
  const [addTransaction] = useAddTransactionMutation();
  const [editTransaction] = useEditTransactionMutation();
  const datePickerLocale = useDatePickerLocale();
  const transaction = useSelector(modalDataSelector);

  const selectFields = categories
    ? []
    : [
        [
          "c9d9e447-1b83-4238-8712-edc77b18b739",
          t("modalAddTransaction.nocategories"),
        ],
      ];
  let incomeCategoryId = "063f1132-ba5d-42b4-951d-44011ca46262";
  categories &&
    Object.entries(categories).forEach(([id, category]) => {
      if (category === "Income") {
        incomeCategoryId = id;
        return;
      }
      selectFields.push([id, category]);
    });

  const closeModal = () => {
    dispatch(setCloseModal());
  };

  const placeholder = dayjs().format("DD.MM.YYYY");

  const onSubmit = async (values) => {
    const data = {
      ...values,
      transactionDate: prepareDate(values.transactionDate),
      categoryId: values.type ? values.categoryId : incomeCategoryId,
      amount: values.type ? values.amount * -1 : values.amount,
      type: values.type ? TYPES.EXPENSE : TYPES.INCOME,
    };
    try {
      const res = editModal
        ? await editTransaction({ ...data, id: transaction.id }).unwrap()
        : await addTransaction(data).unwrap();
      if (res)
        toast.success(
          editModal
            ? t("modalEditTransaction.success")
            : t("modalAddTransaction.success")
        );
      closeModal();
    } catch (error) {
      toast.error(
        editModal
          ? t("modalEditTransaction.error")
          : t("modalAddTransaction.error")
      );
    }
  };

  return (
    <Modal modalClassName={s.modal} closeModal={closeModal}>
      {!isMobile && (
        <IconButton
          onClick={closeModal}
          label={t("modalAddTransaction.closewindow")}
        >
          <GrClose className={s.close} />
        </IconButton>
      )}
      <h2 className={s.title}>
        {editModal
          ? t("modalEditTransaction.editTransaction")
          : t("modalAddTransaction.addTransaction")}
      </h2>
      <Formik
        initialValues={{
          type: transaction?.type === "INCOME" ? false : true,
          categoryId: editModal
            ? transaction.categoryId
            : selectFields?.at(0)?.at(0),
          amount: editModal ? Math.abs(transaction?.amount) : "",
          transactionDate: editModal
            ? new Date(transaction?.transactionDate)
            : new Date(),
          comment: editModal ? transaction?.comment : "",
        }}
        onSubmit={onSubmit}
        validateOnBlur
        validationSchema={TransactionSchema(t)}
      >
        {({ values, isValid, handleBlur, setFieldValue }) => (
          <Form className={s.form}>
            <label className={s.label}>
              <span
                className={s.income}
                style={values.type ? { color: "#e0e0e0" } : null}
              >
                {t("modalAddTransaction.income")}
              </span>
              <span className={s.wrapper}>
                <Field type="checkbox" name="type" className={s.type} />
                <span className={s.check}></span>
              </span>
              <span
                className={s.expense}
                style={!values.type ? { color: "#e0e0e0" } : null}
              >
                {t("modalAddTransaction.expense")}
              </span>
            </label>
            {values.type && (
              <Select
                options={selectFields}
                name="categoryId"
                containerClassName={s.input}
                setFieldValue={setFieldValue}
              />
            )}
            <div className={s.double}>
              <label className={s.wrapper}>
                <Field
                  className={s.half}
                  type="text"
                  name="amount"
                  onBlur={(e) => {
                    const { value } = e.target;
                    setFieldValue("amount", handleAmount(value));
                    handleBlur(e);
                  }}
                  placeholder="0.00"
                  autoComplete="off"
                />
                <span className={s.errorAmount}>
                  <ErrorMessage name="amount" />
                </span>
              </label>
              <div className={s.wrapper}>
                <DatePickerField
                  name="transactionDate"
                  className={s.half}
                  maxDate={new Date()}
                  placeholderText={placeholder}
                  dateFormat="dd.MM.yyyy"
                  locale={datePickerLocale}
                  autoComplete="off"
                />
                <MdDateRange className={s.dateIcon} />
              </div>
            </div>
            <label className={s.wrapper}>
              <Field
                className={s.input}
                type="text"
                name="comment"
                placeholder={t("modalAddTransaction.comment")}
                autoComplete="off"
              />
              <span className={s.error}>
                <ErrorMessage name="comment" />
              </span>
            </label>
            <Button
              type="submit"
              disabled={!isValid}
              className={s.button}
              text={
                editModal
                  ? t("modalEditTransaction.transaction")
                  : t("modalAddTransaction.transaction")
              }
            />
          </Form>
        )}
      </Formik>
      <Button
        styleType={STYLE_TYPE.SECONDARY}
        className={s.button}
        onClick={closeModal}
        text={t("modalAddTransaction.cancel")}
      />
    </Modal>
  );
};
export default ModalTransaction;

ModalTransaction.propTypes = {
  editModal: PropTypes.bool,
  closeEditModal: PropTypes.func,
  transaction: PropTypes.shape({
    id: PropTypes.string,
    transactionDate: PropTypes.string,
    type: PropTypes.string,
    categoryId: PropTypes.string,
    comment: PropTypes.string,
    amount: PropTypes.number,
    balanceAfter: PropTypes.number,
  }),
};
