import express from "express";
import cors from "cors";
import conn from "./db.js";
import dotenv from 'dotenv';
dotenv.config();

conn.connect((err) => {
  if (err) console.log(err);
})

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/usuarios", async (req, res) => {
  try {
    conn.execute("SELECT id, nome, email, senha FROM usuarios", (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao pegar usuários.", error: err.message });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ message: "Erro inesperado ao pegar usuários.", error: error.message });
  }
});

app.get("/usuarios/:id", async (req, res) => {
  try {
    const index = req.params.id;
    conn.execute("SELECT id, nome, email, senha FROM usuarios WHERE id = ?", [index], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao pegar usuário.", error: err.message });
      }
      if (!results || results.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      res.status(200).json(results[0]);
    });
  } catch (error) {
    res.status(500).json({ message: "Erro inesperado ao pegar usuário.", error: error.message });
  }
});

app.post("/usuarios", async (req, res) => {
  try {
    const usuario = req.body;
    if (!usuario || !usuario.nome || !usuario.email || !usuario.senha) {
      return res.status(400).json({ message: "Dados incompletos." });
    }
    const valores = [usuario.nome, usuario.email, usuario.senha];
    conn.execute("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", valores, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao criar usuário.", error: err.message });
      }
      res.status(201).json({ message: "Usuário criado!", id: results.insertId });
    });
  } catch (error) {
    res.status(500).json({ message: "Erro inesperado ao criar usuário.", error: error.message });
  }
});

app.put("/usuarios/:id", async (req, res) => {
  try {
    const usuario = req.body.user;
    if (!usuario || !usuario.nome || !usuario.email || !usuario.senha || !usuario.id) {
      return res.status(400).json({ message: "Dados incompletos para edição." });
    }
    const valores = [usuario.nome, usuario.email, usuario.senha, usuario.id];
    conn.execute("UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?", valores, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao editar usuário.", error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Usuário não encontrado para edição." });
      }
      res.status(200).json({ message: "Usuário editado!" });
    });
  } catch (error) {
    res.status(500).json({ message: "Erro inesperado ao editar usuário.", error: error.message });
  }
});

app.delete("/usuarios/:id", async (req, res) => {
  try {
    const index = req.params.id;
    conn.execute("DELETE FROM usuarios WHERE id = ?", [index], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao deletar usuário.", error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Usuário não encontrado para exclusão." });
      }
      res.status(200).json({ message: "Usuário deletado!" });
    });
  } catch (error) {
    res.status(500).json({ message: "Erro inesperado ao deletar usuário.", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Servidor conectado e ouvindo na porta ", PORT);
});