import { useTranslation } from "react-i18next";

import monthsEn from "assets/locales/en/months-en";
import monthsUa from "assets/locales/ua/months-ua";

const useMonthsLocale = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const getMonthsNameLocale = (lang) => {
    switch (lang) {
      case "en":
        return monthsEn;
      case "ua":
        return monthsUa;
      default:
        return monthsEn;
    }
  };
  return getMonthsNameLocale(language);
};
export default useMonthsLocale;
