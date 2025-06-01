function editProfile() {
  document.querySelector('.edit-form').classList.remove('hidden');
}

function saveChanges() {
  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');
  const cpfInput = document.getElementById('cpf-input');
  const phoneInput = document.getElementById('phone-input');
  const passwordInput = document.getElementById('password-input');
  const photoInput = document.getElementById('photo-input');
  
  const profileName = document.getElementById('profile-name');
  const profilePic = document.getElementById('profile-pic');

  // Salva o nome
  if (nameInput.value) {
    profileName.textContent = nameInput.value;
    localStorage.setItem('profileName', nameInput.value); 
  }

  // Salva a foto
  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePic.src = e.target.result;
      localStorage.setItem('profilePic', e.target.result); 
    };
    reader.readAsDataURL(photoInput.files[0]);
  }

  // Salva os outros dados
  if (emailInput.value) localStorage.setItem('profileEmail', emailInput.value);
  if (cpfInput.value) localStorage.setItem('profileCPF', cpfInput.value);
  if (phoneInput.value) localStorage.setItem('profilePhone', phoneInput.value);
  if (passwordInput.value) localStorage.setItem('profilePassword', passwordInput.value);

  document.querySelector('.edit-form').classList.add('hidden');
}

window.addEventListener('load', () => {
  const savedName = localStorage.getItem('profileName');
  const savedPic = localStorage.getItem('profilePic');
  const savedEmail = localStorage.getItem('profileEmail');
  const savedCPF = localStorage.getItem('profileCPF');
  const savedPhone = localStorage.getItem('profilePhone');
  const savedPassword = localStorage.getItem('profilePassword');

  if (savedName) {
    document.getElementById('profile-name').textContent = savedName;
    document.getElementById('name-input').value = savedName;
  }

  if (savedPic) {
    document.getElementById('profile-pic').src = savedPic;
  }

  document.getElementById('toggle-password').addEventListener('click', function () {
  const passwordInput = document.getElementById('password-input');
  const icon = this.querySelector('i');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
});


  // Preenche os campos no formulário (opcional)
  if (savedEmail) document.getElementById('email-input').value = savedEmail;
  if (savedCPF) document.getElementById('cpf-input').value = savedCPF;
  if (savedPhone) document.getElementById('phone-input').value = savedPhone;
  if (savedPassword) document.getElementById('password-input').value = savedPassword;
  
});
