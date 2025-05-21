import { doLogin, doRegister, doLogout } from '/Main/scripts/modules/controllers/authController.js';

export function initAuthView() {
  initAuthTabs();
  initLoginForm();
  initRegisterForm();
  initLogoutButton();
}

/** Controla a aba de Login/Cadastro */
function initAuthTabs() {
  const btnLogin = document.getElementById('tabLogin');
  const btnRegister = document.getElementById('tabCadastro');
  const slider = document.getElementById('slider');
  const container = document.getElementById('formsContainer');

  if (!btnLogin || !btnRegister || !slider || !container) return;

  btnLogin.addEventListener('click', () => {
    container.style.transform = 'translateX(0)';
    slider.style.left = '0';
  });

  btnRegister.addEventListener('click', () => {
    container.style.transform = 'translateX(-50%)';
    slider.style.left = '50%';
  });
}

/** Configura o envio do formulário de login */
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const msgEl = form.querySelector('.msg');
    if (msgEl) msgEl.textContent = '';

    const email = form.email?.value.trim();
    const pass = form.password?.value;
    try {
      const user = doLogin(email, pass);
      if (msgEl) {
        msgEl.textContent = `Bem-vindo, ${user.name}!`;
        msgEl.className = 'msg success';
      }
      setTimeout(() => location.href = 'index.html', 800);
    } catch (err) {
      if (msgEl) {
        msgEl.textContent = err.message;
        msgEl.className = 'msg error';
      }
    }
  });
}

/** Configura o envio do formulário de registro */
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const msgEl = form.querySelector('.msg');
    if (msgEl) msgEl.textContent = '';

    const data = {
      name: form.name?.value.trim(),
      email: form.email?.value.trim(),
      pass: form.password?.value,
      tel: form.tel?.value.trim(),
    };

    try {
      doRegister(data);
      if (msgEl) {
        msgEl.textContent = 'Cadastro realizado com sucesso!';
        msgEl.className = 'msg success';
      }
      form.reset();
      document.getElementById('tabLogin')?.click();
    } catch (err) {
      if (msgEl) {
        msgEl.textContent = err.message;
        msgEl.className = 'msg error';
      }
    }
  });
}

/** Configura o botão de logout, se existir */
function initLogoutButton() {
  const btn = document.getElementById('btnLogout');
  if (!btn) return;
  btn.addEventListener('click', () => {
    doLogout();
    window.location.reload();
  });
}