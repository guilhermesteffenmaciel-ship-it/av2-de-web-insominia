import express from "express";
import { tarefas } from "./dados.js";

const app = express();
const PORTA = 3000;

// Permitir receber JSON no corpo da requisição
app.use(express.json());

/*
GET /tarefas
Lista todas as tarefas
*/
app.get("/tarefas", (req, res) => {
  res.status(200).json(tarefas);
});

/*
POST /tarefas
Cria uma nova tarefa
*/
app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

  // Validação mínima
  if (!titulo || titulo.trim() === "") {
    return res.status(400).json({
      erro: "Título é obrigatório."
    });
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo,
    concluida: false
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});


app.patch("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const { titulo, concluida } = req.body;

  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({
      erro: "Tarefa não encontrada."
    });
  }

  // Atualiza somente se vier no body
  if (titulo !== undefined) {
    if (titulo.trim() === "") {
      return res.status(400).json({
        erro: "Título não pode ser vazio."
      });
    }
    tarefa.titulo = titulo;
  }

  if (concluida !== undefined) {
    tarefa.concluida = concluida;
  }

  res.status(200).json(tarefa);
}); 

app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = tarefas.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      erro: "Tarefa não encontrada."
    });
  }

  const tarefaRemovida = tarefas.splice(index, 1);

  res.status(200).json({
    mensagem: "Tarefa removida com sucesso.",
    tarefa: tarefaRemovida[0]
  });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});