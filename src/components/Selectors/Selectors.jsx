import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import useClickOutside from "assets/hooks/useClickOutside";
import useMonthsLocale from "assets/hooks/useMonthsLocale";
import { years } from "assets/constants/MONTHS-YEARS";
import spriteSvg from "assets/images/sprite.svg";

import Button, { STYLE_TYPE } from "components/Button";
import s from "./Selectors.module.scss";
import SelectorsOption from "components/SelectorsOption/SelectorsOption";

const Selectors = ({ transactions, setSelectedDate }) => {
  const months = useMonthsLocale();
  const { t } = useTranslation();

  const month = useMemo(() => t("selectors.month"), [t]);
  const year = useMemo(() => t("selectors.year"), [t]);

  const [selectMonth, setSelectMonth] = useState(null);
  const [selectYear, setSelectYear] = useState(null);
  const [isActiveMonth, setIsActiveMonth] = useState(false);
  const [isActiveYear, setIsActiveYear] = useState(false);

  const yearsRenderingCheckList = useMemo(() => {
    const years = transactions?.map((el) => +el.transactionDate.slice(0, 4));
    return [...new Set(years)];
  }, [transactions]);

  const monthsRenderingCheckList = useMemo(() => {
    const months = transactions?.map(
      (el) => el.transactionDate.slice(5, 7) - 1
    );
    return [...new Set(months)];
  }, [transactions]);

  let domNode = useClickOutside(() => {
    setIsActiveMonth(false);
    setIsActiveYear(false);
  });

  useEffect(() => {
    if (selectYear !== null && selectMonth !== null) {
      setSelectedDate({ month: selectMonth + 1, year: selectYear });
    }
  }, [selectYear, selectMonth, setSelectedDate]);

  const resetClick = () => {
    setSelectedDate({ month: 0, year: 0 });
    setSelectMonth(null);
    setSelectYear(null);
  };
  return (
    <>
      <div className={s.selectors}>
        <div className={s.select_box}>
          {isActiveMonth && (
            <div ref={domNode} className={s.active}>
              {months.map((el, idx) => (
                <SelectorsOption
                  key={el}
                  isDisabled={monthsRenderingCheckList.includes(idx)}
                  title={el}
                  onOptionClick={() => {
                    setSelectMonth(idx);
                    setIsActiveMonth(false);
                  }}
                />
              ))}
            </div>
          )}
          <div
            className={s.selected}
            onClick={() => setIsActiveMonth(!isActiveMonth)}
          >
            <b className={s.mainSelect}>
              {selectMonth !== null ? months[selectMonth] : month}
            </b>
            <svg className={s.icon}>
              <use href={`${spriteSvg}#icon-down-arrow`}></use>
            </svg>
          </div>
        </div>
        <div className={s.select_box}>
          {isActiveYear && (
            <div ref={domNode} className={s.active}>
              {years.map((el) => (
                <SelectorsOption
                  key={el}
                  isDisabled={yearsRenderingCheckList.includes(el)}
                  title={el}
                  onOptionClick={() => {
                    setSelectYear(el);
                    setIsActiveYear(false);
                  }}
                />
              ))}
            </div>
          )}
          <div
            className={s.selected}
            onClick={() => {
              setIsActiveYear(!isActiveYear);
            }}
          >
            <b className={s.mainSelect}>
              {selectYear !== null ? selectYear : year}
            </b>
            <svg className={s.icon}>
              <use href={`${spriteSvg}#icon-down-arrow`}></use>
            </svg>
          </div>
        </div>
      </div>
      <Button
        styleType={STYLE_TYPE.SECONDARY}
        className={s.reset}
        onClick={resetClick}
        disabled={selectMonth === null && selectYear === null}
        text={t("selectors.reset")}
      />
    </>
  );
};

export default Selectors;

Selectors.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionDate: PropTypes.string,
    })
  ),
  setSelectedDate: PropTypes.func.isRequired,
};
