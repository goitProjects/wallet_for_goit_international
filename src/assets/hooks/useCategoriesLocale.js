import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { categoriesSelector } from "redux/categories";

import categoriesIdEn from "assets/locales/en/categoriesId-en";
import categoriesIdUa from "assets/locales/ua/categoriesId-ua";
import categoriesNameEn from "assets/locales/en/categoriesName-en";
import categoriesNameUa from "assets/locales/ua/categoriesName-ua";

export const TYPES = {
  FULL: "full",
  NAME: "name",
};

const useCategoriesLocale = (type = TYPES.FULL) => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const actualCategories = useSelector(categoriesSelector) || categoriesIdEn;

  const getCategoriesFullLocale = (lang) => {
    switch (lang) {
      case "en":
        return actualCategories;
      case "ua":
        return categoriesIdUa;
      default:
        return actualCategories;
    }
  };

  const getCategoriesNameLocale = (lang) => {
    switch (lang) {
      case "en":
        return categoriesNameEn;
      case "ua":
        return categoriesNameUa;
      default:
        return categoriesNameEn;
    }
  };

  switch (type) {
    case TYPES.FULL:
      return getCategoriesFullLocale(language);
    case TYPES.NAME:
      return getCategoriesNameLocale(language);
    default:
      return getCategoriesFullLocale(language);
  }
};
export default useCategoriesLocale;
