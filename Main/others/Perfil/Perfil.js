document.addEventListener('DOMContentLoaded', () => {
  // Pega sessão (tenta localStorage primeiro, depois sessionStorage)
  let sessionData = localStorage.getItem('dgg_session') || sessionStorage.getItem('dgg_session');
  if (!sessionData) {
    alert('Usuário não logado.');
    window.location.href = '/Main/others/Login/Login.html';
    return;
  }
  const session = JSON.parse(sessionData);
  const { id, isAdmin, email } = session;

  // Pega elementos DOM
  const nomeSpan   = document.getElementById('nome-usuario');
  const emailSpan  = document.getElementById('email-usuario');
  const cpfSpan    = document.getElementById('cpf-usuario');
  const telSpan    = document.getElementById('telefone-usuario');
  const profileName = document.getElementById('profile-name');
  const profilePic  = document.getElementById('profile-pic');

  const viewInfo   = document.getElementById('view-info');
  const editForm   = document.querySelector('.edit-form');
  const nameInput     = document.getElementById('name-input');
  const emailInput    = document.getElementById('email-input');
  const cpfInput      = document.getElementById('cpf-input');
  const phoneInput    = document.getElementById('phone-input');
  const passwordInput = document.getElementById('password-input');
  const photoInput    = document.getElementById('photo-input');

  const btnEditar       = document.getElementById('btn-editar');
  const togglePasswordBtn = document.getElementById('toggle-password');

  // Pega array de usuários
  const users = JSON.parse(localStorage.getItem('dgg_users') || '[]');

  // Encontra o usuário pelo campo id
  let userIndex = users.findIndex(u => u.id === id);
  let user = users[userIndex];

  if (!user && !isAdmin) {
    alert('Usuário não encontrado.');
    window.location.href = '/Main/others/Login/Login.html';
    return;
  }

  // Função para mostrar dados na view-info e no topo do perfil
  function preencherDados() {
    if (isAdmin) {
      nomeSpan.textContent   = 'Administrador';
      emailSpan.textContent  = email;
      cpfSpan.textContent    = '—';
      telSpan.textContent    = '—';
      profileName.textContent = 'Administrador';
      profilePic.src = 'https://via.placeholder.com/150';
    } else {
      nomeSpan.textContent    = user.nome;
      emailSpan.textContent   = user.email;
      cpfSpan.textContent     = user.cpf || '—';
      telSpan.textContent     = user.telefone || '—';
      profileName.textContent  = user.nome;
      profilePic.src = user.foto || 'https://via.placeholder.com/150';
    }
  }

  // Mostra a view e esconde o formulário
  function showViewInfo() {
    viewInfo.classList.remove('hidden');
    editForm.classList.add('hidden');
  }

  // Mostra o formulário e esconde a view, preenchendo inputs
  function showEditForm() {
    if (!isAdmin) {
      nameInput.value     = user.nome || '';
      emailInput.value    = user.email || '';
      cpfInput.value      = user.cpf   || '';
      phoneInput.value    = user.telefone || '';
      passwordInput.value = '';
      photoInput.value    = '';
    }
    viewInfo.classList.add('hidden');
    editForm.classList.remove('hidden');
  }

  // Converter arquivo para base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = () => resolve(reader.result);
      reader.onerror = err => reject(err);
      reader.readAsDataURL(file);
    });
  }

  // Atualiza foto ao selecionar
  photoInput.addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      profilePic.src = base64;
      if (!isAdmin) {
        user.foto = base64;
      }
    } catch (err) {
      console.error('Erro ao carregar imagem:', err);
    }
  });

  // Salva alterações no usuário
  function salvarUsuarios() {
    if (!isAdmin) {
      user.nome      = nameInput.value.trim() || user.nome;
      user.email     = emailInput.value.trim() || user.email;
      user.cpf       = cpfInput.value.trim();
      user.telefone  = phoneInput.value.trim();
      if (passwordInput.value.trim() !== '') {
        user.senha = passwordInput.value.trim();
      }

      users[userIndex] = user;
      localStorage.setItem('dgg_users', JSON.stringify(users));

      // Atualiza sessão
      session.nome     = user.nome;
      session.email    = user.email;
      session.cpf      = user.cpf;
      session.telefone = user.telefone;
      localStorage.setItem('dgg_session', JSON.stringify(session));
      sessionStorage.setItem('dgg_session', JSON.stringify(session));
      localStorage.setItem('username', user.nome);
      sessionStorage.setItem('username', user.nome);
    }
    preencherDados();
    showViewInfo();
  }

  // Eventos
  btnEditar.addEventListener('click', () => {
    showEditForm();
  });
  window.saveChanges = salvarUsuarios;

  togglePasswordBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePasswordBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
      passwordInput.type = 'password';
      togglePasswordBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
  });

  preencherDados();
  showViewInfo();
});
