import { UsersModel } from '/Main/scripts/modules/models/userModel.js';

const tableBody = document.getElementById('userTableBody');
const searchInput = document.getElementById('searchInput');

function renderTable(users) {
  tableBody.innerHTML = '';

  if (users.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4">Nenhum usuário encontrado.</td></tr>`;
    return;
  }

  for (const user of users) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.tel || '-'}</td>
      <td>
        <button onclick="editarUsuario(${user.id})">Editar</button>
        <button onclick="excluirUsuario(${user.id})">Excluir</button>
      </td>
    `;

    tableBody.appendChild(tr);
  }
}

function filtrarUsuarios() {
  const termo = searchInput.value.toLowerCase();
  const todos = UsersModel._loadAll();

  const filtrados = todos.filter(u =>
    u.name.toLowerCase().includes(termo) ||
    u.email.toLowerCase().includes(termo)
  );

  renderTable(filtrados);
}

searchInput.addEventListener('input', filtrarUsuarios);


window.excluirUsuario = function(id) {
  const todos = UsersModel._loadAll();
  const atualizados = todos.filter(u => u.id !== id);
  UsersModel._saveAll(atualizados);
  filtrarUsuarios();
};


filtrarUsuarios();

const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const editId = document.getElementById('editId');
const editName = document.getElementById('editName');
const editEmail = document.getElementById('editEmail');
const editTel = document.getElementById('editTel');

window.editarUsuario = function(id) {
  const user = UsersModel._loadAll().find(u => u.id === id);
  if (!user) return alert('Usuário não encontrado.');

  editId.value = user.id;
  editName.value = user.name;
  editEmail.value = user.email;
  editTel.value = user.tel || '';

  editModal.style.display = 'flex';
};

window.fecharModal = function() {
  editModal.style.display = 'none';
};

editForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const id = Number(editId.value);
  const nome = editName.value.trim();
  const email = editEmail.value.trim();
  const tel = editTel.value.trim();

  const users = UsersModel._loadAll();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return alert('Usuário não encontrado.');

  users[index].name = nome;
  users[index].email = email;
  users[index].tel = tel;

  UsersModel._saveAll(users);
  fecharModal();
  filtrarUsuarios();
});
