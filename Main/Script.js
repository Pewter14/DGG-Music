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
