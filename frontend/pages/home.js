async function renderizaUsuarios(filtrados) {
  const users = await fectchUsuarios();
  const section = document.getElementById('users-section');
  const usersFiltrados = filtrados ? users.filter(u => (u.nome.toLowerCase().includes(filtrados))|| (u.email.toLowerCase().includes(filtrados))) : users;
  section.innerHTML = usersFiltrados.map(u => `<div class="user-card">
      <div class="user-info">
        <div class="user-name">${u.nome}</div>
        <div class="user-email">${u.email}</div>
      </div>
      <div class="card-actions">
        <button class="btn btn-edit" data-id="${u.id}">Editar</button>
        <button class="btn btn-delete" data-id="${u.id}">Excluir</button>
      </div>
    </div>`
  ).join("");
}
let userId = null;

async function openEditModal(id) {
  usuarioSelecionadoId = id;
  const editModal = document.getElementById("modal-edit");
  editModal.style.display = 'flex';
  const req = await fetch(`http://localhost:3000/usuarios/${id}`);
  const user = await req.json();
  document.getElementById("edit-id").value = user.id;
  document.getElementById("edit-nome").value = user.nome;
  document.getElementById("edit-email").value = user.email;
  document.getElementById("edit-senha").value = user.senha;
}

function closeEditModal() {
  document.getElementById("modal-edit").style.display = 'none';
  userId = null;
}

document.getElementById("cancel-edit").addEventListener("click", closeEditModal);

document.getElementById("edit-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const id = document.getElementById("edit-id").value;
  const nome = document.getElementById("edit-nome").value;
  const email = document.getElementById("edit-email").value;
  const senha = document.getElementById("edit-senha").value;
  const userEdit = { nome, email, senha, id };
  await fetch(`http://localhost:3000/usuarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: userEdit })
  });
  closeEditModal();
  await renderizaUsuarios();
});

function openDeleteModal(id) {
  userId = id;
  document.getElementById("modal-delete").style.display = 'flex';
}
function closeDeleteModal() {
  document.getElementById("modal-delete").style.display = 'none';
  userId = null;
}
document.getElementById("cancel-delete").addEventListener("click", closeDeleteModal);

document.getElementById("confirm-delete").addEventListener("click", async function () {
  if (!userId) return;
  await fetch(`http://localhost:3000/usuarios/${userId}`, {
    method: 'DELETE'
  });
  closeDeleteModal();
  await renderizaUsuarios();
});

document.getElementById('users-section').addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-edit')) {
    const id = e.target.dataset.id;
    openEditModal(id);
  }
  if (e.target.classList.contains('btn-delete')) {
    const id = e.target.dataset.id;
    openDeleteModal(id);
  }
});

window.addEventListener("click", function (event) {
  const editModal = document.getElementById("modal-edit");
  const deleteModal = document.getElementById("modal-delete");
  if (event.target === editModal) closeEditModal();
  if (event.target === deleteModal) closeDeleteModal();
});

document.getElementById("search").addEventListener("input", (e) => {
  const digitado = e.target.value;
  renderizaUsuarios(digitado);
});

async function fectchUsuarios() {
  const req = await fetch("http://localhost:3000/usuarios");
  const res = await req.json();
  return res;
}

renderizaUsuarios();