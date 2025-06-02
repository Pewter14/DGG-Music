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
const nome = registerForm.name.value.trim();
const email = registerForm.email.value.trim();
const senha = registerForm.password.value.trim();
const telefone = registerForm.tel.value.trim();
const cpf = registerForm.cpf.value.trim();
const date = registerForm.date.value.trim();

// Limpa mensagem anterior
registerMsgContainer.textContent = '';

// Validações básicas (exemplo mínimo)
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

// Monta um objeto para representar esse usuário
const novoUsuario = {
  nome,
  email,
  senha,
  telefone: telefone || '',
  cpf: cpf || '',
  date: date || ''
};

    // Aqui vamos criar um array “users” no localStorage e empurrar esse novo usuário.
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

    // Informa sucesso
    registerMsgContainer.textContent = 'Cadastro realizado com sucesso! Agora faça login.';
    registerMsgContainer.style.color = 'limegreen';

    // (Opcional) Reseta campos
    registerForm.reset();

    // (Opcional) Já abre a aba de Login após curto delay
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

    // Coleta dados do login
    const email = loginForm.email.value.trim();
    const senha = loginForm.password.value.trim();
    const manterLogado = document.getElementById('manter').checked;
    const isAdmin = document.getElementById('admin').checked;

    // Limpa mensagem anterior
    loginMsgContainer.textContent = '';

    // Pega lista de usuários cadastrados no localStorage
    const usuariosSalvos = JSON.parse(localStorage.getItem('dgg_users') || '[]');

    // Verifica se é admin (simulação de admin hardcoded)
    let usuarioEncontrado = null;
    if (isAdmin) {
      // Exemplo fixo de admin
      if (email === 'admin@exemplo.com' && senha === 'admin123') {
        usuarioEncontrado = {
          nome: 'Administrador',
          email,
          isAdmin: true
        };
      }
    }

    // Se não for admin, busca usuário normal no array
    if (!usuarioEncontrado) {
      usuarioEncontrado = usuariosSalvos.find(u => u.email === email && u.senha === senha);
      if (usuarioEncontrado) {
        usuarioEncontrado = {
          nome: usuarioEncontrado.nome,
          email: usuarioEncontrado.email,
          isAdmin: false
        };
      }
    }

    if (!usuarioEncontrado) {
      loginMsgContainer.textContent = 'E-mail ou senha inválidos.';
      loginMsgContainer.style.color = 'crimson';
      return;
    }

    const storage = manterLogado ? localStorage : sessionStorage;

// Se for admin, não tem ID. Usa -1 como marcador.
if (usuarioEncontrado.isAdmin) {
  storage.setItem('dgg_session', JSON.stringify({
    id: -1,
    isAdmin: true,
    email: usuarioEncontrado.email
  }));

  // 👇 Também salva os dados do admin
  storage.setItem('username', usuarioEncontrado.nome);
  storage.setItem('userEmail', usuarioEncontrado.email);
  storage.setItem('isAdmin', true);
}

 else {
  // Buscar ID do usuário no dgg_users
  const usuarioOriginal = usuariosSalvos.find(u => u.email === email && u.senha === senha);
  storage.setItem('dgg_session', JSON.stringify({
  id: usuariosSalvos.indexOf(usuarioOriginal),
  isAdmin: false,
  email: usuarioOriginal.email
}));

// 👇 Adicionado: salva nome e dados para o sidebar.js funcionar
storage.setItem('username', usuarioOriginal.nome);
storage.setItem('userEmail', usuarioOriginal.email);
storage.setItem('isAdmin', false);
}

    // Redireciona para a página que contém a sidebar
    window.location.href = '/Main/others/Home/home.html';
  });
});
