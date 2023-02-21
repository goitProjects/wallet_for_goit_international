import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
import fetchCurrency from "api/currencyApi";

import s from "./Currency.module.scss";

const KEYS = {
  TIME: "wallet/time",
  CURRENCY: "wallet/currency",
};

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const Currency = () => {
  const { t } = useTranslation();
  const [currencies, setCurrencies] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);

  const setToLocalStorage = (array) => {
    array.map(({ name, value }) =>
      localStorage.setItem(name, JSON.stringify(value))
    );
  };

  useEffect(() => {
    const currentTime = new Date();
    const lastVisitTime = new Date(JSON.parse(localStorage.getItem(KEYS.TIME)));
    const currenciesInLocalStorage = JSON.parse(
      localStorage.getItem(KEYS.CURRENCY)
    );

    if (
      currenciesInLocalStorage &&
      currentTime.getTime() - lastVisitTime.getTime() <= 3600000
    ) {
      setCurrencies(currenciesInLocalStorage);
      setStatus(STATUS.SUCCESS);
      return;
    }

    async function getCurrency() {
      setStatus(STATUS.LOADING);
      try {
        const data = await fetchCurrency();
        setCurrencies(data);
        setStatus(STATUS.SUCCESS);
        setToLocalStorage([
          { name: KEYS.CURRENCY, value: data },
          { name: KEYS.TIME, value: currentTime },
        ]);
      } catch (error) {
        setStatus(STATUS.ERROR);
      }
    }
    getCurrency();
  }, []);

  if (status === STATUS.LOADING) {
    return (
      <div className={s.wrapper}>
        <TailSpin
          ariaLabel="loading-indicator"
          color="#ffffff"
          height={40}
          width={40}
        />
      </div>
    );
  }

  if (status === STATUS.ERROR) {
    return (
      <div className={s.wrapper}>
        <p className={s.text}>{t("currency.server")}</p>
      </div>
    );
  }

  if (status === STATUS.SUCCESS) {
    return (
      <table className={s.table}>
        <thead className={s.thead}>
          <tr>
            <th className={s.thLeft}>{t("currency.currency")}</th>
            <th className={s.thCenter}>{t("currency.buyingRate")}</th>
            <th className={s.thRight}>{t("currency.sellingRate")}</th>
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {currencies.map(({ ccy, buy, sale }) => {
            return (
              <tr className={s.trBody} key={ccy}>
                <td className={s.tdLeft}>{ccy}</td>
                <td className={s.tdCenter}>{Number(buy).toFixed(2)}</td>
                <td className={s.tdRight}>{Number(sale).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return null;
};
export default Currency;
