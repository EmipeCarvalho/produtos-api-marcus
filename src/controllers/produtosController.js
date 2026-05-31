let produtos = [];
let nextId = 1;

function listar(req, res) {
  res.status(200).json(produtos);
}

function buscarPorId(req, res) {
  const id = parseInt(req.params.id, 10);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  res.status(200).json(produto);
}

function criar(req, res) {
  const { nome, descricao, preco, categoria, estoque } = req.body;

  if (!nome || typeof nome !== 'string' || nome.trim().length < 3) {
    return res.status(400).json({ erro: "O campo 'nome' é obrigatório e deve ter no mínimo 3 caracteres", campo: 'nome' });
  }
  if (!descricao || typeof descricao !== 'string' || descricao.trim().length < 10) {
    return res.status(400).json({ erro: "O campo 'descricao' é obrigatório e deve ter no mínimo 10 caracteres", campo: 'descricao' });
  }
  if (preco === undefined || typeof preco !== 'number' || preco <= 0) {
    return res.status(400).json({ erro: "O campo 'preco' é obrigatório e deve ser maior que zero", campo: 'preco' });
  }
  const categoriasValidas = ['equipamento', 'servico', 'acessorio'];
  if (!categoria || !categoriasValidas.includes(categoria)) {
    return res.status(400).json({ erro: "O campo 'categoria' deve ser equipamento, servico ou acessorio", campo: 'categoria' });
  }
  if (estoque === undefined || !Number.isInteger(estoque) || estoque < 0) {
    return res.status(400).json({ erro: "O campo 'estoque' é obrigatório e deve ser inteiro maior ou igual a zero", campo: 'estoque' });
  }

  const agora = new Date().toISOString();
  const novoProduto = {
    id: nextId++,
    nome: nome.trim(),
    descricao: descricao.trim(),
    preco,
    categoria,
    estoque,
    ativo: true,
    criado_em: agora,
    atualizado_em: agora,
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
}

function atualizar(req, res) {
  const id = parseInt(req.params.id, 10);
  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  const { nome, descricao, preco, categoria, estoque, ativo } = req.body;

  if (!nome || typeof nome !== 'string' || nome.trim().length < 3) {
    return res.status(400).json({ erro: "O campo 'nome' é obrigatório e deve ter no mínimo 3 caracteres", campo: 'nome' });
  }
  if (!descricao || typeof descricao !== 'string' || descricao.trim().length < 10) {
    return res.status(400).json({ erro: "O campo 'descricao' é obrigatório e deve ter no mínimo 10 caracteres", campo: 'descricao' });
  }
  if (preco === undefined || typeof preco !== 'number' || preco <= 0) {
    return res.status(400).json({ erro: "O campo 'preco' é obrigatório e deve ser maior que zero", campo: 'preco' });
  }
  const categoriasValidas = ['equipamento', 'servico', 'acessorio'];
  if (!categoria || !categoriasValidas.includes(categoria)) {
    return res.status(400).json({ erro: "O campo 'categoria' deve ser equipamento, servico ou acessorio", campo: 'categoria' });
  }
  if (estoque === undefined || !Number.isInteger(estoque) || estoque < 0) {
    return res.status(400).json({ erro: "O campo 'estoque' é obrigatório e deve ser inteiro maior ou igual a zero", campo: 'estoque' });
  }

  const original = produtos[index];
  const atualizado = {
    id: original.id,
    nome: nome.trim(),
    descricao: descricao.trim(),
    preco,
    categoria,
    estoque,
    ativo: typeof ativo === 'boolean' ? ativo : original.ativo,
    criado_em: original.criado_em,
    atualizado_em: new Date().toISOString(),
  };

  produtos[index] = atualizado;
  res.status(200).json(atualizado);
}

function remover(req, res) {
  const id = parseInt(req.params.id, 10);
  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  produtos.splice(index, 1);
  res.status(204).send();
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
};
