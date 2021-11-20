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
  const { title, url, techs} = request.body;

  const repository= { id: uuid(), title, url, techs, likes: 0
    };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const { title, url, techs } = request.body;

  const repositoryFindIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryFindIndex=== -1){
    return response.status(400).json({ error : "Repository does not existe!"});
  }

  const repository = { id, title, url, techs, likes = repositories[repositoryFindIndex].likes } ;
  
  repositories[repositoryFindIndex]=repository;

  repositories.push(repository);
  
  return response.status(200).json(repository);  
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryFindIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryFindIndex >= 0){
    repositories.splice(repositoryFindIndex, 1);
  }else{
    return response.status(400).json({ error : "Repository does not existe"});
  }
  
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repositoryFindIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryFindIndex===-1){
    return response.status(400).json({error : "Repository does not existe!"});
  } 
  repositories[repositoryFindIndex].likes++;

  return response.json(repositories[repositoryFindIndex]);
});

module.exports = app;
