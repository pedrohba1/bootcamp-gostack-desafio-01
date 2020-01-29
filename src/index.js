const express = require("express");
const server = express();
const projects = require("./database/projects");
server.use(express.json());
var counter = 0;
require("./utils/utils.js")();

//checa a existência do projeto
function checkProjectExists(req, res, next) {
  const { index } = findElement(projects, "id", req.params.id);
  if (index === -1) {
    return res.status(400).json("projeto não existe");
  }

  return next();
}

//contagem de requisições feitas
function countReq(req, res, next) {
  counter++;
  console.log("number of requests: " + counter);
  return next();
}
server.use(countReq);

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
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { index } = findElement(projects, "id", req.params.id);
  const { task_title } = req.body;
  //acrescenta uma task
  projects[index].tasks.push(task_title);

  return res.json(projects[index]);
});

//alterar projeto de acordo com id
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { index } = findElement(projects, "id", req.params.id);
  const { title } = req.body;
  //altera o titulo do projeto
  projects[index].title = title;
  //coloca o novo projeto no seu devido lugar
  return res.json({ "updated project": projects[index] });
});

//deleta um projeto baseado no id
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { element, index } = findElement(projects, "id", req.params.id);
  projects.splice(index, 1);
  return res.json({ "deleted project": element });
});

server.listen(3333);
