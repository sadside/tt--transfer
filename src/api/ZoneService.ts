import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import AuthService from "../services/AuthService";
import userSlice from "../store/userSlice";
import { IFullHub, IHubs } from "../types/types";

export const zoneAPI = createApi({
  reducerPath: "zoneAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    headers: {
      Authorization: `accessToken ${localStorage.getItem("token")}`,
    },
    credentials: "include",
  }),
  // baseQueryWithReauth: (any = async (args, api, extraOptions) => {
  //   let result = await baseQuery(args, api, extraOptions);
  //   if (result.error && result.error.status === 401) {
  //     // try to get a new token
  //     const response = await UserServices.checkAuth();
  //     if (response.statusText === "OK") {
  //       // store the new token
  //       localStorage.setItem("token", response.data.access);
  //     } else {
  //       window.location.href = "/login";
  //     }
  //   }
  //   return result;
  // }),
  tagTypes: ["Hub"],
  endpoints: (build) => ({
    fetchAllHubs: build.query<IFullHub[], { region: string; city: string }>({
      query: ({ region, city }) => ({
        url: "/address/hub/",
        params: {
          region,
          city,
        },
      }),
      transformResponse: (response: { hubs: IFullHub[] }) => {
        return response.hubs;
      },
      providesTags: (result) => ["Hub"],
    }),
    createHub: build.mutation<IFullHub, any>({
      query: ({ title, description, coordinates, region, city }) => ({
        url: "/address/hub/",
        method: "POST",
        body: { title, description, coordinates, region, city },
      }),
      invalidatesTags: ["Hub"],
    }),
  }),
});

export const { useFetchAllHubsQuery, useCreateHubMutation } = zoneAPI;
