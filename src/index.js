const express = require("express");
const server = express();
const projects = require("./database/projects");
server.use(express.json());
require("./utils/utils.js")();

//TODO: Criar os middlewares:

//listar todos os projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//adicionar um novo projeto sem tasks
server.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;
  const project = { id, title, tasks };
  projects.push(project);
  return res.json(project);
});

//adicionar tasks à um projeto específico
server.post("/projects/:id/tasks", (req, res) => {
  const { index } = findElement(projects, "id", req.params.id);
  const { task_title } = req.body;
  //acrescenta uma task
  projects[index].tasks.push(task_title);

  return res.json(projects[index]);
});

//alterar projeto de acordo com id
server.put("/projects/:id", (req, res) => {
  const { index } = findElement(projects, "id", req.params.id);
  const { title } = req.body;
  //altera o titulo do projeto
  projects[index].title = title;
  //coloca o novo projeto no seu devido lugar
  return res.json({ "updated project": projects[index] });
});

//deleta um projeto baseado no id
server.delete("/projects/:id", (req, res) => {
  const { element, index } = findElement(projects, "id", req.params.id);
  projects.splice(index, 1);
  return res.json({ "deleted project": element });
});

server.listen(3333);
