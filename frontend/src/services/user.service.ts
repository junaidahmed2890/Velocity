import api from "./api";
import TokenService from "./token.service";

const login = (userId: string, password: string) => {
  return api
    .post("/account/login", {
      userId,
      password,
    })
    .then((response) => {
      if (response?.data?.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
const getUsersLists = () => {
  return api
    .get("/account")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("error", error.response.data);
      return error.response.data;
    });
};
const UserService = {
  login,
  getUsersLists,
};

export default UserService;
