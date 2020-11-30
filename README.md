# Projeto X

O intuito do projeto é servir um serviço de proteção ao credito, onde estão sendo aplicadas as seguintes tecnologias:
  - Node.JS
  - MongoDB
  - Redis
  - VueJS

O serviço consiste de duas aplicações em node, são elas:
  - Auth:
    Unificar e gerir os acessos
  - Services: 
    Prover e processar os dados solicitados via api rest
  - Front: 
    Prover um front que consome o Auth para gerar uma chave de acesso e efetivar as requisições ao Services para obter os dados

## Base de dados
  Informações estão separadas dentro do diretório database em seus respectivos exemplos:
  - database/base_a.md
  - database/base_b.md
  - database/base_c.md

## Execução dos projetos

  - Executar o projeto via Docker Compose:
    ```sudo docker-compose up```
