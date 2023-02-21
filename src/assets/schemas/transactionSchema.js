import * as yup from "yup";

const TransactionSchema = (t) => {
  const transactionSchema = yup.object().shape({
    type: yup.boolean().required(t("transactionSchema.typeRequired")),
    categoryId: yup
      .string()
      .required(t("transactionSchema.categoryIdRequired")),
    amount: yup
      .string()
      .min(1)
      .max(8)
      .matches(/^(?:\d*\.)?\d+$/, t("transactionSchema.amountMatches"))
      .required(t("transactionSchema.amountRequired")),
    transactionDate: yup
      .date()
      .required(t("transactionSchema.transactionDateRequired")),
    comment: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, t("transactionSchema.commentMatches")),
  });
  return transactionSchema;
};

export default TransactionSchema;
