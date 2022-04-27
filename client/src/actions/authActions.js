import API from "../config/api";
import Cookies from "js-cookie";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const login = async (email, password) => {
  const body = JSON.stringify({
    email,
    password,
  });
  return API.post("/controller/user/login", body, config)
    .then((res) => {
      return Cookies.get("accessToken");
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};

export const logout = async () => {
  return API.delete("/controller/logout", {
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + Cookies.get("accessToken"),
    },
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export const register = async (payload) => {
  const body = JSON.stringify({
    firstName: payload.firstName,
    lastName: payload.lastName,
    password: payload.password,
    age: payload.age,
    contactNumber: payload.contactNumber,
    homeAddress: payload.address,
    email: payload.email,
    userType: payload.userType,
    department: payload.department
  });
  return API.post("/controller/user/register", body, config)
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};
