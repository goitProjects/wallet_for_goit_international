import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import { useRegisterMutation, useLoginMutation } from "redux/wallet/wallet-api";
import { loggedIn, setToken } from "redux/session";

import {
  ValidationLogin,
  ValidationsReg,
} from "assets/schemas/authFormSchemas";
import spriteSvg from "assets/images/sprite.svg";

import PasswordStrength from "components/PasswordStrength";
import Logo from "components/Logo";
import Button, { STYLE_TYPE } from "components/Button";

import s from "./AuthForm.module.scss";

export const authType = {
  login: "login",
  registration: "registration",
};

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const isRegister = type === authType.registration;
  const { t } = useTranslation();
  const initialValues = isRegister
    ? {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }
    : {
        email: "",
        password: "",
      };

  const [registerAcc] = useRegisterMutation();
  const [loginAcc] = useLoginMutation();

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      onSubmit={async (values) => {
        try {
          const { username, email, password } = values;
          const data = isRegister
            ? { username, email, password }
            : { email, password };

          const callFunction = isRegister ? registerAcc : loginAcc;
          const response = await callFunction(data).unwrap();

          dispatch(setToken(response.token));
          dispatch(loggedIn());
        } catch (error) {
          const message = isRegister
            ? `${t("authForm.already")}`
            : `${t("authForm.emailPassError")}`;
          toast.error(message);
        }
      }}
      validationSchema={isRegister ? ValidationsReg(t) : ValidationLogin(t)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        handleSubmit,
        dirty,
      }) => (
        <form onSubmit={handleSubmit} className={s.form}>
          <Logo wrapperClassName={s.titleWrapper} />
          <div className={s.inputWrapper}>
            <input
              className={s.input}
              type="email"
              name="email"
              placeholder={t("authForm.email")}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              autoComplete="email"
            />
            <svg className={s.iconSvg} style={{ width: "24px" }}>
              <use href={`${spriteSvg}#email`}></use>
            </svg>
          </div>
          {touched.email && errors.email && (
            <div className={s.errorWrapper}>
              <p className={s.error}>{errors.email}</p>
            </div>
          )}
          <div className={s.inputWrapper}>
            <input
              className={s.input}
              type="password"
              name="password"
              placeholder={t("authForm.password")}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              autoComplete="off"
            />
            <svg className={s.iconSvg} style={{ width: "24px" }}>
              <use href={`${spriteSvg}#lock`}></use>
            </svg>
          </div>
          {isRegister && <PasswordStrength password={values.password} />}
          {touched.password && errors.password && (
            <div className={s.errorWrapper}>
              <p className={s.error}>{errors.password}</p>
            </div>
          )}
          {isRegister ? (
            <>
              <div className={s.inputWrapper}>
                <input
                  className={s.input}
                  type="password"
                  name="confirmPassword"
                  placeholder={t("authForm.confirmPassword")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  autoComplete="off"
                />
                <svg className={s.iconSvg} style={{ width: "24px" }}>
                  <use href={`${spriteSvg}#lock`}></use>
                </svg>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <div className={s.errorWrapper}>
                  <p className={s.error}>{errors.confirmPassword}</p>
                </div>
              )}
            </>
          ) : null}
          {isRegister ? (
            <>
              <div className={s.inputWrapper}>
                <input
                  className={s.input}
                  type="username"
                  name="username"
                  placeholder={t("authForm.enterYourName")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  autoComplete="name"
                />
                <svg className={s.iconSvg} style={{ width: "24px" }}>
                  <use href={`${spriteSvg}#account-box`}></use>
                </svg>
              </div>
              {touched.username && errors.username && (
                <div className={s.errorWrapper}>
                  <p className={s.error}>{errors.username}</p>
                </div>
              )}
            </>
          ) : null}
          <Button
            className={s.enterBtn}
            type="submit"
            disabled={!isValid && !dirty}
            text={
              isRegister
                ? `${t("authForm.register")}`
                : `${t("authForm.login")}`
            }
          />
          <Button
            type="link"
            styleType={STYLE_TYPE.SECONDARY}
            to={isRegister ? "/login" : "/register"}
            className={s.loginBtn}
            text={isRegister ? t("authForm.loginReg") : t("authForm.signUp")}
          />
        </form>
      )}
    </Formik>
  );
};

AuthForm.propTypes = {
  type: PropTypes.string,
};

export default AuthForm;
