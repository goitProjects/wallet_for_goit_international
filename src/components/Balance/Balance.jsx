import s from "./Balance.module.scss";
import { useTranslation } from "react-i18next";

export default function Balance({ balance }) {
  const { t } = useTranslation();
  return (
    <div className={s.balance}>
      <p className={s.balanceTitle}>{t("balance.balance")}</p>
      <p className={s.balanceValue}>
        <span className={s.symbol}>₴ {balance?.toFixed(2)}</span>
      </p>
    </div>
  );
}
