const express = require('express');
const router = express.Router();
const EntregaController = require('../controllers/EntregaController');

router.get('/', EntregaController.listar);
router.get('/:id', EntregaController.buscarPorId);
router.post('/', EntregaController.criar);
router.put('/:id', EntregaController.atualizar);
router.delete('/:id', EntregaController.deletar);

module.exports = router;