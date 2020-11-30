# Base A

## Colection: Usuarios
  Dados para acesso:
  ```
    {
      _id: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
      uid: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
      email: "fulano@dominio.com",
      senha: "MD5.xxxxxxxxxxxxxxxxxxxxxxx.MD5"
    }
  ```

# Colection: Dados
  Sem criptografia os dados seriam os seguintes:
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

  Com criptografia os dados seriam os seguintes:
  ```
    {
      _id: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
      data: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
  ```
