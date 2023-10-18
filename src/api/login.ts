import myAxiosInstance from "./axios";

const login = (username: string, password: string) => {
  return myAxiosInstance
    .post("/login_check", {
      login: username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export default login;
