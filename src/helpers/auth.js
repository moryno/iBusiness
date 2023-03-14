export const logoutFunc = () => {
  localStorage.removeItem("token");
  window.location.href = "https://i-business-ui-git-main-moryno.vercel.app/";
};

export const setupLogin = (token) => {
  localStorage.setItem("token", token);
};
