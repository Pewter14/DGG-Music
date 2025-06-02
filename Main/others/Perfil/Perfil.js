// Perfil.js

// Função que exibe/oculta o formulário de edição
function editProfile() {
  const editForm = document.querySelector(".edit-form");
  editForm.classList.toggle("hidden");
}

// Função que salva as alterações feitas no perfil
function saveChanges() {
  const nameInput = document.getElementById("name-input");
  const emailInput = document.getElementById("email-input");
  const cpfInput = document.getElementById("cpf-input");
  const phoneInput = document.getElementById("phone-input");
  const passwordInput = document.getElementById("password-input");
  const photoInput = document.getElementById("photo-input");

  const profileNameElem = document.getElementById("profile-name");
  const profilePicElem = document.getElementById("profile-pic");

  // 1) Atualiza o nome, gravando em localStorage.profileName e localStorage.username
  if (nameInput.value.trim()) {
    const novoNome = nameInput.value.trim();
    profileNameElem.textContent = novoNome;
    localStorage.setItem("profileName", novoNome);
    localStorage.setItem("username", novoNome);

    // Atualiza imediatamente o texto na sidebar (se já estiver visível)
    const userInfo = document.querySelector(".user-info");
    if (userInfo) {
      userInfo.innerHTML = `<i class="fas fa-user-circle"></i> ${novoNome}`;
    }
  }

  // 2) Atualiza a foto, gravando no localStorage.profilePic como Data URL
  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePicElem.src = e.target.result;
      localStorage.setItem("profilePic", e.target.result);
    };
    reader.readAsDataURL(photoInput.files[0]);
  }

  // 3) Grava os outros campos (mas não afetam a sidebar)
  if (emailInput.value.trim()) {
    localStorage.setItem("profileEmail", emailInput.value.trim());
  }
  if (cpfInput.value.trim()) {
    localStorage.setItem("profileCPF", cpfInput.value.trim());
  }
  if (phoneInput.value.trim()) {
    localStorage.setItem("profilePhone", phoneInput.value.trim());
  }
  if (passwordInput.value.trim()) {
    localStorage.setItem("profilePassword", passwordInput.value.trim());
  }

  // 4) Esconde o formulário de edição após salvar
  document.querySelector(".edit-form").classList.add("hidden");
}

// Ao carregar a página, preenchendo campos a partir do localStorage
window.addEventListener("load", () => {
  const savedName = localStorage.getItem("profileName");
  const savedPic = localStorage.getItem("profilePic");
  const savedEmail = localStorage.getItem("profileEmail");
  const savedCPF = localStorage.getItem("profileCPF");
  const savedPhone = localStorage.getItem("profilePhone");
  const savedPassword = localStorage.getItem("profilePassword");

  // 1) Preenche o nome no perfil e no campo de edição
  if (savedName) {
    document.getElementById("profile-name").textContent = savedName;
    document.getElementById("name-input").value = savedName;

    // Também atualiza a sidebar, caso já esteja visível
    const userInfo = document.querySelector(".user-info");
    if (userInfo) {
      userInfo.innerHTML = `<i class="fas fa-user-circle"></i> ${savedName}`;
    }
  }

  // 2) Preenche a foto de perfil
  if (savedPic) {
    document.getElementById("profile-pic").src = savedPic;
  }

  // 3) Preenche os campos de email, CPF, telefone e senha no formulário
  if (savedEmail) {
    document.getElementById("email-input").value = savedEmail;
  }
  if (savedCPF) {
    document.getElementById("cpf-input").value = savedCPF;
  }
  if (savedPhone) {
    document.getElementById("phone-input").value = savedPhone;
  }
  if (savedPassword) {
    document.getElementById("password-input").value = savedPassword;
  }

  // 4) Controle de exibição/ocultação da senha
  const togglePasswordBtn = document.getElementById("toggle-password");
  togglePasswordBtn.addEventListener("click", function () {
    const pwInput = document.getElementById("password-input");
    const icon = this.querySelector("i");
    if (pwInput.type === "password") {
      pwInput.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      pwInput.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
});
