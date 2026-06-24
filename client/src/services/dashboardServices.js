import API from "../api/axios";

export const getSummary = async () => {
  const { data } = await API.get(
    "/dashboard/summary"
  );

  return data;
};