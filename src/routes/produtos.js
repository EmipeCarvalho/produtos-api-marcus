const express = require('express');
const produtosController = require('../controllers/produtosController');

const router = express.Router();

router.get('/', produtosController.listar);
router.get('/:id', produtosController.buscarPorId);
router.post('/', produtosController.criar);
router.put('/:id', produtosController.atualizar);
router.delete('/:id', produtosController.remover);

module.exports = router;
