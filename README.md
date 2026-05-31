# API REST de Produtos

Trabalho individual da disciplina **Projeto de Desenvolvimento Backend**.

## Identificação

- **Aluno:** Marcus Santana
- **Matrícula:** _a preencher_
- **Professor:** Cristiano de Macedo Neto, M.Sc
- **Modalidade:** Individual
- **Stack:** Node.js + Express

## Descrição

API RESTful que implementa um CRUD completo para o recurso **produto**,
seguindo o padrão arquitetural MVC com armazenamento em memória.

## Como executar

Pré-requisitos: Node.js 18 ou superior.

```bash
# 1. instalar as dependências
npm install

# 2. rodar em modo desenvolvimento (com reload automático via nodemon)
npm run dev

# ou em modo produção
npm start
```

A API sobe na porta **3000**: http://localhost:3000/api/v1/produtos

## Estrutura do projeto

```
produtos-api/
├── src/
│   ├── app.js                      ← configuração do Express + middlewares
│   ├── routes/
│   │   └── produtos.js             ← definição das rotas (Router)
│   └── controllers/
│       └── produtosController.js   ← lógica do CRUD
├── .gitignore
├── package.json
└── README.md
```

## Endpoints

Todos sob o prefixo `/api/v1/produtos`.

| Verbo  | Path                      | Descrição                       | Status esperado            |
| ------ | ------------------------- | ------------------------------- | -------------------------- |
| GET    | `/api/v1/produtos`        | Lista todos os produtos         | 200 OK                     |
| GET    | `/api/v1/produtos/:id`    | Retorna um produto pelo ID      | 200 OK / 404 Not Found     |
| POST   | `/api/v1/produtos`        | Cria um novo produto            | 201 Created / 400 Bad Request |
| PUT    | `/api/v1/produtos/:id`    | Atualiza completamente o produto| 200 OK / 404 / 400         |
| DELETE | `/api/v1/produtos/:id`    | Remove um produto               | 204 No Content / 404       |

### Estrutura do recurso

```json
{
  "id": 1,
  "nome": "Painel Solar 400W",
  "descricao": "Painel fotovoltaico monocristalino de alta eficiência",
  "preco": 899.90,
  "categoria": "equipamento",
  "estoque": 42,
  "ativo": true,
  "criado_em": "2026-03-09T10:00:00.000Z",
  "atualizado_em": "2026-03-09T10:00:00.000Z"
}
```

### Campos e validações

| Campo        | Tipo            | Obrigatório | Regras                                                 |
| ------------ | --------------- | ----------- | ------------------------------------------------------ |
| `id`         | inteiro         | —           | Gerado pelo servidor (auto-increment).                 |
| `nome`       | string          | sim         | Mínimo 3 caracteres.                                   |
| `descricao`  | string          | sim         | Mínimo 10 caracteres.                                  |
| `preco`      | número          | sim         | Maior que zero.                                        |
| `categoria`  | string          | sim         | `equipamento`, `servico` ou `acessorio`.               |
| `estoque`    | inteiro         | sim         | Maior ou igual a zero.                                 |
| `ativo`      | booleano        | —           | Default `true` no POST.                                |
| `criado_em`  | string ISO 8601 | —           | Gerado pelo servidor.                                  |
| `atualizado_em` | string ISO 8601 | —        | Atualizado pelo servidor a cada PUT.                   |

### Formato das respostas de erro

```json
{ "erro": "Descrição clara do problema", "campo": "nome do campo com problema (quando aplicável)" }
```

## Exemplos de uso

```bash
# Criar
curl -X POST http://localhost:3000/api/v1/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Painel Solar 400W","descricao":"Painel fotovoltaico monocristalino","preco":899.90,"categoria":"equipamento","estoque":42}'

# Listar
curl http://localhost:3000/api/v1/produtos

# Buscar por ID
curl http://localhost:3000/api/v1/produtos/1

# Atualizar
curl -X PUT http://localhost:3000/api/v1/produtos/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Painel Solar 550W","descricao":"Versão atualizada","preco":1199.90,"categoria":"equipamento","estoque":30,"ativo":true}'

# Remover
curl -X DELETE http://localhost:3000/api/v1/produtos/1
```
