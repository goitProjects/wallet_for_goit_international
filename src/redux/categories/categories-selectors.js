export const categoriesSelector = (state) => state.categories.data;
export const categoriesErrorSelector = (state) => state.categories.error;
export const categoriesIsLoadingSelector = (state) =>
  state.categories.isLoading;
