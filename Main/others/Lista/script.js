// script.js
import { UsersModel } from '/Main/scripts/modules/models/userModel.js';

const tableBody   = document.getElementById('userTableBody');
const searchInput = document.getElementById('searchInput');
const editModal   = document.getElementById('editModal');
const editForm    = document.getElementById('editForm');
const editId      = document.getElementById('editId');
const editName    = document.getElementById('editName');
const editEmail   = document.getElementById('editEmail');
const editTel     = document.getElementById('editTel');
const editCpf     = document.getElementById('editCpf');

// Renderiza a tabela com a lista de usuários
function renderTable(users) {
  tableBody.innerHTML = '';

  if (users.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5">Nenhum usuário encontrado.</td></tr>`;
    return;
  }

  users.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.nome}</td>
      <td>${user.email}</td>
      <td>${user.telefone || '-'}</td>
      <td>${user.cpf || '-'}</td>
      <td>
        <button data-id="${user.id}" class="btn-edit"><i class="fa fa-edit"></i></button>
        <button data-id="${user.id}" class="btn-delete"><i class="fa fa-trash"></i></button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// Filtra usuários conforme o campo de busca
function filtrarUsuarios() {
  const termo = searchInput.value.toLowerCase();
  const todos = UsersModel._loadAll();

  const filtrados = todos.filter(u =>
    u.nome.toLowerCase().includes(termo) ||
    u.email.toLowerCase().includes(termo) ||
    (u.cpf && u.cpf.includes(termo))
  );

  renderTable(filtrados);
}

searchInput.addEventListener('input', filtrarUsuarios);

// Exclui usuário pelo id clicado
function excluirUsuario(id) {
  const todos = UsersModel._loadAll();
  const atualizados = todos.filter(u => u.id !== id);
  UsersModel._saveAll(atualizados);
  filtrarUsuarios();
}

// Abre o modal de edição preenchendo com dados do usuário
function editarUsuario(id) {
  const user = UsersModel._loadAll().find(u => u.id === id);
  if (!user) {
    alert('Usuário não encontrado.');
    return;
  }

  editId.value    = user.id;
  editName.value  = user.nome;
  editEmail.value = user.email;
  editTel.value   = user.telefone || '';
  editCpf.value   = user.cpf || '';

  editModal.style.display = 'flex';
}

// Fecha o modal de edição
function fecharModal() {
  editModal.style.display = 'none';
}

// Processa o formulário de edição
editForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const id    = Number(editId.value);
  const nome  = editName.value.trim();
  const email = editEmail.value.trim();
  const tel   = editTel.value.trim();
  const cpf   = editCpf.value.trim();

  const users = UsersModel._loadAll();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    alert('Usuário não encontrado.');
    return;
  }

  // Atualiza dados
  users[index].nome     = nome;
  users[index].email    = email;
  users[index].telefone = tel;
  users[index].cpf      = cpf;

  UsersModel._saveAll(users);
  fecharModal();
  filtrarUsuarios();
});

// Eventos para editar/excluir
tableBody.addEventListener('click', e => {
  const button = e.target.closest('button');
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.classList.contains('btn-edit')) {
    editarUsuario(id);
  }
  if (button.classList.contains('btn-delete')) {
    excluirUsuario(id);
  }
});

filtrarUsuarios();
