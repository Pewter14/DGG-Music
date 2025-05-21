// auth.js
import { UsersModel } from './userModel.js';

document.addEventListener('DOMContentLoaded', () => {
  // abas
  const btnLoginTab    = document.getElementById('tabLogin');
  const btnCadastroTab = document.getElementById('tabCadastro');
  const slider         = document.getElementById('slider');
  const formsContainer = document.getElementById('formsContainer');

  btnLoginTab.onclick = () => {
    formsContainer.style.transform = 'translateX(0%)';
    slider.style.left = '0%';
  };
  btnCadastroTab.onclick = () => {
    formsContainer.style.transform = 'translateX(-50%)';
    slider.style.left = '50%';
  };

  // login
  const loginForm  = document.querySelector('#formsContainer .form-content:nth-child(1)');
  const loginEmail = loginForm.querySelector('input[type="email"]');
  const loginPass  = loginForm.querySelector('input[type="password"]');
  const adminChk   = loginForm.querySelector('#admin');
  const loginBtn   = loginForm.querySelector('button');
  const loginMsg   = document.createElement('div');
  loginForm.appendChild(loginMsg);

  loginBtn.onclick = e => {
    e.preventDefault();
    loginMsg.textContent = '';
    const email = loginEmail.value.trim(), pass = loginPass.value;
    if (!email || !pass) {
      loginMsg.textContent = 'Preencha e-mail e senha.';
      loginMsg.style.color = 'red';
      return;
    }
    try {
      const user = UsersModel.login(email, pass);
      loginMsg.textContent = `Bem-vindo, ${user.name}!`;
      loginMsg.style.color = 'green';
      setTimeout(() => {
        location.href = 'index.html';
      }, 800);
    } catch (err) {
      loginMsg.textContent = err.message;
      loginMsg.style.color = 'red';
    }
  };

    // Cadastro
    const regForm   = document.querySelector('#formsContainer .form-content:nth-child(2)');
    const [inpName, inpEmail, inpPass, inpTel] = regForm.querySelectorAll('input');
    const regBtn    = regForm.querySelector('button');
    const regMsg    = document.createElement('div');
    regForm.appendChild(regMsg);
  
    regBtn.onclick = e => {
      e.preventDefault();
      regMsg.textContent = '';
      const name  = inpName.value.trim();
      const email = inpEmail.value.trim();
      const pass  = inpPass.value;
      const tel   = inpTel.value.trim();
  
      if (!name || !email || !pass) {
        regMsg.textContent = 'Nome, e-mail e senha são obrigatórios.';
        regMsg.style.color = 'red';
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        regMsg.textContent = 'E-mail inválido.';
        regMsg.style.color = 'red';
        return;
      }
  
      try {
        UsersModel.create({ name, email, pass, tel });
        regMsg.textContent = 'Cadastro realizado com sucesso!';
        regMsg.style.color = 'green';
  
        // limpa campos manualmente
        inpName.value = '';
        inpEmail.value = '';
        inpPass.value = '';
        inpTel.value = '';
  
        btnLoginTab.click();
      } catch (err) {
        regMsg.textContent = err.message;
        regMsg.style.color = 'red';
      }
    };
});
