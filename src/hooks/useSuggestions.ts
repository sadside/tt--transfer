import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { ICity } from "../types/types";

export const useSuggestions = async (location: ICity | null) => {
  const [value, setValue] = useState<string>("");

  if (location?.name) {
    const response = await axios.post(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      {
        query: value,
        location,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: "Token 48ab36191d6ef5b11a3ae58d406b7d641a1fbd32",
        },
      }
    );

    const suggestions = response.data;

    return { suggestions, setValue, value };
  }
};
