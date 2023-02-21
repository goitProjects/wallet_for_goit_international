import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { colorsChange } from "assets/constants/COLORS";
import Chart from "components/Chart";
import Loader from "components/Loader";
import { useTranslation } from "react-i18next";

import s from "./DiagramTab.module.scss";
import Table from "components/Table";
import Selectors from "components/Selectors";
import {
  useGetTransactionsQuery,
  useGetTransactionsSummaryQuery,
} from "redux/wallet";

import { isButtonShown } from "redux/session";
import { memo } from "react";

const DiagramTab = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [selectedDate, setSelectedDate] = useState({ month: 0, year: 0 });

  const { data: diagData, isLoading: diagLoader } =
    useGetTransactionsSummaryQuery(selectedDate);

  const { data: transactions } = useGetTransactionsQuery();

  const changedData = useMemo(() => {
    if (!Object.keys(diagData || {})?.length) {
      return false;
    }
    return {
      ...diagData,
      categoriesSummary: diagData?.categoriesSummary.map((el) => {
        const colorKey = el.name.toLowerCase().replace(/ /g, "");
        return {
          ...el,
          color: colorsChange[colorKey],
        };
      }),
    };
  }, [diagData]);

  const dataWithoutIncome = useMemo(
    () =>
      changedData?.categoriesSummary?.filter(
        (item) => item.type !== "INCOME"
      ) || [],
    [changedData]
  );

  useEffect(() => {
    dispatch(isButtonShown(false));
  }, [dispatch]);

  return (
    <div>
      {diagLoader ? (
        <Loader />
      ) : (
        <>
          <h2>{t("diagram.statistic")}</h2>
          <div className={s.diagram}>
            <Chart data={changedData} />
            <div className={s.table}>
              <Selectors transactions={transactions} setSelectedDate={setSelectedDate} />
              <Table
                type="chart"
                data={dataWithoutIncome}
                transactions={transactions}
                income={changedData?.incomeSummary}
                expense={changedData?.expenseSummary}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default memo(DiagramTab);
