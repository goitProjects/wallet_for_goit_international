import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wallet.goit.ua/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().session.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Transactions", "TransactionsSummary"],
  endpoints: (build) => ({
    register: build.mutation({
      query: (data) => ({ url: "/auth/sign-up", method: "POST", body: data }),
      invalidatesTags: ["User", "Transactions", "TransactionsSummary"],
    }),
    login: build.mutation({
      query: (data) => ({ url: "/auth/sign-in", method: "POST", body: data }),
      invalidatesTags: ["User", "Transactions", "TransactionsSummary"],
    }),
    logout: build.mutation({
      query: () => ({ url: "/auth/sign-out", method: "DELETE" }),
    }),
    refresh: build.query({
      query: () => "/users/current",
      providesTags: ["User"],
    }),
    getTransactions: build.query({
      query: () => "/transactions",
      providesTags: ["Transactions"],
    }),
    getTransactionsSummary: build.query({
      query: ({ month, year }) =>
        `/transactions-summary${
          month && year ? `?month=${month}&year=${year}` : ""
        }`,
      providesTags: ["TransactionsSummary"],
    }),
    addTransaction: build.mutation({
      query: (data) => ({
        url: "/transactions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transactions", "User", "TransactionsSummary"],
    }),
    deleteTransaction: build.mutation({
      query: (id) => ({ url: `/transactions/${id}`, method: "DELETE" }),
      invalidatesTags: ["Transactions", "User", "TransactionsSummary"],
    }),
    editTransaction: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/transactions/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Transactions", "User", "TransactionsSummary"],
    }),
  }),
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshQuery,
  useGetTransactionsQuery,
  useGetTransactionsSummaryQuery,
  useDeleteTransactionMutation,
  useAddTransactionMutation,
  useEditTransactionMutation,
} = walletApi;
