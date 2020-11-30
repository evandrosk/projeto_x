# Base B

# Colection: Dados
  Sem criptografia os dados seriam os seguintes:
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

  Com criptografia os dados seriam os seguintes:
  ```
    {
      _id: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
      uid: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
      data: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
  ```
