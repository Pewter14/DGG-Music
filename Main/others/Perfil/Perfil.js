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
  }

  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePic.src = e.target.result;
    };
    reader.readAsDataURL(photoInput.files[0]);
  }

  document.querySelector('.edit-form').classList.add('hidden');
}

