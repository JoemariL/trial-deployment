import API from "../config/api";
import Cookies from "js-cookie";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const addVisitor = async (payload) => {
  const body = payload;
  return API.post("/visitor/generate", body, config)
    .then(() => {
      return true;
    })
    .then((err) => {
      return err.response?.data?.errors;
    });
};

export const getVisitor = async () => {
  return API.get("/visitor/get", config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};
