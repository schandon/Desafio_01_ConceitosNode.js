const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories/", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories/", (request, response) => {
  const { title, url, techs } = request.body;
  const project = { id: uuid(), title, url, techs, likes: 0};
  repositories.push(project);
  return response.status(204).json(project);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  if(!isUuid(id)){
    return response.status(400).json({error : "Project not Found."})
  }
  const project = repositories.findIndex(repository => repository.id === id);
  project.push(title,url,techs);
  return response.status(201).json(project);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/likes", (request, response) => {
  const { id } = request.params;
  const { likes } = request.body;
  const repository = repositories.find( repository => repository.id === id);
  if( !repository){
    return response.status(400).json();
  }
  console.log(repository);
  repository.likes+= likes;
  console.log(repository);
  return response.json(repository);
});

module.exports = app;
