import API from "../config/api";
import Cookies from "js-cookie";

const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + Cookies.get("accessToken"),
  },
};

export const getUserData = async () => {
  return API.get("/user/get", config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};

export const getRefreshToken = async () => {
  return API.post("/controller/token", config)
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};

export const updateVaccine = async (payload) => {
  const body = JSON.stringify({
    vaccineStatus: payload.vacStatus,
    vaccineDate: payload.vacDate,
    vaccineSerial: payload.vacSerial,
  });
  return API.post("/user/vaccination", body, config)
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};

export const getHdfDay = async () => {
  return API.get("/hdf/day-user", config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};

export const generateHdf = async (payload) => {
  const body = JSON.stringify({
    covidExposure: payload.covidExposure,
    covidPositive: payload.covidPositive,
    fever: payload.fever,
    cough: payload.cough,
    cold: payload.cold,
    soreThroat: payload.soreThroat,
    diffBreathing: payload.diffBreathing,
    diarrhea: payload.diarrhea,
    pregnant: payload.pregnant,
    destination: payload.destination,
  });
  return API.post("/hdf/generate", body, config)
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};

export const scanQR = async (payload) => {
  const hdfID = payload.hdfID;
  const body = JSON.stringify({
    qrCode: payload.qrCode,
  });

  return API.post(`/hdf/scan/${hdfID}`, body, config)
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};
