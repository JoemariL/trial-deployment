import API from "../config/api";
import Cookies from "js-cookie";

const config = {
  headers: {
    "Content-Type": "application/json",
    "authorization": "Bearer " + Cookies.get("accessToken"),
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
    vaccineStatus: payload.vaccine_status,
    vaccineDate: payload.vaccine_date,
    vaccineSerial: payload.vaccine_serial_no,
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

export const updateProfile = async (payload) => {
  const body = JSON.stringify({
    age: payload.age,
    contactNumber: payload.contactNumber,
    homeAddress: payload.homeAddress,
    department: payload.department
  })
  return API.patch("/user/update", body, config)
    .then(() => {
      return true
    })
    .catch((err) => {
      return err.response?.data?.errors;
    })
}

export const updatePassword = async (payload) => {
  const body = JSON.stringify({
    oldPassword: payload.oldPassword,
    newPassword: payload.newPassword,
    confirmNewPassword: payload.confirmNewPassword
  })
  return API.patch("/user/update/password", body, config)
    .then(() =>{
      return true
    })
    .catch((err) => {
      return err.response?.data?.errors;
    })
}

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
  const body = JSON.stringify({
    qrCode: payload.qrCode,
    destination: payload.destination
  });

  return API.post("/hdf/scan", body, config)
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};
