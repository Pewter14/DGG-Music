(() => {
  const bottomLogin = document.querySelector('.bottom-login');
  if (!bottomLogin) return;

  // Função para renderizar o bloco do usuário logado
  function renderUser(nomeUsuario) {
    bottomLogin.innerHTML = `
      <div class="user-logged">
        <span><i class="fas fa-user-circle"></i> ${nomeUsuario}</span>
        <button class="logout-btn">Sair</button>
      </div>
    `;

    const logoutBtn = bottomLogin.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('username');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('isAdmin');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('isAdmin');

      window.location.href = '/Main/others/Login/Login.html';
    });
  }

  // Pega nome do usuário armazenado (tenta localStorage e sessionStorage)
  let nomeUsuario = localStorage.getItem('username') || sessionStorage.getItem('username');

  if (nomeUsuario) {
    renderUser(nomeUsuario);
  }

  // Escuta mudanças no localStorage para atualizar o nome do usuário em tempo real
  window.addEventListener('storage', (event) => {
    if (event.key === 'username') {
      const novoNome = event.newValue;
      if (novoNome) {
        renderUser(novoNome);
      } else {
        // Caso username seja removido (logout em outra aba, por exemplo)
        bottomLogin.innerHTML = '';
      }
    }
  });
})();
