const express = require('express');
const router = express.Router();
const AvaliacaoController = require('../controllers/AvaliacaoController');

router.get('/', AvaliacaoController.listar);
router.get('/:id', AvaliacaoController.buscarPorId);
router.post('/', AvaliacaoController.criar);
router.put('/:id', AvaliacaoController.atualizar);
router.delete('/:id', AvaliacaoController.deletar);

module.exports = router;