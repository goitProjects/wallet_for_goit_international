import { useTranslation } from "react-i18next";

const useDatePickerLocale = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const getDatePickerLocale = (lang) => {
    switch (lang) {
      case "en":
        return "en-US";
      case "ua":
        return "uk-UA";
      default:
        return "en-US";
    }
  };
  return getDatePickerLocale(language);
};
export default useDatePickerLocale;
