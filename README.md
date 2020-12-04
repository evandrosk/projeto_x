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
            nome: "Fulano Teste",
            enderecos: [
              {
                atual: true,
                rua: "Servidão Teste",
                numero: 1,
                complemento: "casa"
                bairro: "Teste",
                cidade: "Blumenau",
                estado: "SC",
                cep: 89000000
              },
              {
                rua: "Servidão Teste",
                numero: 2,
                complemento: "apto 10"
                bairro: "Teste",
                cidade: "Blumenau",
                estado: "SC",
                cep: 89000000
              }
            ],
            dividas: [
              {
                ativa: true,
                responsavel: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
                motivo: "Divida Vencida",
                valor: 1.01
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
            nascimento: "1960-12-31",
            enderecos: [
              {
                atual: true,
                rua: "Servidão Teste",
                numero: 1,
                complemento: "casa"
                bairro: "Teste",
                cidade: "Blumenau",
                estado: "SC",
                cep: 89000000
              }
            ],
            bens: [
              {
                tipo: "Veiculo",
                marca: "Honda",
                modelo: "Civic",
                valor: 20000
              },
              {
                tipo: "Imóvel",
                modelo: "Casa",
                endereco: {
                  rua: "Servidão Teste",
                  numero: 1,
                  complemento: "casa"
                  bairro: "Teste",
                  cidade: "Blumenau",
                  estado: "SC",
                  cep: 89000000
                },
                valor: 200000
              },
              {
                tipo: "Imóvel",
                modelo: "Apto",
                endereco: {
                  rua: "Servidão Teste",
                  numero: 2,
                  complemento: "apto 10"
                  bairro: "Teste",
                  cidade: "Blumenau",
                  estado: "SC",
                  cep: 89000000
                },
                valor: 200000
              }
            ],
            renda: [
              {
                principal: true,
                responsavel: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
                fonte: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
                origem: "Aluguel",
                valor: 1000
              }
            ]
          }
        }
      ```

## Execução dos projetos

  - Executar o projeto via Docker Compose:
    ```sudo docker-compose up```
