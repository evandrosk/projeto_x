# Base C

# Colection: consultas
  Última consulta do CPF:
  ```
    {
      _id: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
      uid: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
      origem: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
      motivo: "CONSULTA CPF"
    }
  ```

# Colection: movimentacoes
  Movimentação financeira nesse CPF:
  ```
    {
      _id: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
      uid: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
      origem: "BANCO",
      data: "2000-12-30 00:00:00",
      motivo: "EMPRESTIMO",
      valor: 1000
    }
  ```

# Colection: movimentacoes
  Dados relacionados a última compra com cartao de crédito vinculado ao CPF:
  ```
    {
      _id: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
      uid: ObjectId("xxxxxxxxxxxxxxxxxxxxxxx"),
      origem: "BANCO",
      data: "2020-11-30 00:00:00",
      motivo: "FATURA",
      valor: 10.01
    }
  ```


