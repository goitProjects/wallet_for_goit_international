import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import s from "./Chart.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ data: { categoriesSummary, periodTotal } }) => {
  const filterCategoriesSum = categoriesSummary?.filter(
    (item) => item.type !== "INCOME"
  );
  const amountCat = filterCategoriesSum?.map((item) => item.total) || [];
  const colorCat = filterCategoriesSum?.map((item) => item.color) || [];

  const data = {
    datasets: [
      {
        data: !!amountCat.length ? amountCat : [1],
        backgroundColor: !!colorCat.length ? colorCat : ["#4a56e2"],
        borderWidth: 0,
      },
    ],
  };
  return (
    <>
      <div className={s.chart}>
        <Doughnut data={data} />
        <b className={s.amount}>&#8372;{periodTotal?.toFixed(2) || "--"}</b>
      </div>
    </>
  );
};

export default Chart;
