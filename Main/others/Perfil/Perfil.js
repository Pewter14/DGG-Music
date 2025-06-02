document.addEventListener('DOMContentLoaded', () => {
  // Pega sessão
  let session = JSON.parse(localStorage.getItem('dgg_session') || sessionStorage.getItem('dgg_session'));
  if (!session) {
    alert('Usuário não logado.');
    window.location.href = '/Main/others/Login/Login.html';
    return;
  }

  const { id, isAdmin, email } = session;

  // Pega elementos DOM
  const nomeSpan = document.getElementById('nome-usuario');
  const emailSpan = document.getElementById('email-usuario');
  const cpfSpan = document.getElementById('cpf-usuario');
  const telSpan = document.getElementById('telefone-usuario');

  const profileName = document.getElementById('profile-name');
  const profilePic = document.getElementById('profile-pic'); // Presumo que exista um <img id="profile-pic">

  const viewInfo = document.getElementById('view-info');
  const editForm = document.querySelector('.edit-form');

  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');
  const cpfInput = document.getElementById('cpf-input');
  const phoneInput = document.getElementById('phone-input');
  const passwordInput = document.getElementById('password-input');
  const photoInput = document.getElementById('photo-input');

  const btnEditar = document.getElementById('btn-editar');
  const togglePasswordBtn = document.getElementById('toggle-password');

  // Pega usuários do localStorage
  const users = JSON.parse(localStorage.getItem('dgg_users') || '[]');
  let user = users[id];

  if (!user) {
    alert('Usuário não encontrado.');
    return;
  }

  // Função para mostrar dados na view-info e no topo do perfil
  function preencherDados() {
    if (isAdmin) {
      nomeSpan.textContent = 'Administrador';
      emailSpan.textContent = email;
      cpfSpan.textContent = '—';
      telSpan.textContent = '—';
      profileName.textContent = 'Administrador';
      profilePic.src = 'https://via.placeholder.com/150'; // foto padrão
    } else {
      nomeSpan.textContent = user.nome;
      emailSpan.textContent = user.email;
      cpfSpan.textContent = user.cpf || '—';
      telSpan.textContent = user.telefone || '—';
      profileName.textContent = user.nome;
      profilePic.src = user.foto || 'https://via.placeholder.com/150'; // se não tiver foto, mostra placeholder
    }
  }

  // Mostra a view e esconde o formulário
  function showViewInfo() {
    viewInfo.classList.remove('hidden');
    editForm.classList.add('hidden');
  }

  // Mostra o formulário e esconde a view
  function showEditForm() {
    // Preenche inputs com os dados atuais
    nameInput.value = user.nome || '';
    emailInput.value = user.email || '';
    cpfInput.value = user.cpf || '';
    phoneInput.value = user.telefone || '';
    passwordInput.value = '';
    photoInput.value = '';

    viewInfo.classList.add('hidden');
    editForm.classList.remove('hidden');
  }

  // Converter arquivo para base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Atualiza a foto no preview ao selecionar arquivo
  photoInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const base64 = await fileToBase64(file);
      profilePic.src = base64; // mostra preview no perfil
      user.foto = base64; // atualiza no objeto user para salvar depois
    } catch (err) {
      console.error('Erro ao carregar a imagem:', err);
    }
  });

  // Atualiza o usuário no localStorage e sessionStorage
  function salvarUsuarios() {
    // Atualiza dados do usuário
    user.nome = nameInput.value.trim() || user.nome;
    user.email = emailInput.value.trim() || user.email;
    user.cpf = cpfInput.value.trim();
    user.telefone = phoneInput.value.trim();

    // Atualiza a senha se preenchida
    if (passwordInput.value.trim() !== '') {
      user.senha = passwordInput.value.trim();
    }

    // A foto já foi atualizada no evento change do input

    // Atualiza o array de usuários e salva no localStorage
    users[id] = user;
    localStorage.setItem('dgg_users', JSON.stringify(users));

    // Atualiza o session (usuário logado) com os dados mais recentes do user
    if (session) {
      session.nome = user.nome;
      session.email = user.email;
      session.cpf = user.cpf || session.cpf;
      session.telefone = user.telefone || session.telefone;

      // Salva a sessão atualizada tanto no localStorage quanto no sessionStorage
      localStorage.setItem('dgg_session', JSON.stringify(session));
      sessionStorage.setItem('dgg_session', JSON.stringify(session));

      // Atualiza também a chave 'username' usada no sidebar para exibir nome
      localStorage.setItem('username', user.nome);
      sessionStorage.setItem('username', user.nome);
    }

    preencherDados();
    showViewInfo();
  }

  // Botão editar perfil
  btnEditar.addEventListener('click', () => {
    showEditForm();
  });

  // Botão salvar - chamado no onclick do botão html
  window.saveChanges = salvarUsuarios;

  // Toggle mostrar/ocultar senha
  togglePasswordBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePasswordBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
      passwordInput.type = 'password';
      togglePasswordBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
  });

  // Inicializa dados na tela
  preencherDados();
  showViewInfo();
});
