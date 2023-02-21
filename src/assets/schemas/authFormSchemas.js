import * as yup from "yup";
import isEmailValidator from "validator/lib/isEmail";

const ValidationsReg = (t) =>
  yup.object().shape({
    username: yup
      .string()
      .min(1, t("authFormSchemas.valRegUserNameMin"))
      .max(12, t("authFormSchemas.valRegUserNameMax"))
      .matches(
        /^([a-zA-ZА-ЯҐЄІЇа-яґєії0-9 ]+)$/,
        t("authFormSchemas.valRegUserNameName")
      )
      .required(t("authFormSchemas.valRegUserNameRequired")),
    email: yup
      .string()
      .required(t("authFormSchemas.valRegEmailRequired"))
      .min(10, t("authFormSchemas.valRegEmailMin"))
      .max(63, t("authFormSchemas.valRegEmailMax"))
      .test(
        "is-valid",
        t("authFormSchemas.valRegEmailEmail"),
        (value) =>
          value &&
          isEmailValidator(value, {
            allow_utf8_local_part: false,
          })
      )
      .matches(
        /(^(?!-)([a-zA-Z0-9_-])(?=[^@]{2,}@)([a-z]))/,
        t("authFormSchemas.valRegEmailEmail")
      ),
    password: yup
      .string()
      .min(6, t("authFormSchemas.valRegPassMin"))
      .max(12, t("authFormSchemas.valRegPassMax"))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        t("authFormSchemas.valRegPassMatches")
      )
      .required(t("authFormSchemas.valRegPassRequired")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("authFormSchemas.valRegConfirmPassOneof"))
      .required(t("authFormSchemas.valRegConfirmPassRequired")),
  });

const ValidationLogin = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .required(t("authFormSchemas.valLoginEmailRequired"))
      .min(10, t("authFormSchemas.valRegEmailMin"))
      .max(63, t("authFormSchemas.valRegEmailMax"))
      .test(
        "is-valid",
        t("authFormSchemas.valLoginEmailEmail"),
        (value) =>
          value &&
          isEmailValidator(value, {
            allow_utf8_local_part: false,
          })
      )
      .matches(
        /(^(?!-)([a-zA-Z0-9_-])(?=[^@]{2,}@)([a-z]))/,
        t("authFormSchemas.valLoginEmailEmail")
      ),
    password: yup
      .string()
      .min(6, t("authFormSchemas.valLoginPassMin"))
      .max(12, t("authFormSchemas.valLoginPassMax"))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        t("authFormSchemas.valLoginPassMatches")
      )
      .required(t("authFormSchemas.valLoginPassRequired")),
  });

export { ValidationLogin, ValidationsReg };
