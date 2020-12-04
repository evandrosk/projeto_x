# Projeto X

O intuito do projeto é servir um serviço de proteção ao credito, onde estão sendo aplicadas as seguintes tecnologias:
  - Node.JS
  - MongoDB
  - Redis
  - VueJS

O serviço consiste de duas aplicações em node, são elas:
  - Auth:
    Unificar e gerir os acessos;
  - Services:
    Prover e processar os dados solicitados via api rest;
  - Front:
    Prover um front que consome o Auth para gerar uma chave de acesso e efetivar as requisições ao Services para obter os dados;

    * Em função ao tempo previsto para o projeto, o front não será desenvolvido.


  ![Arquitetura](https://github.com/evandrosk/projeto_x/blob/master/services.png)

## Base de dados
  Informações estão separadas dentro do diretório database em seus respectivos exemplos:

  ![Bases](https://github.com/evandrosk/projeto_x/blob/master/bases.png)

  - Base A

    - Colection: users

      Sem criptografia, os dados seriam os seguintes:
      ```
        {
          _id: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
          data: {
            cpf: "00000000191",
            name: "Fulano Teste",
            addresses: {
              street: "Servidão Teste",
              number: 1,
              complement: "casa"
              district: "Teste",
              city: "Blumenau",
              state: "SC",
              postalcode: 89000000
            },
            dividas: [
              {
                active: true,
                responsible: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
                reason: "Divida Vencida",
                value: 1.01
              }
            ]
          }
        }
      ```

  - Base B

    - Colection: user_data

      Sem criptografia, os dados seriam os seguintes:
      ```
        {
          _id: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
          uid: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
          data: {
            birth: "1960-12-31",
            addresses: [
              {
                active: true,
                street: "Servidão Teste",
                number: 1,
                complement: "casa"
                district: "Teste",
                city: "Blumenau",
                state: "SC",
                postalcode: 89000000
              },
              {
                street: "Servidão Teste",
                number: 2,
                complement: "apto 10"
                district: "Teste",
                city: "Blumenau",
                state: "SC",
                postalcode: 89000000
              }
            ],
            goods: [
              {
                type: "Veiculo",
                brand: "Honda",
                model: "Civic",
                value: 20000
              },
              {
                type: "Imóvel",
                model: "Casa",
                address: {
                  street: "Servidão Teste",
                  number: 1,
                  complement: "casa"
                  district: "Teste",
                  city: "Blumenau",
                  state: "SC",
                  postalcode: 89000000
                },
                value: 200000
              },
              {
                type: "Imóvel",
                model: "Apto",
                address: {
                  street: "Servidão Teste",
                  number: 2,
                  complement: "apto 10"
                  district: "Teste",
                  city: "Blumenau",
                  state: "SC",
                  postalcode: 89000000
                },
                value: 200000
              }
            ],
            renda: [
              {
                main: true,
                responsible: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
                source: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
                origin: "Aluguel",
                value: 1000
              }
            ]
          }
        }
      ```

## Execução dos projetos

  - Executar o projeto via Docker Compose:
    ```sudo docker-compose up```
