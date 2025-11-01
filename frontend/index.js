const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

const btnEntrar = document.getElementById("entrar-btn");
const btnCriar = document.getElementById("criar-btn");

const mensagemErro = document.getElementById("erro-mensagem-campo");

let estado = 'cadastro';
mudarEstado();

document.addEventListener("DOMContentLoaded", async () => {
  btnCriar.addEventListener("click", (e) => {
    e.preventDefault();
    estado = estado == 'cadastro' ? 'logando' : 'cadastro';
    mudarEstado();
    mensagemErro.textContent = "";
  });

  btnEntrar.addEventListener("click", async (e) => {
    e.preventDefault();
    mensagemErro.textContent = "";

    if (estado === 'cadastro') {
      // Validação básica frontend
      if (!nome.value || !email.value || !senha.value) {
        mensagem('erro', mensagemErro, 'Preencha todos os campos.');
        return;
      }
      const user = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
      };
      try {
        const req = await fetch("http://localhost:3000/usuarios/", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
        const res = await req.json();
        if (!req.ok) {
          mensagem('erro', mensagemErro, res.message || 'Erro ao criar usuário.');
          return;
        }
        mensagem('ok', mensagemErro, res.message);
        estado = 'logando';
        mudarEstado();
      } catch (err) {
        mensagem('erro', mensagemErro, 'Erro de conexão com o servidor.');
      }
    } else if (estado === 'logando') {
      // Validação básica frontend
      if (!email.value || !senha.value) {
        mensagem('erro', mensagemErro, 'Preencha e-mail e senha.');
        return;
      }
      try {
        const user = {
          email:email.value,
          senha: senha.value
        }
        const req = await fetch("http://localhost:3000/usuarios/login", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
        const res = await req.json();
        if (!req.ok) {
          mensagem('erro', mensagemErro, res.message || 'Erro ao fazer login.');
          return;
        }
        resetForm();
        window.location.href = "./pages/home.html";
      } catch (err) {
        mensagem('erro', mensagemErro, 'Erro de conexão com o servidor.');
      }
    }
  });
});

function resetForm() {
  nome.value = "";
  email.value = "";
  senha.value = "";
}

function mudarEstado() {
  if (estado === 'cadastro') {
    nome.parentElement.style.display = "flex";
    btnEntrar.textContent = "Criar Conta";
    btnCriar.textContent = "Fazer Login";
  } else if (estado === 'logando') {
    nome.parentElement.style.display = "none";
    btnEntrar.textContent = "Fazer Login";
    btnCriar.textContent = "Criar Conta";
  }
}

function mensagem(tipo, elemento, mensagem) {
  elemento.textContent = mensagem;
  elemento.style.color = tipo === 'erro' ? 'red' : 'lightgreen';
}