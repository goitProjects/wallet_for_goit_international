import axios from "axios";

const axiosCurrency = axios.create({
  baseURL: "https://api.monobank.ua/bank",
});

const currencyCodes = {
  978: "EUR",
  840: "USD",
  985: "PLN",
  980: "UAH",
};

async function fetchCurrency() {
  try {
    const { data } = await axiosCurrency.get("/currency");
    return data
    // return currencyData
      .filter((el) => {
        const isCodeA = currencyCodes[`${el.currencyCodeA}`] !== undefined;
        return el.currencyCodeB === 980 && isCodeA;
      })
      .map((el) => ({
        ccy: currencyCodes[el.currencyCodeA],
        buy: el.rateBuy > 0 ? el.rateBuy : el.rateCross,
        sale: el.rateSell > 0 ? el.rateSell : el.rateCross,
      }));
  } catch (error) {
    throw new Error("not found");
  }
}

export default fetchCurrency;
