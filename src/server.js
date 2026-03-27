import express from "express"; [cite: 32, 41]

const app = express(); [cite: 42]
app.use(express.json()); [cite: 44, 103]

const PORTA = 3000; [cite: 43]

// Dados em memória (Array de Objetos) [cite: 73, 75]
let tarefas = [
  { id: 1, titulo: "Estudar Node", concluida: false },
  { id: 2, titulo: "Fazer telas no Figma", concluida: true }
];

// Rota GET: Listar itens [cite: 47, 61]
app.get("/tarefas", (req, res) => {
  res.status(200).json(tarefas); [cite: 62, 106]
});

// Rota POST: Criar novo item [cite: 48, 65]
app.post("/tarefas", (req, res) => {
  const { titulo } = req.body; [cite: 50, 66]

  // Validação mínima: título obrigatório [cite: 83, 85, 114]
  if (!titulo || titulo.trim() === "") {
    return res.status(400).json({ erro: "Título é obrigatório." }); [cite: 86, 108]
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo,
    concluida: false
  };

  tarefas.push(novaTarefa); [cite: 80, 113]
  res.status(201).json(novaTarefa); [cite: 55, 107]
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});