import UserService from "../services/UserService.js";
import paramsPage from "../js/paramsPage.js";
import popup from "../js/modules/popup.js";

export async function login(mail, password) {
  if (paramsPage.login.admin) {
    popup.init(`<i class="fa-solid fa-bug"></i> Usuario ya logeado`)
    return true;
  }
  if (!mail || !password) return false;
  let result = await UserService.getUser({mail, password});
  if (!UserService.checkSuccessfulFetch(result)) {
    popup.init(`<i class="fa-solid fa-xmark"></i> Error en password o mail`)
    return false;
  }
  localStorage.setItem("mail", result.mail);
  localStorage.setItem("password", result.password);
  paramsPage.login.admin = true;
  paramsPage.login.mail = mail;
  paramsPage.login.password = password
  popup.init(`<i class="fa-solid fa-check"></i> Usuario logeado correctamente! Bienvenido`)
  return true;
}

export function logout() {
  if (!paramsPage.login.admin) {
    popup.init(`<i class="fa-solid fa-bug"></i> No hay usuario logeado`);
    return;
  }
  localStorage.removeItem("mail");
  localStorage.removeItem("password");
  paramsPage.login.admin = false;
  popup.init(`<i class="fa-solid fa-check"></i> Usuario deslogeado correctamente`)
}

export async function checkAdmin() {
  const mail = localStorage.getItem("mail");
  const password = localStorage.getItem("password");
  try {
    await login(mail, password);
  } catch (e) {
    localStorage.removeItem("mail");
    localStorage.removeItem("password");
  }
}