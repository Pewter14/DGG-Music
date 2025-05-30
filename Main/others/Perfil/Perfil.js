function editProfile() {
  document.querySelector('.edit-form').classList.remove('hidden');
}

function saveChanges() {
  const nameInput = document.getElementById('name-input');
  const photoInput = document.getElementById('photo-input');
  const profileName = document.getElementById('profile-name');
  const profilePic = document.getElementById('profile-pic');

  if (nameInput.value) {
    profileName.textContent = nameInput.value;
    localStorage.setItem('profileName', nameInput.value); // Salva nome no localStorage
  }

  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePic.src = e.target.result;
      localStorage.setItem('profilePic', e.target.result); // Salva imagem no localStorage
    };
    reader.readAsDataURL(photoInput.files[0]);
  }

  document.querySelector('.edit-form').classList.add('hidden');
}

// Carrega dados salvos ao abrir a página
window.addEventListener('load', () => {
  const savedName = localStorage.getItem('profileName');
  const savedPic = localStorage.getItem('profilePic');

  if (savedName) {
    document.getElementById('profile-name').textContent = savedName;
  }

  if (savedPic) {
    document.getElementById('profile-pic').src = savedPic;
  }
});


