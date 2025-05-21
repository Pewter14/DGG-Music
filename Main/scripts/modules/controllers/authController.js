import { UsersModel } from '../models/userModel.js';

export function doLogin(email, pass) {
  if (!email || !pass) throw new Error('Preencha e-mail e senha.');
  return UsersModel.login(email, pass);
}

export function doRegister({ name, email, pass, tel }) {
  if (!name || !email || !pass) throw new Error('Nome, e-mail e senha são obrigatórios.');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) throw new Error('E-mail inválido.');
  return UsersModel.create({ name, email, pass, tel });
}

export function doLogout() {
  UsersModel.logout();
}