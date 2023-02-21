const prepareCategories = (categories) => {
  const result = {};
  categories.forEach(({ id, name }) => {
    result[id] = name;
  });
  return result;
};

export default prepareCategories;
