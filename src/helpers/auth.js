export const logoutFunc = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

export const setupLogin = (token) => {
  localStorage.setItem("token", token);
};
