# Rotas da API

Base URL: `http://localhost:3000`

---

## Clientes

| Método | Rota | Descrição |
|---|---|---|
| GET | /clientes | Lista todos os clientes |
| GET | /clientes/:id | Busca cliente por ID |
| POST | /clientes | Cria um novo cliente |
| PUT | /clientes/:id | Atualiza um cliente |
| DELETE | /clientes/:id | Remove um cliente |

### Exemplo POST /clientes
**Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "cidade": "Guarapuava",
  "estado": "PR",
  "pais": "Brasil"
}
```
**Resposta:**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "cidade": "Guarapuava",
  "estado": "PR",
  "pais": "Brasil"
}
```

---

## Produtos

| Método | Rota | Descrição |
|---|---|---|
| GET | /produtos | Lista todos os produtos |
| GET | /produtos/:id | Busca produto por ID |
| POST | /produtos | Cria um novo produto |
| PUT | /produtos/:id | Atualiza um produto |
| DELETE | /produtos/:id | Remove um produto |

### Exemplo POST /produtos
**Body:**
```json
{
  "nome": "Notebook",
  "preco": 3500.00,
  "estoque": 10,
  "categoriaId": 1
}
```
**Resposta:**
```json
{
  "id": 1,
  "nome": "Notebook",
  "preco": 3500.00,
  "estoque": 10,
  "categoriaId": 1,
  "categoria": {
    "id": 1,
    "nome": "Eletrônicos"
  }
}
```

---

## Categorias

| Método | Rota | Descrição |
|---|---|---|
| GET | /categorias | Lista todas as categorias |
| GET | /categorias/:id | Busca categoria por ID |
| POST | /categorias | Cria uma nova categoria |
| DELETE | /categorias/:id | Remove uma categoria |

### Exemplo POST /categorias
**Body:**
```json
{
  "nome": "Eletrônicos"
}
```
**Resposta:**
```json
{
  "id": 1,
  "nome": "Eletrônicos"
}
```

---

## Pedidos

| Método | Rota | Descrição |
|---|---|---|
| GET | /pedidos | Lista todos os pedidos |
| GET | /pedidos/:id | Busca pedido por ID |
| POST | /pedidos | Cria um novo pedido |
| DELETE | /pedidos/:id | Remove um pedido |

### Exemplo POST /pedidos
**Body:**
```json
{
  "clienteId": 1,
  "categoriaId": 1,
  "itens": [
    { "produtoId": 1, "quantidade": 2 },
    { "produtoId": 2, "quantidade": 1 }
  ]
}
```
**Resposta:**
```json
{
  "id": 1,
  "clienteId": 1,
  "categoriaId": 1,
  "criadoEm": "2026-05-25T12:00:00.000Z",
  "cliente": {
    "id": 1,
    "nome": "João Silva"
  },
  "itens": [
    { "id": 1, "produtoId": 1, "quantidade": 2 },
    { "id": 2, "produtoId": 2, "quantidade": 1 }
  ]
}
```

---

## Relatórios

| Método | Rota | Descrição |
|---|---|---|
| GET | /relatorios/vendas-por-estado | Total de pedidos por estado |
| GET | /relatorios/vendas-por-cidade | Total de pedidos por cidade |
| GET | /relatorios/vendas-por-pais | Total de pedidos por país |
| GET | /relatorios/top-clientes | Top 10 clientes que mais compraram |
| GET | /relatorios/produto-mais-vendido | Top 10 produtos por quantidade vendida |
| GET | /relatorios/produto-maior-valor | Top 10 produtos por valor total gerado |

### Exemplo GET /relatorios/vendas-por-estado
**Resposta:**
```json
[
  { "estado": "PR", "total": 45 },
  { "estado": "SP", "total": 30 },
  { "estado": "RJ", "total": 12 }
]
```

### Exemplo GET /relatorios/top-clientes
**Resposta:**
```json
[
  { "nome": "João Silva", "total": 15 },
  { "nome": "Maria Santos", "total": 10 }
]
```

### Exemplo GET /relatorios/produto-mais-vendido
**Resposta:**
```json
[
  { "nome": "Notebook", "quantidade": 50 },
  { "nome": "Mouse", "quantidade": 35 }
]
```

### Exemplo GET /relatorios/produto-maior-valor
**Resposta:**
```json
[
  { "nome": "Notebook", "valorTotal": 175000.00 },
  { "nome": "Monitor", "valorTotal": 45000.00 }
]
```