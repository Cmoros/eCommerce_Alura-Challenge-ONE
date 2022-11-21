import UserService from "../services/UserService.js";
import paramsPage from "../js/paramsPage.js";

export async function login(mail, password) {
  if (!mail || !password) return false;
  const params = new URLSearchParams({ mail, password });
  let result = await UserService.getUser(params);
  if (!UserService.checkSuccessfulFetch(result)) {
    return false;
  }
  result = result[0];
  console.log("result", result);
  localStorage.setItem("mail", result.mail);
  localStorage.setItem("password", result.password);
  paramsPage.login.admin = true;
  paramsPage.login.mail = mail;
  paramsPage.login.password = password
  return true;
}

export function logout() {
  localStorage.removeItem("mail");
  localStorage.removeItem("password");
  paramsPage.login.admin = false;
}
