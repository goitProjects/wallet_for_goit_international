const yearsGenerate = function (startYear) {
  const currentYear = new Date().getFullYear();
  let years = [];
  startYear = startYear || 1980;

  for (let i = startYear; i <= currentYear; i++) {
    years.unshift(i);
  }

  return years;
};

export const years = yearsGenerate(2022 - 10);
