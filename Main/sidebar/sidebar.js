// Main/sidebar/sidebar.js
(() => {
  const bottomLogin = document.querySelector('.bottom-login');
  if (!bottomLogin) return; // aborta se não encontrar

  const nomeUsuario =
    localStorage.getItem('username') || sessionStorage.getItem('username');
  const isLogado = !!nomeUsuario;

  if (isLogado) {
    bottomLogin.innerHTML = `
      <div class="user-info">
        <i class="fas fa-user-circle"></i> ${nomeUsuario}
      </div>
      <div class="logout-btn">Sair</div>
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
})();
