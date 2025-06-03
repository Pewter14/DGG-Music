// login.js
document.addEventListener('DOMContentLoaded', () => {
  const btnLogin = document.getElementById('tabLogin');
  const btnCadastro = document.getElementById('tabCadastro');
  const slider = document.getElementById('slider');
  const forms = document.getElementById('formsContainer');

  btnLogin.addEventListener('click', () => {
    forms.style.transform = 'translateX(0%)';
    slider.style.left = '0%';
  });

  btnCadastro.addEventListener('click', () => {
    forms.style.transform = 'translateX(-50%)';
    slider.style.left = '50%';
  });

  // 2) Processa o envio do formulário de Cadastro
  const registerForm = document.getElementById('registerForm');
  const registerMsgContainer = registerForm.querySelector('.msg');

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Pega os valores do form de cadastro
    const nome     = registerForm.name.value.trim();
    const email    = registerForm.email.value.trim();
    const senha    = registerForm.password.value.trim();
    const telefone = registerForm.tel.value.trim();
    const cpf      = registerForm.cpf.value.trim();
    const date     = registerForm.date.value.trim();

    // Limpa mensagem anterior
    registerMsgContainer.textContent = '';

    // Validações básicas
    if (nome.length < 3) {
      registerMsgContainer.textContent = 'Nome muito curto.';
      registerMsgContainer.style.color = 'crimson';
      return;
    }
    if (!email.includes('@') || senha.length < 4) {
      registerMsgContainer.textContent = 'E-mail ou senha inválidos.';
      registerMsgContainer.style.color = 'crimson';
      return;
    }

    // Monta um objeto para representar esse usuário, incluindo um ID único
    const novoUsuario = {
      id: Date.now(),          
      nome,
      email,
      senha,
      telefone: telefone || '',
      cpf: cpf || '',
      date: date || ''
    };

    // Pega array “users” do localStorage
    const usuariosSalvos = JSON.parse(localStorage.getItem('dgg_users') || '[]');

    // Verifica se já existe esse e-mail cadastrado
    const jaExiste = usuariosSalvos.some(u => u.email === email);
    if (jaExiste) {
      registerMsgContainer.textContent = 'Este e-mail já está cadastrado.';
      registerMsgContainer.style.color = 'crimson';
      return;
    }

    // Adiciona ao array e salva
    usuariosSalvos.push(novoUsuario);
    localStorage.setItem('dgg_users', JSON.stringify(usuariosSalvos));

    registerMsgContainer.textContent = 'Cadastro realizado com sucesso! Agora faça login.';
    registerMsgContainer.style.color = 'limegreen';

    registerForm.reset();

    // Abre a aba de Login
    setTimeout(() => {
      btnLogin.click();
      registerMsgContainer.textContent = '';
    }, 1200);
  });

  // 3) Processa o envio do formulário de Login
  const loginForm = document.getElementById('loginForm');
  const loginMsgContainer = loginForm.querySelector('.msg');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email       = loginForm.email.value.trim();
    const senha       = loginForm.password.value.trim();
    const manterLogado = document.getElementById('manter').checked;
    const isAdminChk   = document.getElementById('admin').checked;
    loginMsgContainer.textContent = '';

    const usuariosSalvos = JSON.parse(localStorage.getItem('dgg_users') || '[]');

    let usuarioEncontrado = null;
    if (isAdminChk) {
      if (email === 'admin@email.com' && senha === 'admin123') {
        usuarioEncontrado = {
          id: -1,
          nome: 'Administrador',
          email,
          isAdmin: true
        };
      }
    }

    if (!usuarioEncontrado) {
      const original = usuariosSalvos.find(u => u.email === email && u.senha === senha);
      if (original) {
        usuarioEncontrado = {
          id: original.id,
          nome: original.nome,
          email: original.email,
          isAdmin: false
        };
      }
    }

    if (!usuarioEncontrado) {
      loginMsgContainer.textContent = 'E-mail ou senha inválidos.';
      loginMsgContainer.style.color = 'crimson';
      return;
    }
    const storage = manterLogado ? localStorage : sessionStorage; //??????????????????????

    storage.setItem('dgg_session', JSON.stringify({
      id: usuarioEncontrado.id,
      isAdmin: usuarioEncontrado.isAdmin,
      email: usuarioEncontrado.email
    }));
    storage.setItem('username', usuarioEncontrado.nome);
    storage.setItem('userEmail', usuarioEncontrado.email);
    storage.setItem('isAdmin', usuarioEncontrado.isAdmin);

    window.location.href = '/Main/others/Home/home.html';
  });
});
